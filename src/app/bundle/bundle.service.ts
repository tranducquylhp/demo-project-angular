import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClientProvider} from "../shared/httpclientprovider/http-client-provider";
import {BundleEditModel} from "./model/bundle-edit-model";
import {OfferingListModel} from "./model/bundle-list-model";
import { BundleModel } from './model/bundle-model';
import { IdNameDescriptionModel } from './model/idNameDescriptionModel';


@Injectable()
export class BundleService {

    constructor(private http: HttpClientProvider) {
    }

    

    getOfferings(): Observable<OfferingListModel[]> {
        return this.http.get(`/productoffering/getOfferings/2`);
    }

     getSimpleOfferingsForSelectAsync(): Observable<IdNameDescriptionModel[]> {
         return  this.http.getAsync(`/productoffering/getSimpleOfferingsForSelect`);
     }
    getSimpleOfferingsForSelect(): Observable<IdNameDescriptionModel[]> {
        return  this.http.get(`/productoffering/getSimpleOfferingsForSelect`);
    }
    createOffering(model) {
        return this.http.post(`/productoffering/createoffering`, model);
    }

    deleteOffering(id) {
        return this.http.get('/productoffering/deleteoffering/' + id);
    }

    getOffering(id) : Observable<BundleModel> {
        return this.http.get(`/productoffering/getoffering/` + id);
    }

    updateOffering(model){
        return this.http.post(`/productoffering/updateoffering`, model);
    }
}
