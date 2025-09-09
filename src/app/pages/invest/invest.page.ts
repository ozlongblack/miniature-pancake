import { AsyncPipe, CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Instrument, Stock } from '@interfaces/stock';
import { User } from '@interfaces/user';
import { StockService } from '@services/stock.service';
import { UserService } from '@services/user.service';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonModal,
  ModalController,
  ToastController,
} from '@ionic/angular/standalone';
import { combineLatest, map, Observable, of, shareReplay } from 'rxjs';
import { CardComponent } from '@components/card/card.component';
import { CardType } from '@interfaces/card';
import { InstrumentComponent } from '@components/instrument/instrument.component';
import { ModalComponent } from '@components/modal/modal.component';

@Component({
  selector: 'app-invest',
  templateUrl: 'invest.page.html',
  styleUrls: ['invest.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonModal,
    AsyncPipe,
    CurrencyPipe,
    CardComponent,
    InstrumentComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvestPage implements OnInit {
  stockService = inject(StockService);
  userService = inject(UserService);
  modalController = inject(ModalController);
  toastController = inject(ToastController);

  stocks$: Observable<Stock[]> = of([]);
  user$: Observable<User | null> = of(null);
  holdings$!: Observable<Instrument[]>;
  trending$!: Observable<Stock[]>;

  cardType = CardType;

  ngOnInit() {
    this.stocks$ = this.stockService.stocks$.pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
    this.user$ = this.userService.user$.pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );

    this.holdings$ = combineLatest([this.stocks$, this.user$]).pipe(
      map(([stocks, user]) => {
        if (!user || stocks.length === 0) {
          return [];
        }

        return user.holdings.map(
          (holding) =>
            ({
              ...holding,
              ...stocks.find((item) => item.symbol === holding.symbol),
            } as Instrument)
        );
      })
    );

    this.trending$ = this.stocks$.pipe(map((stocks) => stocks.slice(0, 8)));

    this.stockService.loadStocks();
    this.userService.loadUser();
  }

  async handleClick(stock: Stock) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        initialBreakpoint: 0.5,
        breakpoints: [0, 0.5],
        data: stock,
      },
    });

    modal.onWillDismiss().then(async (result) => {
      if (result) {
        const previous = this.userService.loadCachedUser();

        this.userService.updateUser({
          equity: (previous?.equity || 0) + result.data.shares,
          holdings: [
            ...((previous?.holdings as Instrument[]) || []),
            {
              symbol: result.data.symbol,
              share: result.data.amount,
            },
          ],
        });

        const toast = await this.toastController.create({
          message: `${result.data.symbol} successfully purchased!`,
          position: 'top',
          color: 'success',
          duration: 3000,
          cssClass: 'custom-toast',
        });

        await toast.present();
      }
    });

    return await modal.present();
  }
}
