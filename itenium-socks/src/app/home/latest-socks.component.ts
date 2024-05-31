import { Component, OnInit } from '@angular/core';
import { SocksService } from '@services/socks.service';
import { Observable } from 'rxjs';
import { Sock } from '@models/sock.model';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-latest-socks',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './latest-socks.component.html'
})
export class LatestSocksComponent implements OnInit {
  socks$!: Observable<Sock[]>;

  constructor(private socksService: SocksService) {}

  ngOnInit(): void {
    this.socks$ = this.socksService.getLatest();
  }
}
