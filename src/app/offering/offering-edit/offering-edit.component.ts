import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Catalog} from "../../catalog/model/catalog.model";
import {ActivatedRoute, Router} from "@angular/router";
import {OfferingService} from "../offering.service";
import {CatalogService} from "../../catalog/catalog.service";
import {CharacteristicService} from "../../characteristic/characteristic.service";
import {specificationService} from "../../specification/specification.service";
import {ProdSpecCharValueUseListModel} from "../../characteristic/model/prod-spec-char-value-use-list.model";
import {CategoryService} from '../../category/category.service';
import {Category} from '../../category/category.model';
import {SalesChannel} from '../../sales-channel/detail/sales-channel';
import {SalesChannelService} from '../../sales-channel/sales-channel.service';
import {Segment} from '../../segment/detail/segment';
import {SegmentService} from '../../segment/segment.service';
import {Document} from '../../document/detail/document';
import {DocumentService} from '../../document/document.service';
import {OfferingEditModel} from "../model/offering-edit-model";
import {OfferingCharValueModel} from "../model/offering-char-value-model";
import {OfferingSegmentModel} from "../model/offering-segment-model";
import {PriceComponent} from "../../price/price.component";
import {NotificationComponent} from "../../shared/utils/NotificationComponent";

@Component({
    selector: 'app-offering-edit',
    templateUrl: './offering-edit.component.html',
    styleUrls: ['./offering-edit.component.css'],
})
export class OfferingEditComponent implements OnInit {

    model: OfferingEditModel;
    isNewOffering: boolean = true;
    specSelected: boolean = false;
    catalogSelected: boolean = false;
    termSelected: boolean = false;
    categorySelected: boolean = false;
    salesChannelSelected: boolean = false;
    segmentSelected: boolean = false;
    documentSelected: boolean = false;
    shouldValidateFields: boolean = false;
    spesifications: Array<specificationListModel> = [];
    catalogs: Array<Catalog> = [];
    charValueUseList: Array<ProdSpecCharValueUseListModel> = [];
    emptyCharValues: Array<number> = [];
    categoryLeaves: Array<Category> = [];
    salesChannelList: SalesChannel[];
    segmentList: Segment[];
    documentList: Document[];
    emptyCharValueTextList: Array<boolean> = [];
    termValues;

    @ViewChild(PriceComponent) priceComponent: PriceComponent;


    constructor(private router: Router,
                private route: ActivatedRoute,
                private offeringService: OfferingService,
                private catalogService: CatalogService,
                private charService: CharacteristicService,
                private specService: specificationService,
                private categoryService: CategoryService,
                private saleChannelService: SalesChannelService,
                private segmentService: SegmentService,
                private documentService: DocumentService,
                private notificationComponent: NotificationComponent) {
        this.model = new OfferingEditModel();
        const idParam = route.snapshot.params.offeringId;
        if (idParam) {
            this.model.id = idParam;
            this.isNewOffering = false;
        }
    }

    ngOnInit() {

        //loading fields of offering for editing
        if (!this.isNewOffering) {
            this.offeringService.getOffering(this.model.id).subscribe((offering) => {
                this.model = offering;

                if (this.model.productSpecificationId) {
                    jQuery("#specSelect").val(this.model.productSpecificationId).trigger('change');
                    this.setCharValues(this.model.productSpecificationId);
                }

                if (this.model.term) {
                    jQuery("#termSelect").val(this.model.term).trigger('change');
                }

                if (this.model.catalogId) {
                    jQuery("#catalogSelect").val(this.model.catalogId).trigger('change');
                }

                if (this.model.categoryId) {
                    jQuery("#categorySelect").val(this.model.categoryId).trigger('change');
                }

                if (this.model.segments && this.model.segments.length > 0) {
                    jQuery("#segmentSelect").val(this.model.segments).trigger('change');
                }

                if (this.model.salesChannels && this.model.salesChannels.length > 0) {
                    jQuery("#salesChannelSelect").val(this.model.salesChannels).trigger('change');
                }

                if (this.model.documents && this.model.documents.length > 0) {
                    jQuery("#documentSelect").val(this.model.documents).trigger('change');
                }

                if (this.model.priceRequestList && this.model.priceRequestList.length > 0) {
                    this.priceComponent.priceList = this.model.priceRequestList;
                }
            })
        } else {
            this.model.productOfferingCharValues = [];

        }

        this.loadSpecs();
        this.loadTerms();
        this.loadCatalogs();
        this.loadCategories();
        this.loadSalesChannels();
        this.loadSegments();
        this.loadDocuments();
    }

