import {Component, Input} from '@angular/core';
import {Review} from "@models/sock.model";
import {TimeAgoPipe} from "@shared/time-ago.pipe";

@Component({
  selector: 'app-sock-review',
  standalone: true,
  imports: [
    TimeAgoPipe
  ],
  templateUrl: './sock-review.component.html'
})
export class SockReviewComponent {
  @Input() review!: Review;
}
