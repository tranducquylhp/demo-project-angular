import { NgModule } from '@angular/core';
import { routing } from './specification.routing';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
// Module components
import { SpecificationCreateComponent } from './specification-create/specification-create.component';
import { SpecificationListComponent } from "./specification-list/specification-list.component";

//Services
import { specificationService } from './specification.service';


// Theme modules
import { SmartadminModule } from "../shared/smartadmin.module";
import { SmartadminDatatableModule } from "../shared/ui/datatable/smartadmin-datatable.module";
import { SmartadminValidationModule } from "../shared/forms/validation/smartadmin-validation.module";
import { SmartadminInputModule } from "../shared/forms/input/smartadmin-input.module";
import { SpecificationEditComponent } from './specification-edit/specification-edit.component';
import { Http, HttpModule } from '@angular/http';


@NgModule({
  imports: [
    routing,
    CommonModule,
    SmartadminModule,
    SmartadminDatatableModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    FormsModule,
    HttpModule


  ],
  declarations: [
    SpecificationListComponent,
    SpecificationCreateComponent,
    SpecificationEditComponent,
    
  ],
  providers: [
    specificationService,
    
  ]
})
export class SpecificationModule { }
