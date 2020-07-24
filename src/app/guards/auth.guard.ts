import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isLoggedIn()) {
      return true;
    }
    // navigate to login page as user is not authenticated      
    this._snackBar.open("You must be logged in", "", {
      duration: 3000,
      panelClass: ['warning-snackbar']
    })
    this._router.navigate(['/login']);
    return false;
  }

  isLoggedIn(): boolean {
    let status = false;
    if (window.localStorage.getItem('token')) {
      status = true;
    }
    else {
      status = false;
    }
    return status;
  }
}

