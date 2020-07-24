import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  hide = true;
  form: FormGroup
  
  constructor(private _fb: FormBuilder,
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _router : Router) { }

    ngOnInit(): void {
      this.form = this._fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
      })
    }

    register(): void{
      if(this.form.valid){
        this._authService.createUser(this.form.value)
          .subscribe(
            res => {
              this._snackBar.open("Register Successful","",{
                duration: 3000,
                panelClass: ['success-snackbar']
              })              
              this._router.navigate(['/login']);
            },
            err => {              
              if(err.status === 409){
                this._snackBar.open("Email already registered","",{
                  duration: 3000,
                  panelClass: ['error-snackbar']
                })                 
              }else{
                this._snackBar.open("Something went wrong. Try again","",{
                  duration: 3000,
                  panelClass: ['error-snackbar']
                })
              }
            }
          )
      }    
    }
}