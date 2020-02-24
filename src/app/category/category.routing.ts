import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list.component';
import { CategoryEditComponent } from './category-edit.component';

export const routes: Routes = [
    {
        path: '',
        component: CategoryListComponent, data: {
            pageTitle: 'Categories'
        }
    },
    {
        path: 'new',
        component: CategoryEditComponent,
        data: {
            pageTitle: 'Create Category'
        }
    },
    {
        path: ':id',
        component: CategoryEditComponent, data: {
            pageTitle: 'Edit the category'
        }
    }
];


export const routing = RouterModule.forChild(routes)
