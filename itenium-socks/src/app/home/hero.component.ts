import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {environment} from "@environment/environment";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  protected readonly environment = environment;
}
