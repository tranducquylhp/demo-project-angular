import {Component, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
  // template: `
  // <h1 class="title">Angular Router</h1>
  // <nav>
  //   <a routerLink="/characteristic" routerLinkActive="active">characteristic</a>
  //   <a [routerLink]="[{ outlets: { popup: ['compose'] } }]">Contact</a>
  // </nav>
  // <router-outlet></router-outlet>
  // <router-outlet name="popup"></router-outlet>
  // `
})
export class AppComponent {
  public title = 'app works!';

  public constructor(private viewContainerRef: ViewContainerRef) {}

} 