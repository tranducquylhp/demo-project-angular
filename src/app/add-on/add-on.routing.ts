import {Routes, RouterModule } from '@angular/router';
import {AddOnComponent} from "./add-on.component";
import {ModuleWithProviders} from "@angular/core";

export const addOnRoutes: Routes = [
    {
        path: '',
        component: AddOnComponent,
        data: {
            pageTitle: 'Add-On'
        }
    }
];

export const addOnRouting: ModuleWithProviders = RouterModule.forChild(addOnRoutes);

 