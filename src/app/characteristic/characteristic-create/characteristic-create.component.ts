import {Component, OnInit, Input} from '@angular/core';
import {CharacteristicCreateModel} from '../model/characateristicCreateModel';
import {CharacteristicService} from '../characteristic.service';
import {Router} from '@angular/router';
import {NotificationComponent} from "../../shared/utils/NotificationComponent";
import {NotificationService} from "../../shared/utils/notification.service";

@Component({
    selector: 'app-characteristic-create',
    templateUrl: './characteristic-create.component.html'
})

export class CharacteristicCreateComponent implements OnInit {

    model: CharacteristicCreateModel;
    showCharacteristicField: boolean;

    constructor(private router: Router,
                private characteristicService: CharacteristicService,
                private notificationComponent: NotificationComponent,
                private notificationService: NotificationService) {
        this.model = new CharacteristicCreateModel();
        this.model.valueType = 3;
        this.showCharacteristicField = false;
        this.model.isRequired = false;
        this.model.isConfigurable = false;
    }

    onChange($event) {

        if ($event.target.value == 1) {
            this.showCharacteristicField = true;
        }
        else {
            this.showCharacteristicField = false;
        }
    }


    ngOnInit() {
    }

    public onSubmit() {

        if (this.validateFields())
        {
            if(this.model.valueType == 1)
            {
                this.model.charValueString = jQuery('#charValueString').val();
            } else {
                this.model.charValueString = "";
            }
            /*        var d = new Date(Date.now());
                    this.model.validForStartDate = d.toString();
                    d.setMonth(d.getMonth()+1);
                    this.model.validForEndDate = d.toString();*/
            //this.model.validForStartDate = Date.now().toString();
            this.characteristicService.createCharacteristic(this.model).subscribe(data => {
                this.router.navigate(['/characteristic/characteristic-list']);
                this.notificationComponent.showNotification(
                    "Characteristic",
                    "Created successfully"
                );
            });
        }
        else {
            this.notificationService.bigBox({
                title: "Required Fields",
                content: "Please fill the required fields",
                color: "#C46A69",
                icon: "fa fa-warning shake animated",
                timeout: 3000
            });
        }


    }

    validateFields(): boolean {

        let isValid: boolean = false;
        isValid = !!( (this.model.name && this.model.description) && (this.model.name.trim() && this.model.description.trim()));
        return isValid;
    }
}
