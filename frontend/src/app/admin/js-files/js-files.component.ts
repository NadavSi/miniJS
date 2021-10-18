import { JSFile } from './../../models/file.model';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JsFilesService } from './js-files.service';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-js-files',
  templateUrl: './js-files.component.html',
  styleUrls: ['./js-files.component.css']
})
export class JsFilesComponent implements OnInit, OnDestroy {

  private jsfilesSubscription: Subscription;
  jsfiles: JSFile[] = [];
  public selectedjsfiles: [] = [];
  closeResult = '';
  compressedData = '';
  recordid = '';
  dialogRef: NgbModalRef
  iconsPath = environment.iconsPath;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  columnsDef = [
    { field: 'filename', name: 'filename', header: 'File Name' },
    // { field: 'minfilename', name: 'minfilename', header: 'Minified File Name' },
    { field: 'createdAt', name: 'createdAt', header: 'Created At', isDate: true },
    { field: 'updatedAt', name: 'updatedAt', header: 'Updated At', isDate: true }
  ];

  fileName: string;
  file: File;
  isJSFile: boolean = true;

  constructor(private jsfilesService: JsFilesService, private router: Router, private route: ActivatedRoute, private dialog: NgbModal, private _ngZone: NgZone) { }

  ngOnInit(): void {
    this.jsfiles = this.jsfilesService.getJsFiles();
    this.jsfilesSubscription = this.jsfilesService.getJsFilesList().subscribe((files: JSFile[]) => {
      this.jsfiles = files;
    })
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

  updateData(recordid: string, cdata: any) {
    this.jsfilesService.updateFile(recordid, cdata);
    this.dialogRef.close();
  }

  openDialog(recordid: string, content: any) {
    this.compressedData = (this.jsfiles.find(file => file.id == recordid)).compressedData;
    this.recordid = recordid;
    this.dialogRef = this.dialog.open(content, { windowClass: 'modalSize', ariaLabelledBy: 'modal-basic-title' })
    this.dialogRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnDestroy(): void {
    this.jsfilesSubscription.unsubscribe();
  }
}
