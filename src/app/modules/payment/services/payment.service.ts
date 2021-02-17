import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../services/config.service';
import { PaymentInterface, PaymentResponseInterface } from '../../../interface/payment.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private httpClient: HttpClient,
    private appConfig: AppConfig
  ) {}

  submitPayment(paymentData: PaymentInterface): Observable<PaymentResponseInterface> {
    const url = `${this.appConfig.apiUrl}/5d8de422310000b19d2b517a`;

    return this.httpClient.post<PaymentResponseInterface>(url, paymentData);
  }

  submitPaymentWithError(paymentData: PaymentInterface): Observable<PaymentResponseInterface> {
    const url = `${this.appConfig.apiUrl}/5d8de441310000a2612b517c`;

    return this.httpClient.post<PaymentResponseInterface>(url, paymentData);
  }
}
