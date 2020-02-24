import {SalesChannel} from '../../sales-channel/detail/sales-channel';
import {Segment} from '../../segment/detail/segment';
import {Document} from '../../document/detail/document';
import {OfferingCharValueModel} from "./offering-char-value-model";
import {PriceModel} from "../../price/model/priceModel";

export class OfferingEditModel {

    public id: number;
    public name: string;
    public validForStartDate: string;
    public validForEndDate: string;
    public warrantyPeriodValue: number;
    public warrantyPeriodUnit: number;
    public returnPeriodValue: number;
    public returnPeriodUnit: number;
    public description: string;
    public externalId: string;
    public productSpecificationId: number;
    public catalogId: number;
    public isSellable: boolean;
    public categoryId: number;
    public term: number;
    public salesChannels: Array<number>;
    public segments: Array<number>;
    public documents:Array<number>;
    public productOfferingCharValues: Array<OfferingCharValueModel>;
    public priceRequestList: Array<PriceModel>;
    public productOfferingTypeId: number;

    constructor() {
        this.productOfferingTypeId = 1;
        this.productOfferingCharValues = [];
        this.segments = [];
        this.salesChannels = [];
        this.documents = [];
        this.priceRequestList = [];
    }


}
