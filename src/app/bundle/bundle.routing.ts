import {Routes, RouterModule} from '@angular/router';
import {OfferingComponent} from "./offering.component";
import {ModuleWithProviders} from "@angular/core";
import {BundleListComponent} from "./bundle-list/bundle-list.component";
import {BundleEditComponent} from "./bundle-edit/bundle-edit.component";

export const bundleOfferingRoutes: Routes = [
    {
        path: 'bundle-list',
        component: BundleListComponent, data: {
            pageTitle: 'Bundle Offerings'
        }
    },
    {
        path: 'bundle-edit',
        component: BundleEditComponent, data: {
            pageTitle: 'Create bundle offering'
        }
    },
    {
        path: 'bundle-edit/:offeringId',
        component: BundleEditComponent, data: {
            pageTitle: 'Edit the offering'
        }
    }

];

export const bundleRouting: ModuleWithProviders = RouterModule.forChild(bundleOfferingRoutes);

