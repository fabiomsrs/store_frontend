import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent implements OnInit {
  form: FormGroup
  
  constructor(private _fb: FormBuilder,    
    private _productService: ProductService,
    private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
      this.form = this._fb.group({
        name: ['', [Validators.required]],
        value: ['', [Validators.required]],
        quantity: ['', [Validators.required, Validators.min(1)]],
        description: ['', [Validators.required]],
      })
    }

    register(): void{
      if(this.form.valid){
        this._productService.createProducts(this.form.value)
          .subscribe(
            res => {
              console.log(res)
              this._snackBar.open("Register Successful","",{
                duration: 3000,
                panelClass: ['success-snackbar']
              })
              this.form.reset()          
            },
            err => {
              console.log(err)
              this._snackBar.open("Something went wrong. Try again","",{
                duration: 3000,
                panelClass: ['error-snackbar']
              })                 
            }
          )
      }
    }

}
