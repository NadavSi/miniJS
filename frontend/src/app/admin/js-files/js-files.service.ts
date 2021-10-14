import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class JsFilesService {
  private jsFile!: object;
  private jsFiles: [] = [];
  private jsFilesArray = new Subject<object[]>();

  constructor(private httpService: HttpService) { }

  getJsFiles() {
    this.httpService.getRemove<any>(null, 'jsFiles')
      .subscribe(data => {
        console.log(data);
        this.jsFiles = data.jsFiles;
        this.jsFilesArray.next([...data.jsFiles]);
      });
  }

  getJsFilesList() {
    return this.jsFilesArray.asObservable();
  }

  getFile(id: string) {
    return this.httpService.getRemove<any>(id, 'jsFiles');
  }

  createFile(jsFile: object) {
    return this.httpService.postPatch('jsFiles', jsFile, null);
  }

  updateFile(jsFile: object, jsFileid: string) {
    console.log(jsFile);
    return this.httpService.postPatch('jsFiles', jsFile, jsFileid, "put");
  }

  getJsFilesSelect() {
    return this.httpService.getRemove<any>(null, 'jsFiles')
      .pipe(map(data => {
        return data.jsFiles.map((jsFile: object) => {
          return {
            // id: jsFile.id,
            // name: jsFile.name,
            // domainid: jsFile.domainid
          }
        });
      }));
  }

  uploadNewFile(file: FormData) {
    console.log(this.jsFiles);
    this.httpService.postPatch<any>('files', file, null).subscribe((data) => {
      const fileObj = data.file;
      // if (data.status == 1) {
      //   this.jsFiles.push(fileObj);
      //   this.jsFilesArry.next([...this.jsFiles]);
      // } else {
      //   this.jsFiles = this.jsFiles.filter((item) => item.id !== fileObj.id);
      //   this.jsFiles.push(fileObj);
      //   this.jsFilesArry.next([...this.jsFiles]);
      // }
      // this.isRefresh.emit(true);
      // return 'file uploaded';
    });
  }
}
