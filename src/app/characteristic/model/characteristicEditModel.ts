import {ValidDateModel} from './validDateModel';

export class CharacteristicEditModel {
    public id: number;
    public name: string;
    public description: string;
    public valueType: number;
    public validFor: ValidDateModel;
    public charValueString: string;
    public isRequired: boolean;
    public isConfigurable: boolean;
}