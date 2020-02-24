import { Injectable } from '@angular/core';
import { HttpClientProvider } from '../shared/httpclientprovider/http-client-provider';
import { Category } from './category.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {

    public path: string = `/categories`;

    constructor(private http: HttpClientProvider) { }

    getAll(): Observable<Category[]> {
        return this.http.get(this.path);
    }

    get(id: any): Observable<Category> {
        return this.http.get(this.path + '/' + id);
    }

    create(model) {
        return this.http.post(this.path, model);
    }

    update(id: any, model): any {
        return this.http.put(this.path + '/' + id, model);
    }

    delete(id: any): any {
        return this.http.delete(this.path + '/' + id);
    }

    getLeavesFullPathNames(): Observable<Category[]> {
        return this.http.get(this.path + '/leavesFullPathNames');
    }
}
