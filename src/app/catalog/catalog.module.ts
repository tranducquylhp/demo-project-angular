import {NgModule} from '@angular/core';
import {routing} from './catalog.routing';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
// Module components
import {CatalogCreateComponent} from './catalog-create/catalog-create.component';
import {CatalogListComponent} from './catalog-list/catalog-list.component';
import {CatalogEditComponent } from './catalog-edit/catalog-edit.component';

// Services
import {CatalogService} from './catalog.service';


// Theme modules
import {SmartadminModule} from '../shared/smartadmin.module';
import {SmartadminDatatableModule} from '../shared/ui/datatable/smartadmin-datatable.module';
import {SmartadminValidationModule} from '../shared/forms/validation/smartadmin-validation.module';
import {SmartadminInputModule} from '../shared/forms/input/smartadmin-input.module';


@NgModule({
    imports: [
        routing,
        CommonModule,
        SmartadminModule,
        SmartadminDatatableModule,
        SmartadminValidationModule,
        SmartadminInputModule,
        FormsModule

    ],
    declarations: [
        CatalogListComponent,
        CatalogCreateComponent,
        CatalogEditComponent
    ],
    providers: [
        CatalogService
    ]
})
export class CatalogModule {
}
