import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

import { Stock, StockDetails, StockPrice } from '@interfaces/stock';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  http = inject(HttpClient);

  private cache$ = new BehaviorSubject<Stock[]>([]);
  public stocks$: Observable<Stock[]> = this.cache$.asObservable();

  getDetails() {
    return this.http.get<StockDetails[]>('/assets/data/details.json');
  }

  getPrice() {
    return this.http.get<StockPrice[]>('/assets/data/pricing.json');
  }

  loadStocks() {
    if (this.cache$.getValue().length > 0) {
      return;
    }

    return combineLatest([this.getPrice(), this.getDetails()])
      .pipe(
        map(([prices, details]) => {
          const detailsMap = new Map();
          details.forEach((item) => detailsMap.set(item.symbol, item));

          return prices.map((item) => ({
            ...item,
            ...detailsMap.get(item.symbol),
          }));
        })
      )
      .subscribe((stocks) => this.cache$.next(stocks));
  }

  loadCachedStocks() {
    return this.cache$.getValue();
  }
}
