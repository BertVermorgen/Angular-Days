import {Component, ViewChild} from '@angular/core';
import {SocksService} from '@services/socks.service';
import {map, Observable, of} from 'rxjs';
import {Sock} from '@models/sock.model';
import {AsyncPipe} from '@angular/common';
import {SockTileComponent} from "@app/socks/sock-tile/sock-tile.component";
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatGridList, MatGridListModule, MatGridTile} from '@angular/material/grid-list';
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [AsyncPipe, SockTileComponent, MatPaginator, MatInputModule, MatGridTile, MatGridList],
  templateUrl: './shop.component.html'
})
export class ShopComponent {
  socks$!: Observable<Sock[]>;
  socks: Sock[] = [];
  paginatedSocks$: Observable<Sock[]> = of([]);
  pageIndex = 0;
  pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private socksService: SocksService) {
  }

  ngOnInit(): void {
    this.socks$ = this.socksService.get();
    this.paginate();
  }

  handlePage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginate();
  }

  paginate() {
    this.socks$.subscribe(socks => {
      const start = this.pageIndex * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedSocks$ = of(socks.slice(start, end));
    });
    this.sortSocks();
  }

  applyFilter(event?: Event): void {
    if (event) {
      const filter = (event.target as HTMLInputElement).value;
      this.socks$.subscribe(socks => {
        const filteredSocks = filter ?
          socks.filter(sock => {
            return sock.name.toLowerCase().includes(filter.toLowerCase()) ||
              sock.variant.toLowerCase().includes(filter.toLowerCase())
          }) : socks;
        const start = this.pageIndex * this.pageSize;
        const end = start + this.pageSize;
        this.paginatedSocks$ = of(filteredSocks.slice(start, end));
      });
    }
  }

  sortSocks() {
    this.paginatedSocks$.subscribe(socks => {
      socks.sort((a, b) => {
        if (a.name.toLowerCase() === b.name.toLowerCase()) {
          return a.price - b.price;
        }
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
      });
    });
  }
}
