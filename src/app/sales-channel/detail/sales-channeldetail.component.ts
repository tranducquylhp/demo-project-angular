import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; 
import { SalesChannelDetail } from './sales-channeldetail'; 
import {SalesChannelService} from '../sales-channel.service'
import {Observable} from "rxjs/Observable";
import {SalesChannel} from "./sales-channel"
import {NavigationExtras, Router, Routes} from "@angular/router";
import {NotificationComponent} from "../../shared/utils/NotificationComponent";



@Component({
  selector: 'app-salesChannelDetail',
  templateUrl: './sales-channeldetail.component.html'
})
export class SalesChannelDetailComponent implements OnInit {
  
  public scDetail: SalesChannelDetail = {NewForm: false, SalesChannelInstance : {id: null, code: null, name: null, description: null}}
  
  constructor(private router: Router,route: ActivatedRoute, private scService: SalesChannelService, private notificationComponent: NotificationComponent) { 
    const id = route.snapshot.params.id;
    this.scDetail.NewForm = id == null || id == undefined;
    if(!this.scDetail.NewForm){
      this.scDetail.SalesChannelInstance.id = id;
    }
  }

  ngOnInit() {
    
    if(!this.scDetail.NewForm)
    {
      this.scService.getSalesChannel(this.scDetail.SalesChannelInstance.id).subscribe(details => this.scDetail.SalesChannelInstance = details);

    }
  }

  
  save(detail)
  {

      if(this.scDetail.NewForm)
      {
        this.scService.createSalesChannel(detail.SalesChannelInstance).subscribe(data => {

          this.notificationComponent.showNotification("Sale Channel","Created successfully");
          
          this.routeToSClist();
        } );
      }else
      {
        this.scService.updateSalesChannel(detail.SalesChannelInstance).subscribe(data => {

          this.notificationComponent.showNotification("Sale Channel","Updated successfully");
          
          this.routeToSClist();
          
          
        } );

      }
      
  }
  
  routeToSClist(){
    this.router.navigate(['/sales-channel']);
  }
  
}



