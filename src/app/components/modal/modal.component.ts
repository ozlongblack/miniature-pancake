import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular/standalone';

import { Stock } from '@interfaces/stock';
import { SwipeButtonComponent } from '../swipe-button/swipe-button.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [IonInput, CurrencyPipe, SwipeButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() data: Stock | null = null;

  modalController = inject(ModalController);

  dismiss() {
    this.modalController.dismiss({
      symbol: this.data?.symbol,
      price: 0,
      amount: 5.1,
      shares: 500,
    });
  }
}
