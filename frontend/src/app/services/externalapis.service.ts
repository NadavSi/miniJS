import { City } from './../models/city.model';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExternalapisService {
  constructor(private httpSevice: HttpService) {}

  getAllCities() {
    return this.httpSevice
      .getRemoveExt<any>(
        null,
        'https://data.gov.il/api/3/action/datastore_search',
        { resource_id: '5c78e9fa-c2e2-4771-93ff-7f400a12f7ba', limit: 5000 }
      )
      .pipe(
        map((data) => {
          return data.result.records.map((city: any) => {
            let newCity = new City();
            newCity.id = city._id;
            newCity.hebname = city.שם_ישוב.trim();
            newCity.engname = city.שם_ישוב_לועזי.trim();
            newCity.citycode = city.סמל_ישוב;
            return newCity;
          });
        })
      );
  }
}
