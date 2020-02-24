import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { bundleRouting } from "./bundle.routing";
import { SmartadminModule } from "../shared/smartadmin.module";
import { SmartadminInputModule } from "../shared/forms/input/smartadmin-input.module";
import { SmartadminValidationModule } from "../shared/forms/validation/smartadmin-validation.module";
import { SmartadminDatatableModule } from "../shared/ui/datatable/smartadmin-datatable.module";
import { SmartadminFormsModule } from "../shared/forms/smartadmin-forms.module";

import { BundleListComponent } from "./bundle-list/bundle-list.component";
import { BundleEditComponent } from "./bundle-edit/bundle-edit.component";
import { BundleInfoComponent } from "./bundle-edit/bundle-info/bundle-info.component";
import { BundleOfferingsComponent } from "./bundle-edit/bundle-offerings/bundle-offerings.component";
import { SalesChannelService } from "../sales-channel/sales-channel.service";
import { SegmentService } from "../segment/segment.service";
import { DocumentService } from "../document/document.service";
import { BundleDetailComponent } from "./bundle-edit/bundle-detail/bundle-detail.component";
import { PriceComponent } from "../price/price.component";
import { PriceModule } from "../price/price.module";

@NgModule({
  imports: [
    CommonModule,
    bundleRouting,
    SmartadminModule,
    SmartadminDatatableModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    SmartadminFormsModule,
    PriceModule

  ],
  declarations: [
    BundleListComponent,
    BundleEditComponent,
    BundleInfoComponent,
    BundleEditComponent,
    
    BundleOfferingsComponent,    
    BundleDetailComponent,
  ],
  providers: [SalesChannelService,SegmentService,DocumentService]
})
export class BundleModule {}
