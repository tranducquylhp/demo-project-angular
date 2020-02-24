import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {testRouting} from './test.routing';
import {SmartadminModule} from "../shared/smartadmin.module";
import {TestComponent} from "./test.component";

@NgModule({
  imports: [
    CommonModule,
    testRouting,
    SmartadminModule
  ],
  declarations: [TestComponent]
})
export class TestModule { }
