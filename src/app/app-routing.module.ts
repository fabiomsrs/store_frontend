import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { CartComponent } from './views/cart/cart.component';
import { LoginComponent } from './views/login/login.component';
import { UserRegisterComponent } from './views/user-register/user-register.component';
import { ProductRegisterComponent } from './views/product-register/product-register.component';
import { CheckoutComponent } from './views/checkout/checkout.component';
import { AuthGuard } from './guards/auth.guard';
import { PaymentComponent } from './views/payment/payment.component';
import { PaymentConfirmComponent } from './views/payment-confirm/payment-confirm.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user-register',
    component: UserRegisterComponent
  },
  {
    path: 'product-register',
    component: ProductRegisterComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'payment-confirm/:id',
    component: PaymentConfirmComponent,
    canActivate : [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
