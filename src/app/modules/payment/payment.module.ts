import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaymentDetailsComponent } from './pages/payment-details/payment-details.component';
import { paymentRoutes } from './payment-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    InputMaskModule,
    DropdownModule,
    InputTextModule,
    RouterModule.forChild(paymentRoutes),
  ],
  declarations: [
    PaymentDetailsComponent
  ],
})
export class PaymentModule { }
