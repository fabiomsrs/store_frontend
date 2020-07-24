import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionStatus'
})
export class TransactionStatusPipe implements PipeTransform {

  transform(value: number): string {
    const dict = {
      1:"Pending",
      2:"Confirmed",
      3:"Not Authorized"
     }
    return dict[value];
  }

}
