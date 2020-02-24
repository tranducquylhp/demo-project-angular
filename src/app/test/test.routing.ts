import {Routes, RouterModule } from '@angular/router';
import {TestComponent} from "./test.component";
import {ModuleWithProviders} from "@angular/core";

export const testRoutes: Routes = [
    {
        path: '',
        component: TestComponent,
        data: {
            pageTitle: 'Test'
        }
    }
];

export const testRouting: ModuleWithProviders = RouterModule.forChild(testRoutes);

 