import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsCreateComponent } from './students-create/students-create.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentsEditComponent } from './students-edit/students-edit.component';
import {SmartadminDatatableModule} from "../shared/ui/datatable/smartadmin-datatable.module";
import {StudentsService} from "./students.service";
import {SmartadminModule} from "../shared/smartadmin.module";
import {SmartadminValidationModule} from "../shared/forms/validation/smartadmin-validation.module";
import {SmartadminInputModule} from "../shared/forms/input/smartadmin-input.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {routing} from "./students.routing";

@NgModule({
  imports: [
    routing,
    CommonModule,
    SmartadminModule,
    SmartadminDatatableModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  declarations: [StudentsCreateComponent, StudentsListComponent, StudentsEditComponent],
  providers: [
      StudentsService
  ]
})
export class StudentsModule { }
