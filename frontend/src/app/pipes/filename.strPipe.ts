import { Pipe, PipeTransform } from '@angular/core';
   import { DatePipe } from '@angular/common';

   @Pipe({
     name: 'filename'
   })
   export class FilenamePipe implements PipeTransform {
     transform(value: any, args?: any): any {
       return value.substr(value.lastIndexOf("/") + 1);
     }
   }
