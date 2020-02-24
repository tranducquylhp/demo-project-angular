export class PriceModel {
    public id: number;
    public priceType: string;
    public periodType: string;
    public isPercentage: boolean;
    public amount: number;
    public currency: string;
    public chargePeriodFrom: number;
    public chargePeriodTo: number;
}