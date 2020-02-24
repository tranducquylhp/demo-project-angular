import {ProdSpecCharValueListModel} from "./prod-spec-char-value-list.model";

export class ProdSpecCharValueUseListModel {
    public prodSpecCharUseId: number;
    public prodSpecCharId: number;
    public prodSpecCharDescription: string;
    public prodSpecCharValue : string;
    public prodSpecCharType : number;
    public required : boolean;
    public configurable: boolean;
    public prodSpecCharValueList: Array<ProdSpecCharValueListModel>;
}
