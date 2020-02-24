import { Component, OnInit } from '@angular/core';
import { CreateCategoryModel } from '../create-category-model';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NotificationComponent } from '../shared/utils/NotificationComponent';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {

    public categories: Array<Category> = [];

    options = {
        dom: "Bfrtip",
        ajax: (data, callback, settings) => {
            this.service.getAll()
                .catch(this.handleError)
                .subscribe((data) => {
                    this.categories = <Array<Category>>data;
                    callback({
                        aaData: data
                    })
                })
        },
        columns: [
            { "data": "id" },
            { "data": "parentName" },
            { "data": "code" },
            { "data": "name" },
            { "data": "description" },
            {
                render: (data, type, fullRow, meta) => {
                    return `
                    <div class='btn-group dropdown show pull-right'><button class='btn btn-info btn-sm dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                        <i class='fa fa-gear fa-lg'></i></button>
                        <ul class='dropdown-menu  ng-star-inserted'>                                
                            <li>
                                <a class='sa-datatables-edit' category-id='${fullRow.id}'>
                                    <i class="fa fa-fw fa-edit text-muted hidden-md hidden-sm hidden-xs" style="color:cornflowerblue"></i>
                                    Edit
                                </a>
                            </li>
                            <li>
                                <a class='sa-datatables-delete' category-id='${fullRow.id}'>
                                    <i class="fa fa-fw fa-ban text-muted hidden-md hidden-sm hidden-xs" style="color:red"></i>
                                    Delete
                                </a>
                            </li>
                        </ul>
                    </div>`;
                }
            }],
            order: [[ 1, "asc" ]]
    };

    ngAfterViewInit() {
        document.querySelector('body').addEventListener('click', (event) => {
            let target = <Element>event.target;

            if (target.tagName.toLowerCase() === 'a' && jQuery(target).hasClass('sa-datatables-edit')) {
                this.onEdit(target.getAttribute('category-id'));
            }
            if (target.tagName.toLowerCase() === 'a' && jQuery(target).hasClass('sa-datatables-delete')) {
                this.onDelete(target.getAttribute('category-id'));
            }
        });
    }

    onEdit(categoryId) {
        this.router.navigate(['/category/' + categoryId]);
    }

    onDelete(categoryId) {
        this.service.delete(categoryId).subscribe((data) => {
            this.notificationComponent.showNotification("Category","Deleted successfully");
            this.reloadPage();
        });
    }

    reloadPage() {
        this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
        let currentUrl = this.router.url + '?';
        this.router.navigateByUrl(currentUrl)
            .then(() => {
                this.router.navigated = false;
                this.router.navigate([this.router.url]);
            });
    }

    constructor(private router: Router, 
        private service: CategoryService,
        private notificationComponent: NotificationComponent) { }

    ngOnInit() {

    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}