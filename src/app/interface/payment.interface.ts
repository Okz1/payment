export interface PaymentInterface {
  cardType: string;
  cardNumber: number;
  expiry: string;
  cardHolderName: string;
  email?: string;
}

export interface PaymentResponseInterface {
  approvalCode: string;
  invoiceNo: string;
  responseCode: string;
  responseMessage: string;
}
