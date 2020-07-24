import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PaymentService } from '../../shared/service/payment.service'
import { TransactionService } from '../../shared/service/transaction.service';
import { Payment } from '../../shared/model/payment.model'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html',
  styleUrls: ['./payment-confirm.component.css']
})
export class PaymentConfirmComponent implements OnInit {
  payment: Payment
  cofirmed_flag: boolean = false

  constructor(
      private _paymentService: PaymentService,
      private _transactionService: TransactionService,
      public dialog: MatDialog,
      private _route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    let payment_id = this._route.snapshot.paramMap.get("id")
    this._paymentService.getPaymentById(payment_id)
      .subscribe(res => {        
        this.payment = res
      })
  }

  totalValue(): number{
    let total = 0
    this.payment.products.forEach(product => {
      total += (product.value * (product.quantity || 1))
    })
    return total
  }

  confirmPayment(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        message:"Do you want to confirm your purchase?"
      } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){        
        this._transactionService.captureTransaction(this.payment.id).subscribe(()=>{          
          this.cofirmed_flag = true
        })
      }
    });
  }

  paymentNotCofirmed(): boolean{
    if(this.payment.status == 1){
      return true
    }
    return false
  }

}
