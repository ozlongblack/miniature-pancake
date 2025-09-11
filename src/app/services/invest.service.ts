import { Injectable, inject } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular/standalone';
import { first } from 'rxjs';

import { Stock } from '@interfaces/stock';
import { ModalComponent } from '@components/modal/modal.component';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class InvestService {
  modalController = inject(ModalController);
  toastController = inject(ToastController);
  userService = inject(UserService);

  async openModal(stock: Stock) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      initialBreakpoint: 1,
      breakpoints: [0, 1],
      componentProps: {
        data: stock,
      },
    });

    modal.onWillDismiss().then(async (result) => {
      if (result.data) {
        this.userService.user$.pipe(first()).subscribe(async (user) => {
          if (user) {
            const updatedHoldings = [...(user.holdings || [])];
            const newHolding = {
              symbol: result.data.symbol,
              share: result.data.amount,
            };

            const holdingIndex = user.holdings.findIndex(
              (holding) => holding.symbol === newHolding.symbol
            );

            if (holdingIndex > -1) {
              updatedHoldings[holdingIndex] = {
                ...updatedHoldings[holdingIndex],
                share: updatedHoldings[holdingIndex].share + newHolding.share,
              };
            } else {
              updatedHoldings.push(newHolding);
            }

            this.userService.updateUser({
              equity: (user.equity || 0) + result.data.shares,
              holdings: updatedHoldings,
            });
          }

          const toast = await this.toastController.create({
            message: `${result.data.symbol} successfully purchased!`,
            position: 'top',
            color: 'success',
            duration: 3000,
            cssClass: 'custom-toast',
          });

          await toast.present();
        });
      }
    });

    return await modal.present();
  }
}
