import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; 
import { DocumentDetail } from './document-detail'; 
import {DocumentService} from '../document.service'
import {Observable} from "rxjs/Observable";
import {Document} from "./document"
import {NavigationExtras, Router, Routes} from "@angular/router";
import {NotificationComponent} from "../../shared/utils/NotificationComponent";



@Component({
  selector: 'app-documentDetail',
  templateUrl: './document-detail.component.html'
})
export class DocumentDetailComponent implements OnInit {
  
  public docDetail: DocumentDetail = {NewForm: false, DocumentInstance : {id: null, code: null, name: null, description: null}}
  
  constructor(private router: Router,route: ActivatedRoute, private docService: DocumentService, private notificationComponent: NotificationComponent) { 
    const id = route.snapshot.params.id;
    this.docDetail.NewForm = id == null || id == undefined;
    if(!this.docDetail.NewForm){
      this.docDetail.DocumentInstance.id = id;
    }
  }

  ngOnInit() {
    
    if(!this.docDetail.NewForm)
    {
      this.docService.getDocument(this.docDetail.DocumentInstance.id).subscribe(details => this.docDetail.DocumentInstance = details);

    }
  }

  
  save(detail)
  {

      if(this.docDetail.NewForm)
      {
        this.docService.createDocument(detail.DocumentInstance).subscribe(data => {

          this.notificationComponent.showNotification("Document","Created successfully");
          
          this.routeToSClist();
        } );
      }else
      {
        this.docService.updateDocument(detail.DocumentInstance).subscribe(data => {

          this.notificationComponent.showNotification("Document","Updated successfully");
          
          this.routeToSClist();
          
          
        } );

      }
      
  }
  
  routeToSClist(){
    this.router.navigate(['/document']);
  }
  
}



