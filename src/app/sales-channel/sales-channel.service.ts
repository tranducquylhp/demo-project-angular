import {Injectable} from '@angular/core';
import {HttpClientProvider} from "../shared/httpclientprovider/http-client-provider";
import {Observable} from "rxjs/Observable";
import {SalesChannel} from "./detail/sales-channel"

@Injectable()
export class SalesChannelService {

    constructor(private http: HttpClientProvider) {
    }

    getSalesChannels(): Observable<SalesChannel[]> {
        return this.http.get('/saleschannel/getallsaleschannels');
    }
  
    getSalesChannel(id): Observable<SalesChannel> {
        return this.http.get('/saleschannel/getsaleschannel?id='+ id);
    }

    createSalesChannel(model) {
        return this.http.post('/saleschannel/createsaleschannel', model);
    }
  
    updateSalesChannel(model) {
        return this.http.post('/saleschannel/updatesaleschannel', model);
    }

    deleteSalesChannel(id) {
        return this.http.get('/saleschannel/deletesaleschannel?id='+ id);
    }
}
