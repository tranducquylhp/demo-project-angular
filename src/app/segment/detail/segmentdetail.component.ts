import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; 
import { SegmentDetail } from './segmentdetail'; 
import {SegmentService} from '../segment.service'
import {Observable} from "rxjs/Observable";
import {Segment} from "./segment"
import {NavigationExtras, Router, Routes} from "@angular/router";
import {NotificationComponent} from "../../shared/utils/NotificationComponent";



@Component({
  selector: 'app-segmentdetail',
  templateUrl: './segmentdetail.component.html'
})
export class SegmentDetailComponent implements OnInit {
  
  public scDetail: SegmentDetail = {NewForm: false, SegmentInstance : {id: null, code: null, name: null, description: null}}
  
  constructor(private router: Router,route: ActivatedRoute, private scService: SegmentService, private notificationComponent: NotificationComponent) { 
    const id = route.snapshot.params.id;
    this.scDetail.NewForm = id == null || id === undefined;
    if(!this.scDetail.NewForm){
      this.scDetail.SegmentInstance.id = id;
    }
  }

  ngOnInit() {
    
    if(!this.scDetail.NewForm)
    {
      this.scService.getSegment(this.scDetail.SegmentInstance.id).subscribe(details => this.scDetail.SegmentInstance = details);

    }
  }

  
  save(detail)
  {

      if(this.scDetail.NewForm)
      {
        this.scService.createSegment(detail.SegmentInstance).subscribe(data => {

          this.notificationComponent.showNotification("Segment","Created successfully");
          
          this.routeToSClist();
        } );
      }else
      {
        this.scService.updateSegment(detail.SegmentInstance).subscribe(data => {

          this.notificationComponent.showNotification("Segment","Updated successfully");
          
          this.routeToSClist();
          
          
        } );

      }
      
  }
  
  routeToSClist(){
    this.router.navigate(['/segment']);
  }
  
}



