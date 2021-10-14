import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';
import { JSFile } from '../models/file.model';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private files: JSFile[] = [];
  private filesArry = new Subject<JSFile[]>();

  isRefresh = new EventEmitter<Boolean>();

  constructor(private httpService: HttpService, private http: HttpClient) {
    httpService.setHeaders({ 'Authorization': localStorage.getItem("token") });
  }

  uploadNewFile(file: FormData) {
    console.log(this.files);
    this.httpService.postPatch<any>('files', file, null).subscribe((data) => {
      const fileObj = data.file;
      if (data.status == 1) {
        this.files.push(fileObj);
        this.filesArry.next([...this.files]);
      } else {
        this.files = this.files.filter((item) => item.id !== fileObj.id);
        this.files.push(fileObj);
        this.filesArry.next([...this.files]);
      }
      this.isRefresh.emit(true);
      // return 'file uploaded';
    });
  }

  fetchUserFiles() {
    this.filesArry.next([]);
    return this.httpService.getRemove<any>(null, 'files').subscribe((data) => {
      this.files = data.files;
      this.filesArry.next([...this.files]);
    });
  }

  getFilesData() {
    return this.filesArry.asObservable();
  }

  fetchFile(fileid: string) {
    return this.httpService.getRemove<any>(fileid, 'files');
  }

  updateFile(fileid: string,formData: any) {
    return this.httpService.postPatch<any>('files', formData, fileid, "put");
  }

  downloadFile(fileid: string, mode: any, version: any) {
    return this.httpService
      .getRemove<any>(null, 'files/dld/' + fileid,{mode: mode,version: version});
  }

  deleteFile(fileid: string) {
    this.httpService
      .getRemove(fileid, 'files', null, 'delete')
      .subscribe((resp) => {
        this.files = this.files.filter((item) => item.id !== fileid);
        this.filesArry.next([...this.files]);
        this.isRefresh.emit(true);
      });
  }
}
