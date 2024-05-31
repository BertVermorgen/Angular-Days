import { Component } from '@angular/core';
import { SocksService } from '@services/socks.service';
import { Observable } from 'rxjs';
import { Sock } from '@models/sock.model';
import { AsyncPipe } from '@angular/common';
import {SockTileComponent} from "@app/socks/sock-tile/sock-tile.component";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [AsyncPipe, SockTileComponent],
  templateUrl: './shop.component.html'
})
export class ShopComponent {
  socks$!: Observable<Sock[]>;

  constructor(private socksService: SocksService) {}

  ngOnInit(): void {
    this.socks$ = this.socksService.get();
  }
}
