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
  selector: "app-bundle-detail",
  templateUrl: "./bundle-detail.component.html"
})
export class BundleDetailComponent implements OnInit {
  @Input() model: BundleModel;

  catalogs: Array<Catalog> = [];
  termValues;
  categoryLeaves: Array<Category> = [];
  salesChannelList: SalesChannel[];
  segmentList: Segment[];
  documentList: Document[];

  constructor(
    private bundleService: BundleService,
    private catalogService: CatalogService,
    private categoryService: CategoryService,
    private saleChannelService: SalesChannelService,
    private segmentService: SegmentService,
    private documentService: DocumentService
  ) {}

  ngOnInit() {
    //loading fields of offering for editing
    if (!this.model.isNewbundle) {
      this.bundleService.getOffering(this.model.id).subscribe(offering => {
        this.model = offering;

        if (this.model.term) {
          jQuery("#termSelect")
            .val(this.model.term)
            .trigger("change");
        }

        if (this.model.catalogId) {
          jQuery("#bundleCatalogSelect")
            .val(this.model.catalogId)
            .trigger("change");
        }

        if (this.model.categoryId) {
          jQuery("#bundleCategorySelect")
            .val(this.model.categoryId)
            .trigger("change");
        }

        if (this.model.segments && this.model.segments.length > 0) {
          jQuery("#bundleSegmentSelect")
            .val(this.model.segments)
            .trigger("change");
        }

        if (this.model.salesChannels && this.model.salesChannels.length > 0) {
          jQuery("#bundleSalesChannelSelect")
            .val(this.model.salesChannels)
            .trigger("change");
        }

        if (this.model.documents && this.model.documents.length > 0) {
          jQuery("#bundleDocumentSelect")
            .val(this.model.documents)
            .trigger("change");
        }
      });
    }

    this.loadCatalogs();
    this.loadCategories();
    this.loadSalesChannels();
    this.loadSegments();
    this.loadDocuments();
  }

  loadCatalogs() {
    this.catalogService.getCatalogs().subscribe(catalogs => {
      this.catalogs = catalogs;
    });
  }

  loadCategories() {
    this.categoryService.getLeavesFullPathNames().subscribe(categoryLeaves => {
      this.categoryLeaves = categoryLeaves;
    });
  }

  loadSalesChannels() {
    this.saleChannelService
      .getSalesChannels()
      .subscribe(data => (this.salesChannelList = data));
  }

  loadSegments() {
    this.segmentService
      .getSegments()
      .subscribe(data => (this.segmentList = data));
  }

  loadDocuments() {
    this.documentService
      .getDocuments()
      .subscribe(data => (this.documentList = data));
  }





  ngAfterViewInit() {
    var self = this;

    //Term Select
    jQuery('#termSelect').on('select2:select', function (e) {
        var data = e.params.data;
        self.model.term = jQuery("#termSelect").val();
    });
    //Term Select


    //Catalog Select
    jQuery('#bundleCatalogSelect').on('select2:select', function (e) {
        self.model.catalogId = jQuery("#bundleCatalogSelect").val();
    });
    //Catalog Select

    //Category Select
    jQuery('#bundleCategorySelect').on('select2:select', function (e) {

        self.model.categoryId = jQuery("#bundleCategorySelect").val();
    });
    //Catalog Select

    //Segment Select
    jQuery('#bundleSegmentSelect').on('select2:select', function (e) {
        var data = jQuery('#bundleSegmentSelect').select2('data');
        self.model.segments = [];
        for (let i = 0; i < data.length; i++) {
            self.model.segments.push(data[i].id);
        }
    });
    //Segment Select

    //Sales Channel Select
    jQuery('#bundleSalesChannelSelect').on('select2:select', function (e) {
        var data = jQuery('#bundleSalesChannelSelect').select2('data');
        self.model.salesChannels = [];
        for (let i = 0; i < data.length; i++) {
            self.model.salesChannels.push(data[i].id);
        }
    });
    //Sales Channel Select

    //Documents Seldect
    jQuery('#bundleDocumentSelect').on('select2:select', function (e) {
        var data = jQuery('#bundleDocumentSelect').select2('data');
        self.model.documents = [];
        for (let i = 0; i < data.length; i++) {
            self.model.documents.push(data[i].id);
        }
    });
    //Documents Select

    // //Wizard Events
    // jQuery('#offeringWizard').on('actionclicked.fu.wizard', function (event, data) {

    //     if (data.direction === 'next') {

    //         if (!self.validateStep(data.step)) {
    //             event.preventDefault();
    //         }
    //     }
    // });
    // //Wizard Events
}
}
