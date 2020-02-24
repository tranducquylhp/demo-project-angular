import {Routes, RouterModule } from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {DocumentComponent} from "./document.component";
import {DocumentDetailComponent} from "./detail/document-detail.component";

export const documentRoutes: Routes = [
    {
        path: '',
        component: DocumentComponent,
        data: {
            pageTitle: 'Document'
        }
    },
  { path: 'detail/:id', component: DocumentDetailComponent },
  { path: 'detail', component: DocumentDetailComponent }
];

export const documentRouting: ModuleWithProviders = RouterModule.forChild(documentRoutes);

 