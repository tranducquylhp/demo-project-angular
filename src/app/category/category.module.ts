import { NgModule } from '@angular/core';
import { routing } from './category.routing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryEditComponent } from './category-edit.component';
import { CategoryListComponent } from './category-list.component';
import { CategoryService } from './category.service';

// Theme modules
import { SmartadminModule } from '../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../shared/ui/datatable/smartadmin-datatable.module';
import { SmartadminValidationModule } from '../shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from '../shared/forms/input/smartadmin-input.module';

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
    declarations: [CategoryListComponent, CategoryEditComponent,],
    providers: [CategoryService]
})
export class CategoryModule {
}
