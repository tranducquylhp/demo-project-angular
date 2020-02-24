import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SalesChannel } from "../../sales-channel/detail/sales-channel";
import { BundleModel } from "../model/bundle-model";
import { CharacteristicService } from "../../characteristic/characteristic.service";
import { ProdSpecCharValueUseListModel } from "../../characteristic/model/prod-spec-char-value-use-list.model";
import { BundleService } from "../bundle.service";
import { PriceComponent } from "../../price/price.component";
@Component({
  selector: "app-bundle-edit",
  templateUrl: "./bundle-edit.component.html"
})
export class BundleEditComponent implements OnInit {
  model: BundleModel;
  charValueUseList: Array<ProdSpecCharValueUseListModel> = [];
  @ViewChild(PriceComponent) priceComponent: PriceComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bundleService: BundleService
  ) {
    this.model = new BundleModel();
    const idParam = route.snapshot.params.offeringId;
    if (idParam) {
      this.model.id = idParam;
      this.model.isNewbundle = false;
      bundleService.getOffering(idParam).subscribe(data => {
        this.model = data;
        console.log(this.model);
      });
    } else {
      this.model.isNewbundle = true;
    }
  }

  ngOnInit() {}

  ngAfterViewInit() {
    var self = this;

    //Wizard Events
    jQuery("#offeringWizard").on("actionclicked.fu.wizard", function(
      event,
      data
    ) {
      // if (data.direction === "next") {
      //   if (!self.validateStep(data.step)) {
      //     event.preventDefault();
      //   }
      // }
  
    });
    //Wizard Events
  }

  onWizardComplete(data) {
    //console.log("fuel-ux wizard complete", data);
    // this.model.salesChannels = this.selectedSalesChannels;
    // this.model.segments = this.selectedSegments;
    // this.model.documents = this.selectedDocuments;
    this.model.productOfferingTypeId = 2;
    // this.model.simpleProductOfferingIds = [];
    // this.model.simpleProductOfferingIds.push(336);
    // this.model.simpleProductOfferingIds.push(337);
    //console.log(this.model);
    console.log(this.priceComponent.priceList);
    this.model.priceRequestList = this.priceComponent.priceList;
    console.log(this.model.priceRequestList);
    if (this.model.isNewbundle) {
      this.bundleService.createOffering(this.model).subscribe(data => {
        this.router.navigate(["/bundle/bundle-list"]);
      });
    }
    // else {
    //     this.bundleService.updateOffering(this.model).subscribe(data => {
    //         this.router.navigate(['/bundle/bundle-list']);
    //     });
    //}
  }
}
