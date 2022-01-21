import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-cookies-page',
  templateUrl: './cookies-page.component.html',
  styleUrls: ['./cookies-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CookiesPageComponent {}
