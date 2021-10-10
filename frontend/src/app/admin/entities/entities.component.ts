import { EntityService } from './entity.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Entity } from './entity.model';
import { Table } from 'primeng/table';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {

  private entitiesSubscription!: Subscription;
  public entities: Entity[] = [];
  public selectedEntities: Entity[] = [];

  iconsPath = environment.iconsPath;

  columnsDef = [
    { field: 'name', name: 'name', header: 'שם בית העסק' },
    { field: 'phone', name: 'phone', header: 'טלפון בית העסק' },
    { field: 'email', name: 'email', header: 'דואל' },
    { field: 'address', name: 'address', header: 'כתובת' }
  ];
  constructor(private entityService: EntityService) { }

  ngOnInit(): void {
    this.entityService.getEntities();
    this.entitiesSubscription = this.entityService.getEntitiesList().subscribe(entites => {
      this.entities = entites;
    })
  }

  applyFilterGlobal(table: Table, $event: any, stringVal: any) {
    table.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
  }
}
