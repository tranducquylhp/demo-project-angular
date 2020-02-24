import {Injectable} from '@angular/core';
import {HttpClientProvider} from "../shared/httpclientprovider/http-client-provider";
import {Observable} from "rxjs/Observable";
import {Segment} from "./detail/segment"

@Injectable()
export class SegmentService {

    constructor(private http: HttpClientProvider) {
    }

    getSegments(): Observable<Segment[]> {
        return this.http.get('/segment/getallsegments');
    }
  
    getSegment(id): Observable<Segment> {
        return this.http.get('/segment/getsegment?id='+ id);
    }

    createSegment(model) {
        return this.http.post('/segment/createsegment', model);
    }
  
    updateSegment(model) {
        return this.http.post('/segment/updatesegment', model);
    }

    deleteSegment(id) {
        return this.http.get('/segment/deletesegment?id='+ id);
    }
}
