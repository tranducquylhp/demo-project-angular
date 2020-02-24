import { NgModule } from "@angular/core";
import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SpecificationListComponent } from "./specification-list/specification-list.component";
import { SpecificationCreateComponent } from "./specification-create/specification-create.component";
import { SpecificationEditComponent } from "./specification-edit/specification-edit.component";

export const routes: Routes = [
  {
    path: "list",
    component: SpecificationListComponent,
    data: {
      pageTitle: "Specifications"
    }
  },

  {
    path: "create",
    component: SpecificationCreateComponent,
    data: {
      pageTitle: "Create Specification"
    }
  },

  {
    path: "edit/:id",
    component: SpecificationEditComponent,
    data: {
      pageTitle: "Edit Specification"
    }
  }
];

export const routing = RouterModule.forChild(routes);
