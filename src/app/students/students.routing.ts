
import { RouterModule, Routes } from "@angular/router";
import {StudentsListComponent} from "./students-list/students-list.component";
import {StudentsCreateComponent} from "./students-create/students-create.component";
import {StudentsEditComponent} from "./students-edit/students-edit.component";

export const routes: Routes = [
  {
    path: 'list',
    component: StudentsListComponent,
    data: {
      pageTitle: "Students"
    }
  },

  {
    path: 'create',
    component: StudentsCreateComponent,
    data: {
      pageTitle: "Create Student"
    }
  },

  {
    path: "edit/:id",
    component: StudentsEditComponent,
    data: {
      pageTitle: "Edit Student"
    }
  }
];

export const routing = RouterModule.forChild(routes);
