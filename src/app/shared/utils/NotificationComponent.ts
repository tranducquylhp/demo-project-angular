import {NotificationService} from "./notification.service";
import {Injectable} from '@angular/core';


@Injectable()
export class NotificationComponent {
  constructor(private notificationService: NotificationService) {
}
  
  showNotification(title: string,content: string, icon = "fa fa-bell" )
  {
    this.notificationService.smallBox({
      title: title,
      content: content,
      color: "#5384AF",
      timeout: 5000,
      icon: icon
    }); 
  }
  
  
  showMessage(title: string,content: string, yesCallback: () => any, noCallback: () => any) {
    this.notificationService.smartMessageBox({
      title: title,
      content: content,
      buttons: "[No][Yes]"
    }, (ButtonPressed) => {
      if (ButtonPressed === "Yes") {
        if(yesCallback != null && yesCallback !== undefined){
          yesCallback();
        }
      }
      if (ButtonPressed === "No") {
       if(noCallback != null && noCallback !== undefined){
          noCallback();
        }
      }

    });
  }
  
}
