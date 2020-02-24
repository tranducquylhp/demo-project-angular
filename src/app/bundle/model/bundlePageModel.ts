import { NgForm } from "@angular/forms";

export class BundlePageModel {
   public  isNewBundle:boolean;
    public validateStep:boolean[];

    constructor(){
        this.validateStep=[];       
        for (var i=0;i<7;i++ ){
        this.validateStep.push(false);}
    }
}
