import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { TypeComponent } from '@components/type/type.component';
import { CardType } from '@interfaces/card';
import { Stock } from '@interfaces/stock';
import { ShortCurrencyPipe } from '@pipes/short-currency';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [TypeComponent, CurrencyPipe, ShortCurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  type = input<CardType>(CardType.Large);
  data = input.required<Stock>();
  onClick = output<Stock>();

  cardType = CardType;
}
