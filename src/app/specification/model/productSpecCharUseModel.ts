export class productSpecCharUseModel{
    constructor(id:number)
    {
        this.id=id;
        this.selectedValueIds=new Array<number>();
    }
    id:number;
    selectedValueIds:Array<number>;
}