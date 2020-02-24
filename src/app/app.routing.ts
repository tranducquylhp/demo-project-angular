/**
 * Created by griga on 7/11/16.
 */
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from "./shared/layout/app-layouts/main-layout.component";
import { AuthLayoutComponent } from "./shared/layout/app-layouts/auth-layout.component";
import { ModuleWithProviders } from "@angular/core";
import { AuthGuard } from './+auth/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '', redirectTo: 'home', pathMatch: 'full'
            },
            {
                path: 'home',
                loadChildren: 'app/home/home.module#HomeModule',
            },
            {
                path: 'characteristic',
                loadChildren: 'app/characteristic/characteristic.module#CharacteristicModule'
            },
            {
                path: 'catalog',
                loadChildren: 'app/catalog/catalog.module#CatalogModule'
            },
            {
                path: 'offering',
                loadChildren: 'app/offering/offering.module#OfferingModule'
            },
            {
                path: 'sales-channel',
                loadChildren: 'app/sales-channel/sales-channel.module#SalesChannelModule'
            },
            {
                path: 'segment',
                loadChildren: 'app/segment/segment.module#SegmentModule'
            },
            {
                path: 'parameter',
                loadChildren: 'app/parameter/parameter.module#ParameterModule'
            },
            {
                path: 'document',
                loadChildren: 'app/document/document.module#DocumentModule'
            },
            {
                path: 'specification',
                loadChildren: 'app/specification/specification.module#SpecificationModule'
            },
            {
                path: 'bundle',
                loadChildren: 'app/bundle/bundle.module#BundleModule'
            },
            {
                path: 'add-on',
                loadChildren: 'app/add-on/add-on.module#AddOnModule'
            },
/*            {
                path: 'test',
                loadChildren: 'app/test/test.module#TestModule'
            },*/
            {
                path: 'category',
                loadChildren: 'app/category/category.module#CategoryModule'
            },
            {
                path: 'price',
                loadChildren: 'app/price/price.module#PriceModule'
            },
            {
                path: 'student',
                loadChildren: 'app/students/students.module#StudentsModule'
            }
        ]
    },
    { path: 'auth', component: AuthLayoutComponent, loadChildren: 'app/+auth/auth.module#AuthModule' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
