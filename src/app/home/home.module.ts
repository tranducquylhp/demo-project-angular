import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { homeRouting } from './home.routing';
import { SmartadminModule } from "../shared/smartadmin.module";
import { HomeComponent } from "./home.component";
import { ChartsModule } from 'ng2-charts';
import { MorrisGraphModule } from "../shared/graphs/morris-graph/morris-graph.module";


import { ChartJsModule } from "../shared/graphs/chart-js/chart-js.module";


@NgModule({
  imports: [
    CommonModule,
    homeRouting,
    SmartadminModule,
    ChartsModule,
    MorrisGraphModule,
    ChartJsModule    
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
