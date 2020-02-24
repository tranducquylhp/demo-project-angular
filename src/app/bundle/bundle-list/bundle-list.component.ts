import {ChangeDetectorRef, Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import {DatatableComponent} from "../../shared/ui/datatable/datatable.component";
import {BundleService} from "../bundle.service";
import { NotificationComponent } from '../../shared/utils/NotificationComponent';
import { NotificationService } from '../../shared/utils/notification.service';

@Component({
    selector: 'app-bundle-list',
    templateUrl: './bundle-list.component.html',
    styleUrls: ['./bundle-list.component.css']
})
export class BundleListComponent implements OnInit, OnDestroy {

    reRenderTable = false;

    options = {
        dom: "Bfrtip",
        ajax: (data, callback, settings) => {
            this.bundleService.getOfferings()
                .catch(this.handleError)
                .subscribe((data) => {
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
                "data": "isSellable",
                "render": function (data, type, full, meta) {
                    return data == true ? "<span class=\"fa fa-fw fa-check\"></span>" : "<span class=\"fa fa-fw fa-times-circle\"></span>";
                }
            },           
            {"data": "catalogCode"},
            {"data": "categoryCode"},
            {"data": "productOfferingType"},
            {
                "data": "validForStartDate",
                "render": function (data, type, full, meta) {
                    return data == null ? "" : data;
                }
            },
            {
                "data": "validForEndDate",
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
                                
                                    <a class="sa-datatables-edit-bundleoffering"  offering-id='${fullRow.id}'>
                                        <i class="fa fa-fw fa-edit text-muted hidden-md hidden-sm hidden-xs" style="color:cornflowerblue"></i>
                                            Edit
                                    </a>
                                    
                                </li>
                                <li>
                                    <a class="sa-datatables-delete-bundleoffering"  offering-id='${fullRow.id}'>
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

    constructor(private router: Router,
                private bundleService: BundleService,
                private cdRef: ChangeDetectorRef,
                private notificationComponent: NotificationComponent,
                private notificationService: NotificationService) {
    }

    ngAfterViewInit() {
        document.querySelector('body').addEventListener('click', (event) => {
            let target = <Element>event.target;

            if (target.tagName.toLowerCase() === 'a' && jQuery(target).hasClass('sa-datatables-edit-bundleoffering')) {
                this.onEditOffering(target.getAttribute('offering-id'));
            }
            if (target.tagName.toLowerCase() === 'a' && jQuery(target).hasClass('sa-datatables-delete-bundleoffering')) {
                this.onDeleteOffering(target.getAttribute('offering-id'));
            }
        });
    }

    onEditOffering(offeringId) {
       
        this.router.navigate(['/bundle/bundle-edit/' + offeringId]);
    }

    onDeleteOffering(offeringId) {
       
        this.notificationService.smartMessageBox({
            title: "Warning!",
            content: "Are you sure to delete this bundle?",
            buttons: '[No][Yes]'
        }, (ButtonPressed) => {
            if (ButtonPressed === "Yes") {
                this.bundleService.deleteOffering(offeringId).subscribe(data => {
                    this.reloadOfferingListTable();
                    this.notificationComponent.showNotification(
                        "Bundle",
                        "Deleted successfully"
                    );
                });
            }
        });
    }


    
    

       

    reloadOfferingListTable() {
        this.reRenderTable = true;
        if (!this.cdRef['destroyed']) {
            this.cdRef.detectChanges();
        }
        this.reRenderTable = false;
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.cdRef.detach();
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
