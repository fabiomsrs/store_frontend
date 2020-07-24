import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store'
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransactionService } from '../../shared/service/transaction.service'
import { environment } from '../../../environments/environment'
import { Product } from '../../shared/model/product.model';
import { Observable } from 'rxjs';
import { PaymentService } from 'src/app/shared/service/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  hide = true;
  form: FormGroup
  firstName: string
  lastName: string 
  email: string
  dataSource: any[] = []
  cartProducts$: Observable<any>

  constructor(private _fb: FormBuilder,    
    private _snackBar: MatSnackBar,
    private _store: Store<{reducer: Product}>,
    private _transactionService: TransactionService,
    private _router: Router,
    private _paymentService: PaymentService
    ) { 
      if(window.localStorage.getItem("user")){
        this.firstName = JSON.parse(window.localStorage.getItem("user")).firstName
        this.lastName = JSON.parse(window.localStorage.getItem("user")).lastName
        this.email = JSON.parse(window.localStorage.getItem("user")).email  
      }else{
        this.firstName = ''
        this.lastName = ''
        this.email = ''
      }
      this.cartProducts$ = this._store.pipe(
        select('reducer')
      )    
    }

    ngOnInit(): void {
      this.form = this._fb.group({
        firstName: [this.firstName, [Validators.required]],
        lastName: [this.lastName, [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        email: [this.email, [Validators.required, Validators.email]],
        address: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        cardNumber: ['', [Validators.required]],
        securityCode: ['', [Validators.required]],
        expirationDate: ['', [Validators.required]],
      })
      this.cartProducts$.subscribe(res => {      
        this.dataSource = [...res.products]
      })
    }
  
  countProduct(): number{
    let count = 0
    this.dataSource.forEach((item)=>{
      count+= item.actual_quantity || 1
    })
    return count
  }
  
  totalValue(): number{
    let total = 0
    this.dataSource.forEach(product => {
      total += (product.value * (product.actual_quantity || 1))
    })
    return total
  }
     
  transaction(){
    let products = []
    this.dataSource.forEach((item) => {
      products.push({
        createdAt: item.createdAt,
        description: item.description,
        id: item.id,
        name: item.name,
        quantity: item.actual_quantity || 1,
        updatedAt: item.updatedAt,
        value: item.value,
      })
    })
    
    let values = this.form.value
    let data = {
      "customer": {
        "name": values.firstName
      },
      "merchantOrderId": environment.merchantOrderId,
      "payment": {
        "amount": this.totalValue(),
        "creditCard": {          
          "cardNumber": values.cardNumber,
          "holder": values.firstName + " " + values.lastName,          
          "expirationDate": values.expirationDate
        },
        "installments": 1,
        "type": "CreditCard"
      },      
    }
    
    this._transactionService.createTransaction(data).subscribe(
      res => {        
        let id = res.payment.paymentId
        let payment = {
          id: res.payment.paymentId,
          amount: res.payment.amount,
          installments: res.payment.installments,
          status: res.payment.status,
          products: products
        }        
        this._paymentService.createPayment(payment).subscribe(
          res => {        
          window.localStorage.removeItem('state')  
          window.location.href = '/payment-confirm/' + id         
          // this._router.navigate(['/payment-confirm/'+ id]);
          },
          err => {
            this._snackBar.open("Something went wrong, please try again", "", {
              duration: 3000,
              panelClass: ['warning-snackbar']
            })
          }
        )
      },
      err => {
        this._snackBar.open("Something went wrong, please try again", "", {
          duration: 3000,
          panelClass: ['warning-snackbar']
        })
      }
    )
  }

}
