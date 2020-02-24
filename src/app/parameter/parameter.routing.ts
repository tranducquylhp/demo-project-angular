import {Routes, RouterModule } from '@angular/router';
import {ParameterComponent} from "./parameter.component";
import {ModuleWithProviders} from "@angular/core";

export const parameterRoutes: Routes = [
    {
        path: '',
        component: ParameterComponent,
        data: {
            pageTitle: 'Parameter'
        }
    }
];

export const parameterRouting: ModuleWithProviders = RouterModule.forChild(parameterRoutes);

 