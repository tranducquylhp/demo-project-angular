import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from './category.model';
import { OfferingSpecModel } from '../offering/model/offering-spec-model';
import { NotificationComponent } from '../shared/utils/NotificationComponent';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html'
})
export class CategoryEditComponent implements OnInit {
  model: Category;
  id: string;
  gunStart: number;
  gunEnd: number;
  parents: Array<Category>;
  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private service: CategoryService,
    private notificationComponent: NotificationComponent) {
    this.model = new Category();
  }

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      this.service.get(this.route.snapshot.params.id)
        .subscribe(data => this.model = data);
      if (this.route.snapshot.params.id == 0) {
        this.model.parentId = 0;
      }
    }
    else {
      this.model.parentId = 0;
    }
    this.service.getAll().subscribe(data => {
      this.parents = <Array<Category>>data;
      var root = new Category();
      root.id = 0;
      root.name = "--Root--";
      this.parents.unshift(root);
    });
  }

  //onChange($event) { }
  onSubmit() {
    this.model.parentId = jQuery("#parentId").val();
    if (this.route.snapshot.params.id == null) {
      this.service.create(this.model).subscribe(data => {
        this.notificationComponent.showNotification("Category","Created successfully");
        this.router.navigate(['/category']);
      });
    } else {
      this.service.update(this.route.snapshot.params.id, this.model).subscribe(data => {
        this.notificationComponent.showNotification("Category","Updated successfully");
        this.router.navigate(['/category']);
      });
    }
  }

}

