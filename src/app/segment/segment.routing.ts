import {Routes, RouterModule } from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {SegmentComponent} from "./segment.component";
import {SegmentDetailComponent} from "./detail/segmentdetail.component";

export const segmentRoutes: Routes = [
    {
        path: '',
        component: SegmentComponent,
        data: {
            pageTitle: 'Segment'
        }
    },
  { path: 'detail/:id', component: SegmentDetailComponent },
  { path: 'detail', component: SegmentDetailComponent }
];

export const segmentRouting: ModuleWithProviders = RouterModule.forChild(segmentRoutes);

 