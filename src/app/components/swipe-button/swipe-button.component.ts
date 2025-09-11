import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  inject,
  output,
} from '@angular/core';
import { GestureController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-swipe-button',
  templateUrl: './swipe-button.component.html',
  styleUrls: ['./swipe-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwipeButtonComponent implements AfterViewInit {
  @ViewChild('swipeButton', { read: ElementRef }) swipeButtonRef!: ElementRef;
  elementRef = inject(ElementRef);
  gestureCtrl = inject(GestureController);
  complete = output<void>();

  private panGesture: any;
  private initialX: number = 0;

  ngAfterViewInit(): void {
    this.createPanGesture();
  }

  createPanGesture() {
    const element = this.swipeButtonRef.nativeElement;

    this.panGesture = this.gestureCtrl.create({
      el: element,
      gestureName: 'pan',
      direction: 'x',
      gesturePriority: 100,
      onStart: (ev) => {
        this.initialX = ev.currentX;
      },
      onMove: (ev) => {
        const deltaX = ev.currentX - this.initialX;

        if (deltaX > 0) {
          element.style.transform = `translateX(${deltaX}px)`;
        }
      },
      onEnd: (ev) => {
        const container = this.elementRef.nativeElement;
        const containerWidth = container.offsetWidth - 50;
        const successThreshold = containerWidth * 0.65;
        const finalDeltaX = ev.currentX - this.initialX;

        if (finalDeltaX > successThreshold) {
          element.style.transform = `translateX(${containerWidth}px)`;
          setTimeout(() => {
            this.complete.emit();
          }, 250);
        } else {
          element.style.transform = `translateX(0px)`;
        }
      },
    });

    this.panGesture.enable(true);
  }
}
