import { Component, OnInit } from "@angular/core";
import { productSpecificationCreateModel } from "../model/productSpecificationCreateModel";
import { idNameModel } from "../model/idNameModel";
import { productSpecCharUseModel } from "../model/productSpecCharUseModel";
import { productSpecCharModel } from "../model/productSpecCharModel";
import { productSpecCharValueModel } from "../model/productSpecCharValueModel";
import { specificationService } from "../specification.service";
import { Router, ActivatedRoute } from "@angular/router";
import { productSpecEditModel } from "../model/productSpecEditModel";
import { Http } from "@angular/http";
import { forkJoin } from "rxjs/observable/forkJoin";
import { environment } from "../../../environments/environment";
import { NotificationComponent } from "../../shared/utils/NotificationComponent";

@Component({
  selector: "app-specification-edit",
  templateUrl: "./specification-edit.component.html"
})
export class SpecificationEditComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: specificationService,
    private http: Http,
    private notificationComponent: NotificationComponent
  ) {}

  selectedChar: number = 0;
  id: string;
  productSpec: productSpecEditModel;
  characteristics: Array<productSpecCharModel>;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");

    this.getCharacteristics();

    let chars = this.http.get(
      environment.productCatalogRootUrl + "/productspec/getCharacteristics"
    );

    let prod = this.http.get(
      environment.productCatalogRootUrl +
        "/productspec/getSpecForEdit/" +
        this.id
    );

    forkJoin([chars, prod]).subscribe(results => {
      this.characteristics = <Array<productSpecCharModel>>results[0].json();
      this.productSpec = <productSpecEditModel>results[1].json();
     
      this.productSpec.selectedCharacteristics.forEach(selectedChar => {
        this.characteristics.find(
          x => x.id == selectedChar.id
        ).isSelected = true;

        selectedChar.selectedValueIds.forEach(selectedValueId => {
          this.characteristics
            .find(x => x.id == selectedChar.id)
            .values.find(x => x.id == selectedValueId).isSelected = true;
        });
      });
      
    });
  }

  getCharacteristics() {
    this.http
      .get(`http://localhost:8080/productspec/getCharacteristics`)
      .subscribe(data => {
        this.characteristics = <Array<productSpecCharModel>>data.json();
      });
  }

  

  filterNonSelectedChars(cars: Array<productSpecCharModel>) {
    return cars.filter(x => x.isSelected != true);
  }
  removeCharUse(i: number) {
    let characteristic = this.characteristics[i];
    characteristic.isSelected = false;
    this.productSpec.selectedCharacteristics = this.productSpec.selectedCharacteristics.filter(
      x => x.id != characteristic.id
    );
  }

  selectCharUse($event) {
    this.selectedChar = $event.target.value;

    if (this.selectedChar != 0) {
      let charUse = this.characteristics.find(
        x => x.id == this.selectedChar
      );
      charUse.isSelected = true;
      this.productSpec.selectedCharacteristics.push(
        new productSpecCharUseModel(charUse.id)
      );

      this.selectedChar = 0;
    }
  }

  
  check(
    characteristic: productSpecCharModel,
    value: productSpecCharValueModel,
    $event
  ) {
    if ($event.target.checked) {
      characteristic.values.find(x => x.id == value.id).isSelected = true;
      let charuse = this.productSpec.selectedCharacteristics.find(
        x => x.id == characteristic.id
      );
      charuse.selectedValueIds.push(value.id);
    } else {
      characteristic.values.find(x => x.id == value.id).isSelected = false;
      this.productSpec.selectedCharacteristics.find(
        x => x.id == characteristic.id
      ).selectedValueIds = this.productSpec.selectedCharacteristics
        .find(x => x.id == characteristic.id)
        .selectedValueIds.filter(x => x != value.id);
    }
  }

  saveForm(productSpec: productSpecEditModel) {

    this.service.updateSpec(this.productSpec).subscribe(data => {});
    this.notificationComponent.showNotification(
      "Specification",
      "Updated successfully"
    );

    this.router.navigate(["/specification/list"]);
  }
}
