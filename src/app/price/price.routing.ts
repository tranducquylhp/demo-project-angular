import {Routes, RouterModule } from '@angular/router';
import { PriceComponent } from "./price.component";
import {ModuleWithProviders} from "@angular/core";

export const testRoutes: Routes = [
    {
        path: '',
        component: PriceComponent,
        data: {
            pageTitle: 'Price'
        }
    }
];

export const PriceRouting: ModuleWithProviders = RouterModule.forChild(testRoutes);

