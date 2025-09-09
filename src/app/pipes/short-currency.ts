import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortCurrency',
  standalone: true,
})
export class ShortCurrencyPipe implements PipeTransform {
  transform(value: number | null): string {
    if (value === null) {
      return '';
    }

    const absValue = Math.abs(value);

    if (absValue >= 1000000000) {
      return '$' + (value / 1000000000).toFixed(1) + 'b';
    } else if (absValue >= 1000000) {
      return '$' + (value / 1000000).toFixed(1) + 'm';
    } else if (absValue >= 1000) {
      return '$' + (value / 1000).toFixed(1) + 'k';
    }

    return '$' + value.toFixed(2);
  }
}
