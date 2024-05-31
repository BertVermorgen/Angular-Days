import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {environment} from "@environment/environment";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  protected readonly environment = environment;
}
