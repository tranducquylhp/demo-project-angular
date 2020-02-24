import {Injectable} from "@angular/core";
import {CharacteristicListModel} from "./model/characteristicListModel";
import {Observable} from "rxjs/Observable";
import {HttpClientProvider} from "../shared/httpclientprovider/http-client-provider";
import {CharacteristicEditModel} from './model/characteristicEditModel';
import {ProdSpecCharValueUseListModel} from "./model/prod-spec-char-value-use-list.model";

@Injectable()
export class CharacteristicService {

    constructor(private http: HttpClientProvider) {
    }

    createCharacteristic(model) {
        return this.http.post(`/productspeccharacteristic/createproductspeccharacteristic`, model);
    }


    getAllCharacteristics(): Observable<CharacteristicListModel[]> {
        return this.http.get(`/productspeccharacteristic/getallcharacteristics`);
    }

    deleteCharacteristic(id) {
        return this.http.get('/productspeccharacteristic/deleteproductspeccharacteristic/' + id);
    }

    getCharacteristicById(id): Observable<CharacteristicEditModel> {
        return this.http.get('/productspeccharacteristic/getcharacteristicbyid/' + id);
    }

    updateCharacteristic(model) {
        return this.http.post('/productspeccharacteristic/updateproductspeccharacteristic/', model);
    }

    getSpecCharValueUses(specId): Observable<ProdSpecCharValueUseListModel[]> {
        return this.http.get('/productspeccharacteristic/getspeccharvalueuselist/' + specId);
    }
}