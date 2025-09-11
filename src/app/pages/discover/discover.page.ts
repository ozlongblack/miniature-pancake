import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonToolbar,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { Observable, Subject, map, of, withLatestFrom } from 'rxjs';

import { CardComponent } from '@components/card/card.component';
import { InstrumentComponent } from '@components/instrument/instrument.component';
import { Instrument, Stock } from '@interfaces/stock';
import { StockService } from '@services/stock.service';

@Component({
  selector: 'app-discover',
  templateUrl: 'discover.page.html',
  styleUrls: ['discover.page.scss'],
  imports: [
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonToolbar,
    IonContent,
    IonSearchbar,
    AsyncPipe,
    CardComponent,
    InstrumentComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscoverPage implements OnInit {
  stockService = inject(StockService);
  searchTerm$ = new Subject<string>();

  filteredStocks$: Observable<Stock[]> = of([]);

  readonly mockSearchedData = [
    {
      id: 'ca37d9ef-ef2e-415b-8b10-05d6ef8e9da5',
      symbol: 'SHEL',
      type: 'stock',
      fullName: 'Shell plc',
      logo: 'https://github.githubassets.com/images/icons/emoji/unicode/1f52c.png?v8',
      volume: 1073765,
      marketCap: 870801303070,
      open: 362.56,
      close: 343.28,
      ask: 344.29,
      high: 362.97,
      low: 342.89,
    },
    {
      id: 'e7d5a4ab-1a09-418e-9106-626602370314',
      symbol: 'ENPH',
      type: 'stock',
      fullName: 'Enphase Energy, Inc.',
      logo: 'https://github.githubassets.com/images/icons/emoji/unicode/1f4da.png?v8',
      volume: 3296804,
      marketCap: 1124737737809,
      open: 945.04,
      close: 956.36,
      ask: 956.95,
      high: 979.97,
      low: 927.43,
    },
    {
      id: 'dd2be7d7-d3c2-4619-bab3-17a454e66ec0',
      symbol: 'SEDG',
      type: 'stock',
      fullName: 'SolarEdge Technologies, Inc.',
      logo: 'https://github.githubassets.com/images/icons/emoji/unicode/1f4da.png?v8',
      volume: 16148537,
      marketCap: 870708296633,
      open: 171.57,
      close: 172.45,
      ask: 172.53,
      high: 173.66,
      low: 170.12,
    },
  ] as Instrument[];

  readonly mockTopVolumeData = {
    id: 'bc8d8330-4a9c-4e17-a71e-2a11cd8969fe',
    symbol: 'LCID',
    type: 'etf',
    fullName: 'Lucid Group, Inc.',
    logo: 'https://github.githubassets.com/images/icons/emoji/unicode/2615.png?v8',
    volume: 51065578,
    marketCap: 211901627661,
    open: 416.91,
    close: 426.0,
    ask: 426.36,
    high: 429.24,
    low: 402.54,
  } as Stock;

  ngOnInit() {
    this.filteredStocks$ = this.searchTerm$.pipe(
      withLatestFrom(this.stockService.stocks$),
      map(([searchTerm, stocks]) => {
        if (searchTerm) {
          return stocks.filter((item) =>
            item.symbol.toLocaleLowerCase().startsWith(searchTerm.toLowerCase())
          );
        }

        return [];
      })
    );

    this.stockService.loadStocks();
  }

  handleSearch(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;

    this.searchTerm$.next(target.value as string);
  }
}
