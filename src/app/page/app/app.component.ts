import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
// import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tour of Heroes';
  isShow = true;

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.match(/^\/calc/) === null) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      }
    });

    // 使用 filter 操作符
    // this.router.events.pipe(
    //   filter(e => e instanceof NavigationEnd)
    // ).subscribe((e: NavigationEnd) => {
    //   if (e.url === '/calc') {
    //     this.isShow = false;
    //   } else {
    //     this.isShow = true;
    //   }
    // });
  }
}
