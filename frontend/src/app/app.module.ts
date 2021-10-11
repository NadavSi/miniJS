import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './modules/app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from './modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomDatePipe } from './pipes/custom.DatePipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { AdminComponent } from './admin/admin.component';
import { EntitiesComponent } from './admin/entities/entities.component';
import { EntityFormComponent } from './admin/entities/entity-form/entity-form.component';
import { NotifierModule } from 'angular-notifier';

import localeHe from '@angular/common/locales/he';
import { registerLocaleData } from '@angular/common';
import { MenuComponent } from './admin/menu/menu.component';
import { MenuListComponent } from './admin/menu/menu-list/menu-list.component';
import { ButtonModule } from 'primeng/button';
import { LayoutModule } from '@angular/cdk/layout';
import { JsFilesComponent } from './admin/js-files/js-files.component';

registerLocaleData(localeHe);

@NgModule({
  declarations: [
    AppComponent,
    CustomDatePipe,
    AdminComponent,
    EntitiesComponent,
    EntityFormComponent,
    MenuComponent,
    MenuListComponent,
    JsFilesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    TableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    LayoutModule,
    NotifierModule.withConfig({
      position: {
        vertical: {
          position: 'top'
        }
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
