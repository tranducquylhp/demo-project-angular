import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { documentRouting } from './document.routing';
import { DocumentComponent } from "./document.component";
import { DocumentDetailComponent } from "./detail/document-detail.component";
import { DocumentService } from "./document.service";
import { NotificationComponent } from "../shared/utils/NotificationComponent";

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
    documentRouting,
    SmartadminModule,
    FormsModule
  ],
  declarations: [DocumentComponent, DocumentDetailComponent],
  providers: [DocumentService, NotificationComponent]
})
export class DocumentModule { }  
