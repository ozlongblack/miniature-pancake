import { AsyncPipe, CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonModal,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { Observable, combineLatest, map, of } from 'rxjs';

import { CardComponent } from '@components/card/card.component';
import { InstrumentComponent } from '@components/instrument/instrument.component';
import { CardType } from '@interfaces/card';
import { Instrument, Stock } from '@interfaces/stock';
import { User } from '@interfaces/user';
import { InvestService } from '@services/invest.service';
import { StockService } from '@services/stock.service';
import { UserService } from '@services/user.service';

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
  investService = inject(InvestService);
  stockService = inject(StockService);
  userService = inject(UserService);
  modalController = inject(ModalController);

  stocks$: Observable<Stock[]> = of([]);
  user$: Observable<User | null> = of(null);
  holdings$!: Observable<Instrument[]>;
  trending$!: Observable<Stock[]>;

  cardType = CardType;

  ngOnInit() {
    this.loadData();
    this.init();
  }

  private loadData() {
    this.stocks$ = this.stockService.stocks$;
    this.user$ = this.userService.user$;

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
  }

  private init() {
    this.stockService.loadStocks();
    this.userService.loadUser();
  }

  async handleClick(stock: Stock) {
    this.investService.openModal(stock);
  }
}
