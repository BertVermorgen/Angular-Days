import {Component} from '@angular/core';
import {SocksService} from '@services/socks.service';
import {Observable} from 'rxjs';
import {Sock} from '@models/sock.model';
import {AsyncPipe} from '@angular/common';
import {SockTileComponent} from "@app/socks/sock-tile/sock-tile.component";
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [AsyncPipe, SockTileComponent, MatPaginator],
  templateUrl: './shop.component.html'
})
export class ShopComponent {
  socks$!: Observable<Sock[]>;
  socks: Sock[] = [];
  pagedSocks: Sock[] = [];
  pageIndex = 0;
  pageSize = 10; // Change this to your desired page size
  totalSocks = 0;

  constructor(private socksService: SocksService) {
  }

  ngOnInit(): void {
    this.socks$ = this.socksService.get();
    this.socks$.subscribe(socks => {
      this.socks = socks;
      this.totalSocks = socks.length;
      this.updatePagedSocks();
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedSocks();
  }

  private updatePagedSocks(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedSocks = this.socks.slice(start, end);
  }
}
