import {ValidDateModel} from './validDateModel';

export class Catalog {
    public id: string;
    public name: string;
    public description: string;
    public deleted: boolean;
    public validFor: ValidDateModel;

    constructor(id: string,
                name: string,
                description: string,
                deleted: boolean,
                validFor: ValidDateModel) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.deleted = deleted;
        this.validFor = validFor;
    }
}
