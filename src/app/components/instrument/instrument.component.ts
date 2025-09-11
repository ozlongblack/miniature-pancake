import { CurrencyPipe, DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { Instrument } from '@interfaces/stock';

@Component({
  selector: 'app-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss'],
  imports: [CurrencyPipe, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstrumentComponent {
  data = input.required<Instrument>();
  showChange = input<boolean>(true);

  change = computed(() => {
    if (this.data().close && this.data().open) {
      return ((this.data().close - this.data().open) / this.data().open) * 100;
    }

    return 0;
  });
}
