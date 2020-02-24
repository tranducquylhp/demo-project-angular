import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClientProvider} from './shared/httpclientprovider/http-client-provider';
import {CatalogService} from './catalog/catalog.service';
import {CharacteristicService} from './characteristic/characteristic.service';
import {OfferingService} from "./offering/offering.service";
import {specificationService} from "./specification/specification.service";
import { HomeService } from './home/home.service';
import { DocumentService } from './document/document.service';
import { CategoryService } from './category/category.service';
import {BundleService} from "./bundle/bundle.service";
import {Student} from "./students/model/student";
import {StudentsService} from "./students/students.service";


@Injectable()
export class DataResolver implements Resolve<any> {
    constructor() {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Observable.of({res: 'I am data'});
    }
}

// an array of services to resolve routes with data
export const APP_RESOLVER_PROVIDERS = [
    DataResolver,
    HttpClientProvider,
    OfferingService,
    CharacteristicService,
    CatalogService,
    specificationService,
    HomeService,
    DocumentService,
    CategoryService,
    BundleService
];
