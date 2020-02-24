import { productSpecCharValueModel } from "./productSpecCharValueModel";

export class productSpecCharModel {
  
   id:number
   name: string;
   valueType: number;
   isSelected:boolean;
   values: productSpecCharValueModel[];
}
