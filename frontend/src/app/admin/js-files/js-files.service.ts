import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class JsFilesService {
  private jsFile!: object;
  private jsFiles: object[] = [];
  private jsFilesArray = new Subject<object[]>();

  constructor(private httpService: HttpService) { }

  getJsFiles() {
    let minfiles = localStorage.getItem('minfiles');
    if (minfiles != null) {
      this.jsFiles = JSON.parse(minfiles);
      this.jsFilesArray.next([...JSON.parse(minfiles)]);
    } else {
      this.jsFilesArray.next([...this.jsFiles]);
    }
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
    return this.httpService.postPatch('jsFiles', jsFile, jsFileid, 'put');
  }

  getJsFilesSelect() {
    return this.httpService.getRemove<any>(null, 'jsFiles').pipe(
      map((data) => {
        return data.jsFiles.map((jsFile: object) => {
          return {
            // id: jsFile.id,
            // name: jsFile.name,
            // domainid: jsFile.domainid
          };
        });
      })
    );
  }

  uploadNewFile(file: FormData) {
    const selectedFile: any = file.get('jsfileUpload');
    const filename: string = selectedFile.name;
    this.httpService.postPatch<any>('jsfiles', file, null).subscribe((data) => {
      if (data.status == 1) {
        let minfilesArr = [];
        let minfiles = localStorage.getItem('minfiles');
        if (minfiles == null) {
          console.log(1);
          minfilesArr = [
            {
              id: filename,
              filename: filename,
              data: data.compressedData,
              'createdAt': new Date,
              'updatedAt': new Date
            }
          ];
          localStorage.setItem('minfiles', JSON.stringify(minfilesArr));
        } else {
          console.log(2);
          minfilesArr = JSON.parse(minfiles);
          let recordIndex = minfilesArr.findIndex(
            (record: { filename: string }) => record.filename == filename
          );
          if (recordIndex != -1) {
            console.log(3);
            minfilesArr[recordIndex].data = data.compressedData;
            minfilesArr[recordIndex].updatedAt = new Date;
            localStorage.setItem('minfiles', JSON.stringify(minfilesArr));
          } else {
            console.log(4);
            minfilesArr.push({ id: filename, filename: filename, data: data.compressedData,'createdAt': new Date, 'updatedAt': new Date });
            localStorage.setItem('minfiles', JSON.stringify(minfilesArr));
          }
        }
        this.jsFilesArray.next([...minfilesArr]);
        // this.jsFiles.push(fileObj);
        // this.jsFilesArry.next([...this.jsFiles]);
      } else {
        // this.jsFiles = this.jsFiles.filter((item) => item.id !== fileObj.id);
        // this.jsFiles.push(fileObj);
        // this.jsFilesArry.next([...this.jsFiles]);
      }
      // this.isRefresh.emit(true);
      return 'file uploaded';
    });
  }
}