    ngAfterViewInit() {
        var self = this;

        //Term Select
        jQuery('#termSelect').on('select2:select', function (e) {
            self.termSelected = true;
            self.model.term = jQuery("#termSelect").val();
        });
        //Term Select

        //Spesification Select
        jQuery('#specSelect').on('select2:select', function (e) {
            var data = e.params.data;
            self.model.productSpecificationId = jQuery("#specSelect").val();
            self.loadCharValueUses(data.id);
            self.specSelected = true;
        });
        //Spesification Select

        //Catalog Select
        jQuery('#catalogSelect').on('select2:select', function (e) {
            self.model.catalogId = jQuery("#catalogSelect").val();
            self.catalogSelected = true;
        });
        //Catalog Select

        //Category Select
        jQuery('#categorySelect').on('select2:select', function (e) {
            self.model.categoryId = jQuery("#categorySelect").val();
            self.categorySelected = true;
        });
        //Catalog Select

        //Segment Select
        jQuery('#segmentSelect').on('select2:select', function (e) {
            var data = jQuery('#segmentSelect').select2('data');
            self.model.segments = [];
            for (let i = 0; i < data.length; i++) {
                self.model.segments.push(data[i].id);
            }
            self.segmentSelected = true;
        });

        jQuery('#segmentSelect').on('select2:unselecting', function (e) {
            self.model.segments = [];
            self.segmentSelected = true;
        });
        //Segment Select

        //Sales Channel Select
        jQuery('#salesChannelSelect').on('select2:select', function (e) {
            var data = jQuery('#salesChannelSelect').select2('data');
            self.model.salesChannels = [];
            for (let i = 0; i < data.length; i++) {
                self.model.salesChannels.push(data[i].id);
            }
            self.salesChannelSelected = true;
        });

        jQuery('#salesChannelSelect').on('select2:unselecting', function (e) {
            self.model.salesChannels = [];
            self.salesChannelSelected = true;
        });

        //Sales Channel Select

        //Documents Select
        jQuery('#documentSelect').on('select2:select', function (e) {
            var data = jQuery('#documentSelect').select2('data');
            self.model.documents = [];
            for (let i = 0; i < data.length; i++) {
                self.model.documents.push(data[i].id);
            }
            self.documentSelected = true;
        });

        jQuery('#documentSelect').on('select2:unselecting', function (e) {
            self.model.documents = [];
            self.documentSelected = true;
        });

        //Documents Select

        //Wizard Events
        jQuery('#offeringWizard').on('actionclicked.fu.wizard', function (event, data) {

            if (data.direction === 'next') {

                if (!self.validateStep(data.step)) {
                    event.preventDefault();
                    self.shouldValidateFields = true
                } else {
                    self.shouldValidateFields = false;
                }
            }
        });
        //Wizard Events
    }


    validateStep(step): boolean {

        let isValid = false;
        switch (step) {
            case 1:
                isValid = !!(this.model.name && this.model.description && (this.model.term && this.model.term != 0));
                break;
            case 2:
                isValid = !!(this.model.productSpecificationId && this.validateRequiredCharValues());
                break;
            case 3:
                isValid = true;
                break
            case 4:
                isValid = !!(this.model.catalogId && this.model.catalogId != 0 && this.model.categoryId && this.model.categoryId != 0 && this.model.segments.length > 0 && this.model.salesChannels.length > 0);
                break;
            case 5:
                isValid = !!(this.model.documents.length > 0);
                break;
            case 6:
            case 7:
                isValid = true;
                break;

        }
        return isValid;
    }


    loadSpecs() {
        this.specService.getSpecifications().subscribe((specs) => {
            this.spesifications = specs;
        });
    }

    loadCatalogs() {
        this.catalogService.getCatalogs().subscribe((catalogs) => {
            this.catalogs = catalogs;
        });
    }

    loadCharValueUses(specId) {
        this.charService.getSpecCharValueUses(specId).subscribe((charValuUseList) => {
            this.charValueUseList = charValuUseList;
            this.bindCharValueEvents();
        })
    }

    loadCategories() {
        this.categoryService.getLeavesFullPathNames().subscribe((categoryLeaves) => {
            this.categoryLeaves = categoryLeaves;
        });
    }

    loadSalesChannels() {
        this.saleChannelService.getSalesChannels().subscribe(data => this.salesChannelList = data);
    }

    loadSegments() {
        this.segmentService.getSegments().subscribe(data => this.segmentList = data);
    }

    loadDocuments() {
        this.documentService.getDocuments().subscribe(data => this.documentList = data);
    }

