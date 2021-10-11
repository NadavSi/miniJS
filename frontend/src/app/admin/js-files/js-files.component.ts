import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JsFilesService } from './js-files.service';

@Component({
  selector: 'app-js-files',
  templateUrl: './js-files.component.html',
  styleUrls: ['./js-files.component.css']
})
export class JsFilesComponent implements OnInit {

  private jsfilesSubscription!: Subscription;
  public jsfiles: [] = [];
  public selectedjsfiles: [] = [];

  iconsPath = environment.iconsPath;

  columnsDef = [
    { field: 'name', name: 'name', header: 'שם בית העסק' },
    { field: 'phone', name: 'phone', header: 'טלפון בית העסק' },
    { field: 'email', name: 'email', header: 'דואל' },
    { field: 'address', name: 'address', header: 'כתובת' }
  ];

  constructor(private jsfilesService: JsFilesService) { }

  ngOnInit(): void {
    this.jsfilesService.getJsFiles();
    this.jsfilesSubscription = this.jsfilesService.getJsFilesList().subscribe(jsfiles => {
      // this.jsfiles = jsfiles;
    })
  }

  applyFilterGlobal(table: Table, $event: any, stringVal: any) {
    table.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }
  
  clear(table: Table) {
    table.clear();
  }
}
