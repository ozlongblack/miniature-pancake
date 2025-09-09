import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StockType } from '@interfaces/stock';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeComponent {
  type = input.required<StockType>();

  stockType = StockType;
}
