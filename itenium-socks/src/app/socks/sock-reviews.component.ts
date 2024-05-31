import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SocksService } from '@services/socks.service';
import { Review } from '@models/sock.model';
import {SockReviewComponent} from "@app/socks/sock-review/sock-review.component";

@Component({
  selector: 'app-sock-reviews',
  standalone: true,
  imports: [AsyncPipe, SockReviewComponent],
  templateUrl: './sock-reviews.component.html'
})
export class SockReviewsComponent {
  reviews$!: Observable<Review[]>;

  constructor(private socksService: SocksService) {}

  ngOnInit(): void {
    this.reviews$ = this.socksService.getLatestReviews();
  }
}
