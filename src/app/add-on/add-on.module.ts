import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {addOnRouting} from './add-on.routing';
import {SmartadminModule} from "../shared/smartadmin.module";
import {AddOnComponent} from "./add-on.component";

@NgModule({
  imports: [
    CommonModule,
    addOnRouting,
    SmartadminModule
  ],
  declarations: [AddOnComponent]
})
export class AddOnModule { }
