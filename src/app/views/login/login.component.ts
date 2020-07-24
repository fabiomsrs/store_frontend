import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../shared/service/auth.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  form: FormGroup
  
  constructor(private _fb: FormBuilder,
    private _authService: AuthService,
    private _snackBar: MatSnackBar) { }

  
  ngOnInit(): void {
    this.form = this._fb.group({
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  login(): void{
    if(this.form.valid){
      this._authService.getUser(this.form.value)
        .subscribe(
          res => {            
            window.localStorage.setItem("user", JSON.stringify(res.user))
            window.localStorage.setItem('token', JSON.stringify(res.token))
            window.location.href = '/'            
          },
          err => {
            this._snackBar.open("Invalid Credentials","",{
              duration: 3000,
              panelClass: ['error-snackbar']
            })            
          }
        )
    }    
  }

}
