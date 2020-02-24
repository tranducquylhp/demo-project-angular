import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {CatalogService} from "../catalog.service";
import {NavigationExtras, Router, Routes} from "@angular/router";
import {Catalog} from "../model/catalog.model";
import {DatatableComponent} from "../../shared/ui/datatable/datatable.component";

@Component({
    selector: 'app-catalog-list',
    templateUrl: './catalog-list.component.html'
})
export class CatalogListComponent implements OnInit {
    reRenderTable: boolean;
    @ViewChild(DatatableComponent) catalogTable: DatatableComponent;
    catalogs: Array<Catalog> = [];
    selectedCatalog: Catalog;

    options = {
        dom: "Bfrtip",
        ajax: (data, callback, settings) => {
            this.catalogService.getCatalogs()
                .map((data: any) => (data.data || data))
                .catch(this.handleError)
                .subscribe((data) => {
                    this.catalogs = data;
                    callback({
                        aaData: data
                    })
                })
        },
        columns: [
            {"data": "id"},
            {"data": "name"},
            {"data": "description"},
            {
                "data": "validFor.validForStartDate",
                "render": function (data, type, full, meta) {
                    return data == null ? "" : data;
                }
            },
            {
                "data": "validFor.validForEndDate",
                "render": function (data, type, full, meta) {
                    return data == null ? "" : data;
                }
            },
            {
                render: (data, type, fullRow, meta) => {
                    return `
                        <div class='btn-group dropdown show pull-right'><button class='btn btn-info btn-sm dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                            <i class='fa fa-gear fa-lg'></i></button>
                            <ul class='dropdown-menu  ng-star-inserted'>                                
                                <li>
                                
                                    <a class='sa-datatables-edit-catalog' catalog-id='${fullRow.id}'>
                                        <i class="fa fa-fw fa-edit text-muted hidden-md hidden-sm hidden-xs" style="color:cornflowerblue"></i>
                                            Edit
                                    </a>
                                    
                                </li>
                                <li>
                                    <a class='sa-datatables-delete-catalog' catalog-id='${fullRow.id}'>
                                        <i class="fa fa-fw fa-ban text-muted hidden-md hidden-sm hidden-xs" style="color:red"></i>
                                            Delete
                                    </a>
                                </li>
                            </ul>
                        </div>`;
                }
            }],
        order: [[0, "desc"]]

    };

    ngAfterViewInit() {
        document.querySelector('body').addEventListener('click', (event) => {
            let target = <Element>event.target;

            if (target.tagName.toLowerCase() === 'a' && jQuery(target).hasClass('sa-datatables-edit-catalog')) {
                this.onEditCatalog(target.getAttribute('catalog-id'));
            }
            if (target.tagName.toLowerCase() === 'a' && jQuery(target).hasClass('sa-datatables-delete-catalog')) {
                this.onDeleteCatalog(target.getAttribute('catalog-id'));
            }
        });
    }

    constructor(private router: Router, private catalogService: CatalogService, private cdRef: ChangeDetectorRef) {
    }

    onEditCatalog(catalogId) {
        console.log("edit catalog:", catalogId);
        this.router.navigate(['/catalog/catalog-edit/' + catalogId]);
        //this.catalogService.updateCatalog(catalogId).subscribe((data) => {
        //    this.reloadCatalogListTable();
        //});
    }

    onDeleteCatalog(catalogId) {
        console.log("The catalog with id: ", catalogId, " will be deleted. Do you confirm?");
        this.catalogService.deleteCatalog(catalogId).subscribe((data) => {
            this.reloadCatalogListTable();
        });
    }

    reloadCatalogListTable() {
        this.reRenderTable = true;
        if (!this.cdRef['destroyed']) {
            this.cdRef.detectChanges();
        }
        this.reRenderTable = false;
    }

    ngOnInit() {

    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
