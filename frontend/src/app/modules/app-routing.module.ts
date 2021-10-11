import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';

import { EntityFormComponent } from '../admin/entities/entity-form/entity-form.component';
import { EntitiesComponent } from '../admin/entities/entities.component';
import { AppComponent } from '../app.component';
import { AdminComponent } from '../admin/admin.component';
import { JsFilesComponent } from '../admin/js-files/js-files.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'files',
        component: JsFilesComponent,
      },
      {
        path: 'files/:entityid',
        component: EntityFormComponent
      }
    ]
  },
  { path: '**', component: PagenotfoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
