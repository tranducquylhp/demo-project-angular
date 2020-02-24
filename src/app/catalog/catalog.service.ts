import {Injectable} from '@angular/core';
import {Catalog} from "./model/catalog.model";
import {Observable} from "rxjs/Observable";
import {HttpClientProvider} from "../shared/httpclientprovider/http-client-provider";
import {CatalogEditModel} from "./model/catalogEditModel";

@Injectable()
export class CatalogService {

    constructor(private http: HttpClientProvider) {
    }

    getCatalogs(): Observable<Catalog[]> {
        return this.http.get(`/catalog/getallcatalogs`);
    }

    createCatalog(model) {
        return this.http.post(`/catalog/createcatalog`, model);
    }

    deleteCatalog(id) {
        return this.http.get('/catalog/deleteCatalog/' + id);
    }

    getCatalogById(id): Observable<CatalogEditModel> {
        return this.http.get('/catalog/getcatalogbyid/' + id);
    }

    updateCatalog(model) {
        return this.http.post('/catalog/updatecatalog', model);
    }
}
