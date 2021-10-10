import { NavItem } from './menu-list/menu-list.component';
import { NavService } from './../../services/nav.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit,AfterViewInit {
  isLoading: boolean = true;
  showFiller = false;
  iconsPath = environment.iconsPath;
  logosPath = environment.logosPath;
  navItems: NavItem[] = [];
  @ViewChild('drawer') appDrawer: ElementRef;

  constructor(private navService: NavService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.navItems = this.navService.buildMenu();
  }

  ngAfterViewInit(): void {
    this.navService.appDrawer = this.appDrawer;
  }

  toggleDrawer() {
    this.navService.toggleNav();
  }
}
