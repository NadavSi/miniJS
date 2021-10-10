import { EntityService } from './../entity.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Entity } from '../entity.model';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit {
  private readonly notifier: NotifierService;
  entityid: any = '';
  entityForm!: FormGroup;
  entity: Entity = new Entity;
  isEdit: boolean = false;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private entityService: EntityService, private route: ActivatedRoute, private notifierService: NotifierService) {
    this.notifier = notifierService;
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('entityid') && paramMap.get('entityid') != null) {
        this.entityid = paramMap.get('entityid');
      }
    })
    this.entityService.getEntity(this.entityid).subscribe((data) => {
      if (typeof (data.entity) != 'undefined') { this.entity = data.entity; this.isEdit = true; }
      this.entityForm = this.fb.group({
        name: [this.entity.name],
        identitynum: [this.entity.identitynum],
        phone: [this.entity.phone],
        email: [this.entity.email],
        address: [this.entity.address]
      });
    });
  } 

  onCreate() {
    if (this.entityForm.valid) {
      this.isLoading = true;
      if (this.isEdit) {
        this.entityService.updateEntity(this.entityForm.value, this.entityid).subscribe(() => {
          this.isLoading = false;
          this.notifier.notify('success', 'הרשומה עודכנה');
        });
      } else {
        this.entityService.createEntity(this.entityForm.value).subscribe(() => {
          this.isLoading = false;
          this.notifier.notify('success', 'הרשומה נשמרה');
        });
      }
    }
  }
}
