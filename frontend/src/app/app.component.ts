import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'miniJS';

  constructor(
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     let segments = event.url.replace(/^\//, '').split('/');
    //   }
    // });
  }
}
