import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  private lastValue: any;
  private lastText: string;
  private timer: any;

  constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {}

  transform(value: Date | string | number): string {
    if (this.lastValue !== value) {
      this.lastValue = value;
      this.lastText = this.formatTimeAgo(value);
      this.resetTimer();
    }
    return this.lastText;
  }

  private formatTimeAgo(value: Date | string | number): string {
    return formatDistanceToNow(new Date(value), { addSuffix: true });
  }

  private resetTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.ngZone.runOutsideAngular(() => {
      this.timer = setTimeout(() => {
        this.lastText = this.formatTimeAgo(this.lastValue);
        this.ngZone.run(() => this.changeDetectorRef.markForCheck());
      }, 60000); // Update every minute
    });
  }

  private cleanup() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
