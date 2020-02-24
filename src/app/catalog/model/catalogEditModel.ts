import {ValidDateModel} from './validDateModel';

export class CatalogEditModel {
    public id: number;
    public name: string;
    public description: string;
    public validFor: ValidDateModel;
    //public validForStartDate: string;
    //public validForEndDate: string;
}