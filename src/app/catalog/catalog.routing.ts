import {Routes, RouterModule} from '@angular/router';
import {CatalogComponent} from "./catalog.component";
import { CatalogListComponent } from './catalog-list/catalog-list.component';
import { CatalogCreateComponent } from './catalog-create/catalog-create.component';
import { CatalogEditComponent} from "./catalog-edit/catalog-edit.component";

export const routes: Routes = [

    {
        path: 'catalog-list',
        component: CatalogListComponent, data: {
            pageTitle: 'Catalogs'
        }
    },

    {
        path: 'catalog-create',
        component: CatalogCreateComponent,
        data: {
            pageTitle: 'Create Catalog'
        }
    },
    {
        path: 'catalog-edit/:catalogId',
        component: CatalogEditComponent, data: {
            pageTitle: 'Edit the catalog'
        }
    }

];


export const routing = RouterModule.forChild(routes)
