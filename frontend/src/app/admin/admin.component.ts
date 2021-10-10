import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isLoading: boolean = true;
  showFiller = false;
  iconsPath = environment.iconsPath;
  logosPath = environment.logosPath;

  constructor() { }
  showSubmenu: boolean = false;
  isExpanded: boolean = false;
  isShowing: boolean = false;

  ngOnInit(): void {
    this.isLoading = false;
  }
}
