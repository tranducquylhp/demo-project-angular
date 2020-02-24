import {Routes, RouterModule } from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {SalesChannelComponent} from "./sales-channel.component";
import {SalesChannelDetailComponent} from "./detail/sales-channeldetail.component";

export const salesChannelRoutes: Routes = [
    {
        path: '',
        component: SalesChannelComponent,
        data: {
            pageTitle: 'Sales Channel'
        }
    },
  { path: 'detail/:id', component: SalesChannelDetailComponent },
  { path: 'detail', component: SalesChannelDetailComponent }
];

export const salesChannelRouting: ModuleWithProviders = RouterModule.forChild(salesChannelRoutes);

 