import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {segmentRouting} from './segment.routing';
import {SegmentComponent} from "./segment.component";
import {SegmentDetailComponent} from "./detail/segmentdetail.component";
import {SegmentService} from "./segment.service";
import {NotificationComponent} from "../shared/utils/NotificationComponent";

// Theme modules
import { SmartadminModule } from "../shared/smartadmin.module";
import { SmartadminDatatableModule } from "../shared/ui/datatable/smartadmin-datatable.module";
import { SmartadminValidationModule } from "../shared/forms/validation/smartadmin-validation.module";
import { SmartadminInputModule } from "../shared/forms/input/smartadmin-input.module";

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    SmartadminDatatableModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    segmentRouting,
    SmartadminModule,
    FormsModule
  ],
  declarations: [SegmentComponent,SegmentDetailComponent],
  providers: [SegmentService,NotificationComponent]
})
export class SegmentModule { }  
