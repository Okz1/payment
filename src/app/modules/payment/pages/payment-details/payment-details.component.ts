import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardTypesService } from '../../services/card-types.service';
import { CardType } from '../../../../interface/card.interface';
import { ProductInterface } from '../../../../interface/product.interface';
import { combineLatest, Subscription } from 'rxjs';
import { ProductDetailsService } from '../../services/product-details.service';
import { map } from 'rxjs/operators';
import { CardTypesEnum } from '../../../../enums/card-types.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { PaymentResponseInterface } from '../../../../interface/payment.interface';
import { PaymentInvoiceStatusesEnum } from '../../../../enums/payment-invoice-statuses.enum';

const ONLY_ALPHA_PATTERN = '^[a-zA-Z ]*$';
const DEFAULT_MASK = '9999-9999-9999-9999';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit, OnDestroy {
  cardTypes: CardType[] = null;
  productDetails: ProductInterface = null;
  loading = true;
  paymentForm: FormGroup = null;
  paymentResponse: PaymentResponseInterface = null;
  PaymentInvoiceStatusesEnum = PaymentInvoiceStatusesEnum;
  cardNumberMask = DEFAULT_MASK;
  private subscription: Subscription = new Subscription();

  constructor(private cardTypesService: CardTypesService,
              private productDetailsService: ProductDetailsService,
              private paymentService: PaymentService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createPaymentForm();

    combineLatest([
      this.cardTypesService.getCardTypes().pipe(
        map(this.filterCardTypes)
      ),
      this.productDetailsService.getProduct
    ]).subscribe((data: [CardType[], ProductInterface]) => {
      this.cardTypes = data[0];
      this.productDetails = data[1];
      this.loading = false;
    });
  }

  submitPayment(): void {
    if (this.paymentForm.valid) {
      if (Math.random() > 0.5) { // TODO: show error flow
        this.paymentService.submitPayment(this.paymentForm.getRawValue()).subscribe((paymentResponse: PaymentResponseInterface) => {
          this.paymentResponse = paymentResponse;
        });
      } else {
        this.paymentService.submitPaymentWithError(this.paymentForm.getRawValue())
          .subscribe((paymentResponse: PaymentResponseInterface) => {
            this.paymentResponse = paymentResponse;
        }, (paymentError) => {
            this.paymentResponse = paymentError.error;
          });
      }
    }
  }

  private createPaymentForm(): void {
    this.paymentForm = this.fb.group({
      cardType: [null, [Validators.required]],
      cardNumber: [null, [Validators.required, Validators.minLength(15)]],
      expiry: [null, [Validators.required]],
      cardHolderName: [null, [Validators.required, Validators.maxLength(50), Validators.pattern(ONLY_ALPHA_PATTERN)]],
      email: [null, [Validators.email]],
    });

    this.subscription.add(
      this.paymentForm.valueChanges.subscribe(formValue => {
        if (formValue.cardType === CardTypesEnum.Amex) {
          this.cardNumberMask = '9999-9999-9999-999';
        } else {
          this.cardNumberMask = DEFAULT_MASK;
        }
      })
    );
  }

  private filterCardTypes(cardTypes: CardType[]): CardType[] {
    return cardTypes.filter( cardType =>
      cardType.id === CardTypesEnum.Visa ||
      cardType.id === CardTypesEnum.MasterCard ||
      cardType.id === CardTypesEnum.Amex );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
