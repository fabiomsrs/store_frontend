import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/model/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User
  login_condition: boolean 
  @Output() drawer: EventEmitter<any> = new EventEmitter();

  constructor(private _snackBar: MatSnackBar,
    private _router : Router) { }

  ngOnInit(): void {
    const temp = window.localStorage.getItem('user')    
    if(temp){
      this.user = JSON.parse(temp)      
      this.login_condition = false      
    }
    else{
      this.login_condition = true
    }
  }

  logout(): void{
    window.localStorage.clear()
    window.location.reload()    
  }

  toogle(): void{
    this.drawer.emit()
  }

}
