import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './views/navbar/navbar.component';
import { ProductListComponent } from './views/product-list/product-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './views/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { LocalDateTimePipe } from './shared/pipe/local-date-time.pipe';
import { CartComponent } from './views/cart/cart.component';
import { MatTableModule } from '@angular/material/table';
import { StoreModule } from '@ngrx/store';
import { reducer } from './ngrx';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './views/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserRegisterComponent } from './views/user-register/user-register.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProductRegisterComponent } from './views/product-register/product-register.component';
import { CheckoutComponent } from './views/checkout/checkout.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import { AuthGuard } from './guards/auth.guard';
import { PaymentComponent } from './views/payment/payment.component';
import { TransactionStatusPipe } from './shared/pipe/transaction-status.pipe';
import { PaymentConfirmComponent } from './views/payment-confirm/payment-confirm.component';
import { ConfirmDialogComponent } from './views/confirm-dialog/confirm-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductListComponent,    
    HomeComponent,
    LocalDateTimePipe,
    CartComponent,
    LoginComponent,
    UserRegisterComponent,
    ProductRegisterComponent,
    CheckoutComponent,
    PaymentComponent,
    TransactionStatusPipe,
    PaymentConfirmComponent,
    ConfirmDialogComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDividerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule, MatMomentDateModule,
    StoreModule.forRoot(
      {
        reducer
      }
    ),
  ],
  providers: [LocalDateTimePipe, TransactionStatusPipe, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
