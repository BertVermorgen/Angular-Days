import {Component, Input} from '@angular/core';
import {Sock} from '@models/sock.model';
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-sock-tile',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './sock-tile.component.html'
})
export class SockTileComponent {
  @Input() sock!: Sock;
}
