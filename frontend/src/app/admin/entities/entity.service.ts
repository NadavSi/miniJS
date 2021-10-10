import { Entity } from './entity.model';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  private entity!: Entity;
  private entities: Entity[] = [];
  private entitiesArray = new Subject<Entity[]>();

  constructor(private httpService: HttpService) { }

  getEntities() {
    this.httpService.getRemove<any>(null, 'entities')
      .subscribe(data => {
        console.log(data);
        this.entities = data.entities;
        this.entitiesArray.next([...data.entities]);
      });
  }

  getEntitiesList() {
    return this.entitiesArray.asObservable();
  }

  getEntity(id: string) {
    return this.httpService.getRemove<any>(id, 'entities');
  }

  createEntity(entity: Entity) {
    return this.httpService.postPatch('entities', entity, null);
  }

  updateEntity(entity: Entity, entityid: string) {
    console.log(entity);
    return this.httpService.postPatch('entities', entity, entityid, "put");
  }

  getEntitiesSelect() {
    return this.httpService.getRemove<any>(null, 'entities')
      .pipe(map(data => {
        return data.entities.map((entity: Entity) => {
          return {
            id: entity.id,
            name: entity.name,
            domainid: entity.domainid
          }
        });
      }));
  }
}
