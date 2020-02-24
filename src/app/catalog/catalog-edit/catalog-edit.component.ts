import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogEditModel} from '../model/catalogEditModel';
import {CatalogService} from '../catalog.service';
import {ValidDateModel} from "../model/validDateModel";

@Component({
    selector: 'app-catalog-edit',
    templateUrl: './catalog-edit.component.html'
})
export class CatalogEditComponent implements OnInit {

    catalogId: string;
    model: CatalogEditModel;

    constructor(private router: Router, private route: ActivatedRoute, private catalogService: CatalogService) {
        this.model = new CatalogEditModel();
        this.model.validFor = new ValidDateModel();
    }

    ngOnInit() {
        this.catalogId = this.route.snapshot.paramMap.get('catalogId');

        this.catalogService.getCatalogById(Number(this.catalogId))
            .subscribe(res => {
                console.log(res);
                this.model = res;
            });
    }

    public onSubmit() {
        this.catalogService.updateCatalog(this.model).subscribe(data => {
            this.router.navigate(['/catalog/catalog-list']);
        });
    }

}
