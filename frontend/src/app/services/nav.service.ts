import {EventEmitter, Injectable} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';
import { NavItem } from '../admin/menu/menu-list/menu-list.component';

@Injectable({
  providedIn: 'root',
})
export class NavService {

  iconsPath = environment.iconsPath;
  workPlaceDomain = localStorage.getItem('entitydomain');
  navItems: NavItem[] = [
    {
      displayName: 'עמוד הבית',
      iconName: this.iconsPath + '/png-32/bank-32x32-28642.png',
      route: this.workPlaceDomain,
      children: []
    },
    {
      displayName: 'בית העסק',
      iconName: this.iconsPath + '/png-32/store-32x32-729039.png',
      route: this.workPlaceDomain + '/entities/' + localStorage.getItem('entityid'),
      children: []
    },
    {
      displayName: 'עובדים',
      iconName: this.iconsPath + '/png-32/business-32x32-104411.png',
      route: this.workPlaceDomain + '/users',
      children: []
    },
    {
      displayName: 'ניהול',
      iconName: this.iconsPath + '/png-32/file-32x32-28660.png',
      route: '',
      children: [
        {
          displayName: 'פעולות',
          iconName: this.iconsPath + '/png-32/business-32x32-104411.png',
          route: this.workPlaceDomain + '/pactions',
          children: []
        }
      ]
    }
  ];

  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);

  constructor(private router: Router, private httpSevice: HttpService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  buildMenu() {
    return this.navItems;
  }

  closeNav() {
    this.appDrawer.close();
  }

  openNav() {
    this.appDrawer.open();
  }

  toggleNav() {
    console.log('ggg');
    this.appDrawer.toggle();
  }
}
