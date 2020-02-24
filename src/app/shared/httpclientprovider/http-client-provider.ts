import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs/Observable";
import { IdNameDescriptionModel } from '../../bundle/model/idNameDescriptionModel';


@Injectable()
export class HttpClientProvider {

    rootUrl = environment.productCatalogRootUrl;

    constructor(private http: HttpClient) {
    }


    getAsync(path: string, params?: any): Observable<IdNameDescriptionModel[]> {
        let url = this.rootUrl + path;
        return this.http.get<IdNameDescriptionModel[]>(url);
    }

    get(path: string, params?: any): Observable<any> {
        return this.request('GET', path, params);
    }

    post(path: string, data: any): Observable<any> {
        return this.request('POST', path, null, data);
    }

    put(path: string, data: any): Observable<any> {
        return this.request('PUT', path, null, data);
    }
    
    delete(path: string, params?: any): Observable<any> {
        return this.request('DELETE', path, params);
    }

    request(requestType: string, path: string, params?: any, data?: any): Observable<any> {
        let url = this.rootUrl + path;

        let options = {
            body: data,
            params: params
        };

        switch (requestType) {
            case 'GET':
                return this.http.get(url);
            case 'POST':
                return this.http.post(url, data, options);
            case 'PUT':
                return this.http.put(url, data, options);
            case 'DELETE':
                return this.http.delete(url, options);
        }
    }

}
