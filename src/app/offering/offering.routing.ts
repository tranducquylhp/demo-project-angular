import {Routes, RouterModule} from '@angular/router';
import {OfferingComponent} from "./offering.component";
import {ModuleWithProviders} from "@angular/core";
import {OfferingListComponent} from "./offering-list/offering-list.component";
import {OfferingEditComponent} from "./offering-edit/offering-edit.component";

export const offeringRoutes: Routes = [
    {
        path: 'offering-list',
        component: OfferingListComponent, data: {
            pageTitle: 'Offerings'
        }
    },
    {
        path: 'offering-edit',
        component: OfferingEditComponent, data: {
            pageTitle: 'Create an offering'
        }
    },
    {
        path: 'offering-edit/:offeringId',
        component: OfferingEditComponent, data: {
            pageTitle: 'Edit the offering'
        }
    }

];

export const offeringRouting: ModuleWithProviders = RouterModule.forChild(offeringRoutes);

