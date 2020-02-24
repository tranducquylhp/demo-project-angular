import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {salesChannelRouting} from './sales-channel.routing';
import {SalesChannelComponent} from "./sales-channel.component";
import {SalesChannelDetailComponent} from "./detail/sales-channeldetail.component";
import {SalesChannelService} from "./sales-channel.service";
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
    salesChannelRouting,
    SmartadminModule,
    FormsModule
  ],
  declarations: [SalesChannelComponent,SalesChannelDetailComponent],
  providers: [SalesChannelService,NotificationComponent]
})
export class SalesChannelModule { }  
