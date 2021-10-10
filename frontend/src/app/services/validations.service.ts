import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }

  static nameValidator(control: FormControl) {
    if (control.value) {
        const matches = control.value.match(/^[A-Za-z\s]+$/);
        return matches ? null : { 'invalidName': true };
    } else {
        return null;
    }
  }

  static phoneValidator(control: FormControl) {
    // console.log(control.value);
      let phone = control.value.replace('-', '');    
      const phonelen = phone.length
      const areaCodeLandArr = ['01','02','03','04','06','08','09'];
      const areaCodeMobileArr = ['05', '07'];
      const areaCodePayArr = ['1800', '1700'];
      switch (true) {
          case (phonelen == 0):
              return null;
          case (phonelen >= 1 && phonelen <= 8):
              return -1;
          case (phonelen == 9):
              if (areaCodeLandArr.includes(phone.substring(0, 2))) {
                  if (!/^\d+$/.test(phone)) { return -2; }
                  // $('#' + identifier).val(phone.substring(0, 2) + '-' + phone.substring(2, 9));
                  return true;
              } else {
                  return -2;
              }
          case (phonelen == 10):
              if (areaCodeMobileArr.includes(phone.substring(0, 2))) {
                  if (!/^\d+$/.test(phone)) { return -2; }
                  // $('#' + identifier).val(phone.substring(0, 3) + '-' + phone.substring(3, 10));
                  return true;
              } else if (areaCodePayArr.includes(phone.substring(0, 4))) {
                  if (!/^\d+$/.test(phone)) { return -2; }
                  // $('#' + identifier).val(phone.substring(0, 1) + '-' + phone.substring(1, 4) + '-' + phone.substring(4, 10));
                  return true;
              } else {
                  return -2;
              }
          default:
              return null;
      }





        const matches = control.value.match(/^[A-Za-z\s]+$/);
        return matches ? null : { 'invalidName': true };
  }
}
