import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/service/product.service'
import { Product } from '../../shared/model/product.model'
import { Store, select } from '@ngrx/store'
import { addProductToCart } from '../../ngrx'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[]
  cartProducts$: Observable<any>;

  constructor(
    private _productService: ProductService,    
    private _store: Store<{reducer: Product}>,
    private _snackBar: MatSnackBar) { 
      this.cartProducts$ = this._store.pipe(
        select('reducer')
      )   
  }
   
  ngOnInit(): void {
    this.getProducts()    
  }
    
  async getProducts(){
    await this._productService.getProducts().subscribe(res => {
      this.products = res.data.filter((item) => {return item.quantity > 0})            
    })
  }
  
  addProductToCart(product): void{    
    this._store.dispatch(addProductToCart({product: product}))
    this.cartProducts$.subscribe(res => {
      if(res.error){
        this._snackBar.open("Item maximum quantity", "",{
          duration: 3000,
          panelClass: ['error-snackbar']
        })    
      }else{
        this._snackBar.open("Item added to cart", "",{
          duration: 3000,
          panelClass: ['success-snackbar']
        })
      }
    })   
  }
}
