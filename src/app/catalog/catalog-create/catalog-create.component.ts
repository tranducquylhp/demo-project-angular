import {Component, OnInit} from '@angular/core';
import {CreateCatalogModel} from "../model/create-catalog-model";
import {CatalogService} from "../catalog.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-catalog-create',
    templateUrl: './catalog-create.component.html'
})
export class CatalogCreateComponent implements OnInit {

    model: CreateCatalogModel;

    constructor(private router: Router, private catalogService: CatalogService) {
        this.model = new CreateCatalogModel();
        /*
        var currentDate = new Date();
        var startDate = new Date();
        var endDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        this.model.validForStartDate = startDate.toISOString().split("T")[0]; // 2014-05-23
        this.model.validForEndDate = endDate.toISOString().split("T")[0]; // 2014-05-23
        */
    }

    ngOnInit() {
    }

    public onSubmit() {
        this.catalogService.createCatalog(this.model).subscribe(data => {
            this.router.navigate(['/catalog/catalog-list']);
        });
    }
}
