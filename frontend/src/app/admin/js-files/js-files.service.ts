import { JSFile } from './../../models/file.model';
import { trigger } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class JsFilesService {
  private jsFile!: JSFile;
  private jsFiles: JSFile[] = [];
  private jsFilesArray = new Subject<JSFile[]>();

  constructor(private httpService: HttpService) { }

  getJsFiles() {
    let minfiles = localStorage.getItem('minfiles');
    if (minfiles != null) {
      this.jsFiles = JSON.parse(minfiles);
    }
    console.log(this.jsFiles)
    this.jsFilesArray.next(this.jsFiles);
    return this.jsFiles;
  }

  getJsFilesList() {
    return this.jsFilesArray.asObservable();
  }

  updateFile(recordid: string, cdata: any) {
    let selectedRecord = this.jsFiles.find(
      (record: JSFile) => record.id == recordid
    );
    console.log(selectedRecord);
    let arrayWithoutRecord = this.jsFiles.filter(record => record.id != recordid);
    console.log(arrayWithoutRecord);
    selectedRecord.compressedData = cdata;
    selectedRecord.updatedAt = new Date;
    arrayWithoutRecord.push(selectedRecord);
    this.jsFiles = arrayWithoutRecord;
    localStorage.setItem('minfiles', JSON.stringify(this.jsFiles));
    this.jsFilesArray.next([...this.jsFiles]);
  }

  uploadNewFile(file: FormData) {
    const selectedFile: any = file.get('jsfileUpload');
    const filename: string = selectedFile.name;
    this.httpService.postPatch<any>('jsfiles', file, null).subscribe((data) => {
      if (data.status == 1) {
        let jsFilesArr: JSFile[] = [];
        let minfiles = localStorage.getItem('minfiles');
        if (minfiles == null) {
          let jsfile = new JSFile;
          jsfile.id = filename;
          jsfile.filename = filename;
          jsfile.compressedData = data.compressedData;
          jsFilesArr.push(jsfile);
          localStorage.setItem('minfiles', JSON.stringify(jsFilesArr));
        } else {
          jsFilesArr = JSON.parse(minfiles);
          let recordIndex = jsFilesArr.findIndex(
            (record: JSFile) => record.filename == filename
          );
          if (recordIndex != -1) {
            jsFilesArr[recordIndex].data = data.compressedData;
            jsFilesArr[recordIndex].updatedAt = new Date;
            localStorage.setItem('minfiles', JSON.stringify(jsFilesArr));
          } else {
            let jsfile = new JSFile;
            jsfile.id = filename;
            jsfile.filename = filename;
            jsfile.compressedData = data.compressedData;
            jsFilesArr.push(jsfile);
            // jsFilesArr.push({ id: filename, filename: filename, data: data.compressedData,'createdAt': new Date, 'updatedAt': new Date });
            localStorage.setItem('minfiles', JSON.stringify(jsFilesArr));
          }
        }
        this.jsFiles = jsFilesArr;
        this.jsFilesArray.next([...jsFilesArr]);
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
