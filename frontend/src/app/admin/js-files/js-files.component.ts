import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    { field: 'filename', name: 'filename', header: 'File Name' },
    { field: 'minfilename', name: 'minfilename', header: 'Minified File Name' },
    { field: 'createdAt', name: 'createdAt', header: 'Created At' },
    { field: 'updatedAt', name: 'updatedAt', header: 'Updated At' },
    { field: 'action', name: 'actions', header: 'Actions' }
  ];

  fileName: string;
  file: File;
  isJSFile: boolean = true;

  constructor(private jsfilesService: JsFilesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.jsfilesService.getJsFiles();
    // this.jsfilesSubscription = this.jsfilesService.getJsFilesList().subscribe(jsfiles => {
    //   // this.jsfiles = jsfiles;
    // })
  }

  applyFilterGlobal(table: Table, $event: any, stringVal: any) {
    table.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
  }

  onFileSelected(e: any) {
    this.isJSFile = true;
    this.file = null;
    console.log(e);
    this.file = e.target.files[0];
    if (this.file && (this.file.name).substr((this.file.name).lastIndexOf(".")) == '.js') {
      this.fileName = this.file.name;
    } else {
      this.file = null;
      this.isJSFile = false;
    }
  }

  onRemoveSelecetd() {
    this.fileName = null;
  }

  onUpladFile() {
    const formData = new FormData();
    formData.append('jsfileUpload', this.file);
    this.jsfilesService.uploadNewFile(formData);
    this.fileName = null;
  }
}
