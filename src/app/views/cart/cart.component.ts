import { Component, OnInit } from '@angular/core';
import { Store, select} from '@ngrx/store'
import { removeProductFromCart } from '../../ngrx'
import { Observable } from 'rxjs';
import { Product } from '../../shared/model/product.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'value'];
  dataSource: any[] = []
  
  cartProducts$: Observable<any>;

  constructor(
    private _store: Store<{reducer: Product}>,
    private _router: Router,
    private _snackBar: MatSnackBar,
    ) {
      this.cartProducts$ = this._store.pipe(
        select('reducer')
      )    
   }

  ngOnInit(): void {    
    this.cartProducts$.subscribe(res => {      
      this.dataSource = []      
      for (let index in res.products){
        this.dataSource.push(res.products[index])
      }      
    })
  }

  removeProductCart(product): void{    
    this._store.dispatch(removeProductFromCart({product: product}))
    this._snackBar.open("Item Removed", "",{
      duration: 3000,
      panelClass: ['success-snackbar']
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

  proceedCheckout(){
    if(this.dataSource.length > 0){      
      this._router.navigate(['/checkout'])
    }else{      
      this._snackBar.open("There's no item in the cart", "", {        
        duration: 3000,
        panelClass: ['error-snackbar']
      })
    }
  }

}
