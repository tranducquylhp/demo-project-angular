import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClientProvider} from "../shared/httpclientprovider/http-client-provider";
import {OfferingEditModel} from "./model/offering-edit-model";
import {OfferingListModel} from "./model/offering-list-model";

@Injectable()
export class OfferingService {

    constructor(private http: HttpClientProvider) {
    }

    getOfferings(): Observable<OfferingListModel[]> {
        return this.http.get(`/productoffering/getOfferings/1`);
    }

    createOffering(model) {
        return this.http.post(`/productoffering/createoffering`, model);
    }

    deleteOffering(id) {
        return this.http.get('/productoffering/deleteoffering/' + id);
    }

    getOffering(id) : Observable<OfferingEditModel> {
        return this.http.get(`/productoffering/getoffering/` + id);
    }

    updateOffering(model){
        return this.http.post(`/productoffering/updateoffering`, model);
    }
}
