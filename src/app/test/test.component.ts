import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
    mySelection: string;
    priceCurrencyStyle: string;
    priceCurrency: number;
    isPercentage: boolean;
    isPercentageStyle: string;

    constructor() {
        this.mySelection = "OneTime";
        this.priceCurrency = 1;
        this.priceCurrencyStyle = "fa-try"
        this.isPercentage = false;
        this.isPercentageStyle = "fa-money";
    }

    ngOnInit() {
        console.log(this.mySelection);
    }

    onChangeCurrency($event) {

        if ($event.target.value == 1) {
            this.priceCurrencyStyle = "fa-try";
        }
        else if ($event.target.value == 2) {
            this.priceCurrencyStyle = "fa-usd";
        }
        else {
            this.priceCurrencyStyle = "fa-eur";
        }
    }

    onChangeIsPercentage() {

        if (this.isPercentage) {
            this.isPercentageStyle = "fa-percent";
        }
        else {
            this.isPercentageStyle = "fa-money";
        }
    }

}
