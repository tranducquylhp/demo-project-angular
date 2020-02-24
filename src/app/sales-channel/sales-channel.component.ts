import { Component, OnInit } from '@angular/core';
import {SalesChannelService} from './sales-channel.service'
import {Observable} from "rxjs/Observable";
import {SalesChannel} from "./detail/sales-channel"
import {NavigationExtras, Router, Routes} from "@angular/router";
import {NotificationComponent} from "../shared/utils/NotificationComponent";

@Component({
  selector: 'app-salesChannel',
  templateUrl: './sales-channel.component.html',
  styleUrls: ['./sales-channel.component.css']
})
export class SalesChannelComponent implements OnInit {

  public scs:  Array<SalesChannel> = [];
  scso: Observable<SalesChannel[]>;
  public options = {
                ajax: (data, callback, settings) => {
                  this.scService.getSalesChannels()
                  .catch(this.handleError)
                  .subscribe((data) => {
                      callback({
                          aaData: data
                      })
                  })
                },
                "iDisplayLength": 15,
                "columns": [
                     { "data": "id" },
                      { "data": "code" },
                      { "data": "name" },
                      { "data": "description" },
                     { 
                       "orderable":false,
                       "render": (data, type, fullRow, meta) => {
                         return `
                            <div class='btn-group dropdown show pull-right'><button class='btn btn-info btn-sm dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                <i class='fa fa-gear fa-lg'></i></button>
                                <ul class='dropdown-menu  ng-star-inserted'>                                
                                    <li><a class='sa-datatables-edit' scl-id='${fullRow.id}'>
                                    <i class="fa fa-fw fa-edit text-muted hidden-md hidden-sm hidden-xs" style="color:cornflowerblue"></i>
                                      Edit</a></li>
                                    <li><a class='sa-datatables-delete' scl-id='${fullRow.id}'>
                                      <i class="fa fa-fw fa-ban text-muted hidden-md hidden-sm hidden-xs" style="color:red"></i>
                                    Delete</a></li>
                                </ul>
                            </div>`;
                }
                }],
                "order": [[0, 'desc']]
  }
  
  constructor(private router: Router,private scService: SalesChannelService,private notificationComponent: NotificationComponent) { }

  ngOnInit() {
    
  }
  
  ngAfterViewInit() {
        document.querySelector('body').addEventListener('click', (event) => {
            let target = <Element>event.target;

            if (target.tagName.toLowerCase() === 'a' && jQuery(target).hasClass('sa-datatables-edit')) {
                this.onEditSalesCh(target.getAttribute('scl-id'));
            }
            if (target.tagName.toLowerCase() === 'a' && jQuery(target).hasClass('sa-datatables-delete')) {
                this.onDeleteSalesCh(target.getAttribute('scl-id'));
            }
        });
    }
  
  onEditSalesCh(scid) {
        this.router.navigate(['/sales-channel/detail/' + scid]);
    }

    onDeleteSalesCh(scid) {
      this.notificationComponent.showMessage("Delete","Do you want to delete Sales Channel?",
        () => {
      
          this.scService.deleteSalesChannel(scid).subscribe((data) => {
          
            this.notificationComponent.showNotification("Sales Channel","Deleted successfully");
          
            this.reloadPage();
          });
        },null);
    }
  
  
  reloadPage() {
        this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};
        let currentUrl = this.router.url + '?';
        this.router.navigateByUrl(currentUrl)
            .then(() => {
                this.router.navigated = false;
                this.router.navigate([this.router.url]);
            });
    }

  public lastColumn(d) {

    return "";
  }
  
  private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}
  