
import { idNameModel } from "./idNameModel";
import { productSpecCharUseModel } from "./productSpecCharUseModel";

export class productSpecificationCreateModel {
 constructor(){
   this.selectedCharacteristics=new  Array<productSpecCharUseModel>();
 }
 
   name: string;
   code: string;
   description: string;
  // public status: number;
  // public statusList: Array<idNameModel>;
  // public productType: number;
  // public productTypeList: Array<idNameModel>;
  //public isReplicated: boolean;
  selectedCharacteristics: Array<productSpecCharUseModel>;
   
}
