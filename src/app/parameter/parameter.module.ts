import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {parameterRouting} from './parameter.routing';
import {SmartadminModule} from "../shared/smartadmin.module";
import {ParameterComponent} from "./parameter.component";

@NgModule({
  imports: [
    CommonModule,
    parameterRouting,
    SmartadminModule
  ],
  declarations: [ParameterComponent]
})
export class ParameterModule { }
