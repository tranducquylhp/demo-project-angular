import {Injectable} from '@angular/core';
import {HttpClientProvider} from "../shared/httpclientprovider/http-client-provider";
import {Observable} from "rxjs/Observable";
import {Document} from "./detail/document"

@Injectable()
export class DocumentService {

    constructor(private http: HttpClientProvider) {
    }

    getDocuments(): Observable<Document[]> {
        return this.http.get('/document/getalldocuments');
    }
  
    getDocument(id): Observable<Document> {
        return this.http.get('/document/getdocument?id='+ id);
    }

    createDocument(model) {
        return this.http.post('/document/createdocument', model);
    }
  
    updateDocument(model) {
        return this.http.post('/document/updatedocument', model);
    }

    deleteDocument(id) {
        return this.http.get('/document/deletedocument?id='+ id);
    }
}
