import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PriceRouting} from './price.routing';
import { PriceComponent } from "./price.component";

// Theme modules
import { SmartadminModule } from "../shared/smartadmin.module";
import { SmartadminDatatableModule } from "../shared/ui/datatable/smartadmin-datatable.module";
import { SmartadminValidationModule } from "../shared/forms/validation/smartadmin-validation.module";
import { SmartadminInputModule } from "../shared/forms/input/smartadmin-input.module";

@NgModule({
    imports: [
        CommonModule,
        PriceRouting,
        SmartadminModule,
        SmartadminDatatableModule,
        SmartadminValidationModule,
        SmartadminInputModule
    ],
    declarations: [PriceComponent],
    exports:[PriceComponent]
})
export class PriceModule { }
