import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClientProvider } from "../shared/httpclientprovider/http-client-provider";
import { HomeChartsData } from './model/homeChartData';

@Injectable()
export class HomeService {

    constructor(private http: HttpClientProvider) { }

    getChartsData(): Observable<HomeChartsData[]> {
        return this.http.get(`/home/getChartsData`);
    }

    getOfferingSegments(): Observable<HomeChartsData[]> {
        return this.http.get(`/home/getOfferingSegments`);
    }

    getOfferingSalesChannels(): Observable<HomeChartsData[]> {
        return this.http.get(`/home/getOfferingSalesChannels`);
    }

    getOfferingOfCategories(): Observable<HomeChartsData[]> {
        return this.http.get(`/home/getOfferingOfCategories`);
    }

    getOfferingsStatus(): Observable<HomeChartsData[]> {
        return this.http.get(`/home/getOfferingsStatus`);
    }

    getLast7DaysOfferings(): Observable<HomeChartsData[]> {
        return this.http.get(`/home/getLast7DayscreatedOfferings`);
    }
    
    getOfferingsCountOfCategories(): Observable<HomeChartsData[]> {
        return this.http.get(`/home/getOfferingsCountOfCategories`);
    }

}
