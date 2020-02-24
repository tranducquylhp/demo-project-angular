import {ValidDateModel} from './validDateModel';

export class CharacteristicListModel{
    public id:number;
    public name:string;
    public description:string;
    public validFor: ValidDateModel;

    constructor (
        id: number,
        name: string,
        description: string,
        validFor: ValidDateModel
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.validFor = validFor;
    }
}


// export class characteristicListModel {
//     userId: number;
//     id: number;
//     title: string;
//     body: string;
// }