    loadTerms() {
        this.termValues =
            [
                {"value": 6, "id": 1},
                {"value": 12, "id": 2},
                {"value": 18, "id": 3},
                {"value": 24, "id": 4},
                {"value": 30, "id": 5},
                {"value": 36, "id": 6}
            ];

        if (!this.model.term) {
            jQuery("#termSelect").val(0).trigger('change');
        }
    }

    setCharValues(specId) {

        this.charService.getSpecCharValueUses(specId).subscribe((data) => {

            let specCharValueUseList: Array<ProdSpecCharValueUseListModel> = data;

            for (let i = 0; i < specCharValueUseList.length; i++) {
                if (specCharValueUseList[i].prodSpecCharType == 1) {
                    let offeringCharValues = this.model.productOfferingCharValues;
                    for (let j = 0; j < specCharValueUseList[i].prodSpecCharValueList.length; j++) {

                        for (let k = 0; k < offeringCharValues.length; k++) {

                            if (offeringCharValues[k].charValueUseId == specCharValueUseList[i].prodSpecCharValueList[j].prodSpecCharValueUseId) {
                                specCharValueUseList[i].prodSpecCharValueList[j].isSelected = true;
                            }
                        }
                    }
                }
                else {
                    let offeringCharValues = this.model.productOfferingCharValues;
                    for (let k = 0; k < offeringCharValues.length; k++) {
                        if (offeringCharValues[k].charId == specCharValueUseList[i].prodSpecCharId) {
                            specCharValueUseList[i].prodSpecCharValue = offeringCharValues[k].charValue;
                        }
                    }
                }
            }

            this.charValueUseList = specCharValueUseList;
            this.bindCharValueEvents();
        })
    }

    bindCharValueEvents(){

        setTimeout(() => {
                var self = this;
                for (let i = 0; i < this.charValueUseList.length; i++) {
                    if (this.charValueUseList[i].prodSpecCharType == 1) {
                        let selector = "#charValueUseSelect" + i;
                        jQuery(selector).on('select2:select', function (e) {
                            self.getCharValues();
                        });
                    }
                }
            },
            750);
    }

    validateRequiredCharValues(): boolean {

        let hasEmptyRequiredCharValue = false;
        this.getCharValues();

        for (let i = 0; i < this.charValueUseList.length; i++) {
            if (this.charValueUseList[i].required) {
                if (this.charValueUseList[i].prodSpecCharType == 1) {
                    let selector = "#charValueUseSelect" + i;
                    var data = jQuery(selector).select2('data');
                    if (data[0].id == 0) {
                        console.log("empty char value use");
                        hasEmptyRequiredCharValue = true;
                    }
                } else {
                    let selector = "#charValueUseInput" + i;
                    let charTextValue = jQuery(selector).val();
                    if (!charTextValue) {
                        console.log("empty text");
                        hasEmptyRequiredCharValue = true;
                    }
                }
            }
        }

        return !hasEmptyRequiredCharValue;
    }

    getCharValues() {

        this.emptyCharValueTextList = [];
        this.model.productOfferingCharValues = [];
        for (let i = 0; i < this.charValueUseList.length; i++) {

            let offeringCharValue = new OfferingCharValueModel();
            offeringCharValue.charId = this.charValueUseList[i].prodSpecCharId;
            offeringCharValue.charValueType = this.charValueUseList[i].prodSpecCharType;

            if (this.charValueUseList[i].prodSpecCharType == 1) {
                let selector = "#charValueUseSelect" + i;
                var data = jQuery(selector).select2('data');
                offeringCharValue.charValue = data[0].text;
                offeringCharValue.charValueUseId = data[0].id;
                this.emptyCharValueTextList.push(data[0].id == 0 && this.charValueUseList[i].required === true)
            }
            else {
                let selector = "#charValueUseInput" + i;
                offeringCharValue.charValue = jQuery(selector).val();
                this.emptyCharValueTextList.push(!offeringCharValue.charValue && this.charValueUseList[i].required === true);
            }

            this.model.productOfferingCharValues.push(offeringCharValue);
        }
    }

    onWizardComplete(data) {

        this.getCharValues();
        this.model.priceRequestList = this.priceComponent.priceList;

        if (this.isNewOffering) {
            this.offeringService.createOffering(this.model).subscribe(data => {
                this.router.navigate(['/offering/offering-list']);
                this.notificationComponent.showNotification(
                    "Offering",
                    "Created successfully"
                );
            });
        } else {
            this.offeringService.updateOffering(this.model).subscribe(data => {
                this.router.navigate(['/offering/offering-list']);
                this.notificationComponent.showNotification(
                    "Offering",
                    "Updated successfully"
                );
            });
        }
    }
}

