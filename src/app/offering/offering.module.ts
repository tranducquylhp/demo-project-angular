import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {offeringRouting} from './offering.routing';
import {SmartadminModule} from "../shared/smartadmin.module";
import {OfferingComponent} from "./offering.component";
import {SmartadminInputModule} from "../shared/forms/input/smartadmin-input.module";
import {SmartadminValidationModule} from "../shared/forms/validation/smartadmin-validation.module";
import {SmartadminDatatableModule} from "../shared/ui/datatable/smartadmin-datatable.module";
import { OfferingListComponent } from './offering-list/offering-list.component';
import { OfferingEditComponent } from './offering-edit/offering-edit.component';
import {SmartadminFormsModule} from "../shared/forms/smartadmin-forms.module";
import { SalesChannelService } from '../sales-channel/sales-channel.service';
import { SegmentService } from '../segment/segment.service';
import { DocumentService } from '../document/document.service';
import {PriceComponent} from "../price/price.component";
import { PriceModule } from '../price/price.module';

@NgModule({
    imports: [
        CommonModule,
        offeringRouting,
        SmartadminModule,
        SmartadminDatatableModule,
        SmartadminValidationModule,
        SmartadminInputModule,
        SmartadminFormsModule,PriceModule
    ],
    declarations: [OfferingListComponent, OfferingEditComponent],
    providers: [SalesChannelService,SegmentService,DocumentService]
})
export class OfferingModule {
}
