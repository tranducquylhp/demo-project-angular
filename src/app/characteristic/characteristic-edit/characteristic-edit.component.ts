import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CharacteristicEditModel} from '../model/characteristicEditModel';
import {CharacteristicService} from '../characteristic.service';
import {NotificationComponent} from "../../shared/utils/NotificationComponent";
import {NotificationService} from "../../shared/utils/notification.service";

@Component({
    selector: 'app-characteristic-edit',
    templateUrl: './characteristic-edit.component.html'
})
export class CharacteristicEditComponent implements OnInit {

    characteristicId: string;
    model: CharacteristicEditModel;
    showCharacteristicField: boolean;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private characteristicService: CharacteristicService,
                private notificationComponent: NotificationComponent,
                private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.characteristicId = this.route.snapshot.paramMap.get('characteristicId');

        this.characteristicService.getCharacteristicById(Number(this.characteristicId))
            .subscribe(res => {
                console.log(res);
                this.model = res;
                if (this.model.valueType == 1) {
                    this.showCharacteristicField = true;
                }
            });
    }

    onChange($event) {

        if ($event.target.value == 1) {
            this.showCharacteristicField = true;
        }
        else {
            this.showCharacteristicField = false;
        }
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
            this.characteristicService.updateCharacteristic(this.model).subscribe(data => {
                this.router.navigate(['/characteristic/characteristic-list']);
                this.notificationComponent.showNotification(
                    "Characteristic",
                    "Updated successfully"
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
