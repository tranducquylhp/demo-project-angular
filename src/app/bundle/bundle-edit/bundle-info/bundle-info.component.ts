import { Component, OnInit, Input } from "@angular/core";
import { BundleModel } from "../../model/bundle-model";
import { BundleService } from "../../bundle.service";
import { SegmentService } from "../../../segment/segment.service";
import { DocumentService } from "../../../document/document.service";
import { SalesChannelService } from "../../../sales-channel/sales-channel.service";
import { CategoryService } from "../../../category/category.service";
import { CatalogService } from "../../../catalog/catalog.service";
import { Catalog } from "../../../catalog/model/catalog.model";
import { Category } from "../../../category/category.model";
import { SalesChannel } from "../../../sales-channel/detail/sales-channel";
import { Segment } from "../../../segment/detail/segment";
import { Document } from "../../../document/detail/document";

@Component({
  selector: "app-bundle-info",
  templateUrl: "./bundle-info.component.html"
})
export class BundleInfoComponent implements OnInit {
 
  @Input() model: BundleModel;


  termValues;

  constructor(
    private bundleService: BundleService
  ) {}

  ngOnInit() {
   this.loadTerms();
  }

  loadTerms() {
    this.termValues = [
      { value: "Please Select", id: 0 },
      { value: 6, id: 1 },
      { value: 12, id: 2 },
      { value: 18, id: 3 },
      { value: 24, id: 4 },
      { value: 30, id: 5 },
      { value: 36, id: 6 }
    ];
  }
}
