import { Component, OnInit, OnChanges, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { JsonApiService } from "../core/api/json-api.service";
import { FadeInTop } from "../../shared/animations/fade-in-top.decorator";
//import { Color } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { HomeService } from "./home.service";
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
//import { BaseChartDirective } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

// class SharingService {
//   private data1: CustomType1;
//   getChartsData():() => Promise {
//      if(goog.isDef(this.data1)){
//          return Promise.resolve(data1);
//      }
//      return Net.fetch().then(data => {
//          this.data1 = data;
//          return data;
//      });
//   }
// }	


export class HomeComponent implements OnInit, OnDestroy {


  public chartjsData: any;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };


  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;





  // public customDataSet:any = JSON.stringify({
  //   labels: ["January", "February", "March", "April", "May", "June", "July"],
  //   datasets: [
  //     {
  //       label: "My First dataset",
  //       backgroundColor: "rgba(220,220,220,0.5)",
  //       borderColor: "rgba(220,220,220,0.8)",
  //       hoverBackgroundColor: "rgba(220,220,220,0.75)",
  //       hoverBorderColor: "rgba(220,220,220,1)",
  //       data: [65, 59, 80, 81, 56, 55, 40], 
  //     },
  //     {
  //       label: "My Second dataset",
  //       backgroundColor: "rgba(151,187,205,0.5)",
  //       borderColor: "rgba(151,187,205,0.8)",
  //       hoverBackgroundColor: "rgba(151,187,205,0.75)",
  //       hoverBorderColor: "rgba(151,187,205,1)",
  //       data: [28, 48, 40, 19, 86, 27, 90],
  //     }

  //   ]
  // });

  public customData: any[];


  public offeringsOfCategoriesChartData: any[] = [
    { data: [65, 59, 80, 65], label: 'Available' },
    { data: [28, 48, 40, 28], label: 'Closed' }
  ];
  public offeringsOfCategoriesLabels: string[] = ['Fiber', 'FTTH', 'Internet + Phon', 'TSOL'];

  // public customDataSetdatasets:  any[] = [
  //   { data: [65, 59, 80, 65, 59], label: 'Available' },
  //   { data: [28, 48, 40, 28, 48], label: 'Closed' }
  // ];
  // public customDataSetlabels: string[] =  ['THK', 'FTTH', 'TSOL', 'Fiber', 'ADSL'];



  private getOfferingSegmentsResponse: any[];
  private getOfferingSalesChannelsResponse: any[];
  private getOfferingOfCategoriesResponse: any[];
  private getOfferingsStatusResponse: any[];
  private getLast7DaysOfferingsResponse: any[];
  private getOfferingsCountOfCategoriesResponse: any[];


  public offeringsCountOfCategoriesDatasets: any[] = [
    { data: [0, 0, 0, 0] }];
  public offeringsCountOfCategoriesData: any[] = [];
  public offeringsCountOfCategoriesLabels: string[] = ["ADSL", "Internet + Phone", 'İşOrtağım', 'Tel'];

  public donutdemo = [];
  //  [
  //                     { "value": 4, "label": "ADSL" }, 
  //                     { "value": 4, "label": "Vodafone.Net" }, 
  //                     { "value": 1, "label": "İşOrtağım" }, 
  //                     { "value": 1, "label": "Tel" }
  //                   ];
  public donutLabels =  ["ADSL", "Vodafone.Net",  "İşOrtağım", "Tel"];


  public offeringsSegmentData: number[];
  public offeringsSegmentLabels: string[];
  public offeringsSegmentDatasets: any[];


  public offeringsOfSaleChannelsChartDataSet: any[] = [
    { data: [0], label: '0' },
    { data: [0], label: '1' }
  ];
  public offeringsOfSaleChannelsLabels: string[] = ["IVR", "MCare", "SMS", "WEB", "CC"];

  public dailyOfferingsServiceResponse: any;
  public dailyOfferingsChartData: number[];
  public dailyOfferingsChartLabels: string[];
  public dailyOfferingsChartDataSets: any[];

  public lineChartType: string = 'line';


  public offeringsStatusDatasets: any[] = [
    { data: [0, 0] }];
  public offeringsStatusData: any[] = [];
  public offeringsStatusLabels: string[] = ["Available", "Closed"];


  public offeringOfCategoriesChartDataSet: any[] = [
    { data: [0], label: 'Available' },
    { data: [0], label: 'Closed' }
  ];
  public offeringOfCategoriesLabels: string[] = ["Fiber", "FTTH", "TSOL"];





  public dailyOfferingsChartColors: Array<any> = [
    { // first color
      backgroundColor: 'rgba(255,0,0,0.6)',
      borderColor: 'rgba(255,0,0,0.2)',
      pointBackgroundColor: 'rgba(255,0,0,0.6)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,0,0,0.6)'
    }];

  public newBarChartColors: Array<any> = [
    { // first color
      backgroundColor: 'rgba(255,0,0,0.6)',
      borderColor: 'rgba(255,0,0,0.2)',
      pointBackgroundColor: 'rgba(255,0,0,0.6)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,0,0,0.6)'
    },
    { // first color
      backgroundColor: 'rgba(0,0,255,0.6)',
      borderColor: 'rgba(0,0,255,0.6)',
      pointBackgroundColor: 'rgba(0,0,255,0.6)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,0,255,0.6)'
    }];






  public newPieChartColors: Array<any> = [{
    backgroundColor: ['rgba(255,0,0,0.6)', 'rgba(0,0,255,0.6)', 'rgba(255,51,51,0.6)', 'rgba(255,77,77,0.6)'],
    pointHoverBackgroundColor: '#000'
  }];

  public morrisDonutChartColors: Array<any> = [{
    backgroundColor: ['rgba(255,0,0,0.6)', 'rgba(255,26,26,0.6)', 'rgba(255,51,51,0.6)', 'rgba(255,77,77,0.6)', 'rgba(255,100,100,0.6)', 'rgba(255,100,100,0.6)'],
    pointHoverBackgroundColor: '#000'
  }];

  public dailyOfferingsChartLabels_: string[] = [];




  barColorsDemo(row, series, type) {
    if (type === 'donut') {
      var red = Math.ceil(150 * row.y / 8);
      return 'rgb(' + red + ',0,0)';
    } else {
      return '#000';
    }
  }

  @ViewChild("OfferingsOfSaleChannels") offeringsOfSaleChannelsChart: BaseChartDirective;
  //@ViewChild("OfferingsOfParent") OfferingsOfParent: Morris.Donut;

  constructor(private router: Router, private homeService: HomeService, private jsonApiService: JsonApiService) {

    var now = moment();
    var dateNow1 = moment(now);
    var dateNow2 = moment(now.add(-1, 'days'));
    var dateNow3 = moment(now.add(-1, 'days'));
    var dateNow4 = moment(now.add(-1, 'days'));
    var dateNow5 = moment(now.add(-1, 'days'));
    var dateNow6 = moment(now.add(-1, 'days'));
    var dateNow7 = moment(now.add(-1, 'days'));


    this.offeringsSegmentData = [12, 17];
    this.offeringsSegmentLabels = ["EBU", "CBU"];

    this.dailyOfferingsChartData = [0, 0, 0, 0, 0, 0, 0];
    this.dailyOfferingsChartLabels = [dateNow7.toDate().getDate() + "/" + (dateNow7.toDate().getMonth() + 1),
    dateNow6.toDate().getDate() + "/" + (dateNow6.toDate().getMonth() + 1),
    dateNow5.toDate().getDate() + "/" + (dateNow5.toDate().getMonth() + 1),
    dateNow4.toDate().getDate() + "/" + (dateNow4.toDate().getMonth() + 1),
    dateNow3.toDate().getDate() + "/" + (dateNow3.toDate().getMonth() + 1),
    dateNow2.toDate().getDate() + "/" + (dateNow2.toDate().getMonth() + 1),
    dateNow1.toDate().getDate() + "/" + (dateNow1.toDate().getMonth() + 1)];
    this.dailyOfferingsChartDataSets = [{ data: [0, 0, 0, 0, 0, 0, 0], label: "Offerings" }]


    this.homeService.getOfferingSegments().subscribe(
      (data) => {
        this.getOfferingSegmentsResponse = data;
      },
      error => console.log("Error: ", error),
      () => {
        this.offeringsSegmentData = this.getOfferingSegmentsResponse[0].data;
        this.offeringsSegmentLabels = this.getOfferingSegmentsResponse[0].labels;
        this.offeringsSegmentDatasets = [
          {
            labels: this.offeringsSegmentLabels,
            data: this.offeringsSegmentData,
            backgroundColor: this.backgroundColorOfferings,
            hoverBackgroundColor: this.hoverBackgroundColorOfferings
          }];
      }
    );





    this.homeService.getOfferingsStatus().subscribe(
      (data) => {
        this.getOfferingsStatusResponse = data;
      },
      error => console.log("Error: ", error),
      () => {
        this.offeringsStatusData = this.getOfferingsStatusResponse[0].data;
        this.offeringsStatusLabels = this.getOfferingsStatusResponse[0].labels;
        this.offeringsStatusDatasets = [
          {
            labels: this.offeringsStatusLabels,
            data: this.offeringsStatusData,
            backgroundColor: this.backgroundColorOfferings,
            hoverBackgroundColor: this.hoverBackgroundColorOfferings
          }];
      }
    );





    this.homeService.getOfferingSalesChannels().subscribe(
      (data) => {
        this.getOfferingSalesChannelsResponse = data;
      },
      error => console.log("Error: ", error),
      () => {
        this.offeringsOfSaleChannelsChartDataSet = [];
        this.offeringsOfSaleChannelsLabels = [];
        for (let item of this.getOfferingSalesChannelsResponse) {
          this.offeringsOfSaleChannelsChartDataSet.push({ data: item.data, label: item.datalabel });
        }
        //this.offeringsOfSaleChannelsChartDataSet.push({labels:this.getOfferingSalesChannelsResponse[0].labels});
        this.offeringsOfSaleChannelsLabels = this.getOfferingSalesChannelsResponse[0].labels;
        //this.offeringsOfSaleChannelsChart.labels =  this.offeringsOfSaleChannelsLabels ;

      }
    );




    this.homeService.getLast7DaysOfferings().subscribe(
      (data) => {
        this.getLast7DaysOfferingsResponse = data;
      },
      error => console.log("Error: ", error),
      () => {
        let i = 0;
        let x = 0;
        for (let uiLabel of this.dailyOfferingsChartLabels) {
          i = 0;
          for (let serviceLabel of this.getLast7DaysOfferingsResponse[0].labels) {
            if (uiLabel.toString() == serviceLabel.toString()) {
              this.dailyOfferingsChartData[x] = this.getLast7DaysOfferingsResponse[0].data[i];
            }
            i = i + 1;
          }
          x = x + 1;
        }
        //this.offeringsOfSaleChannelsLabels = this.getOfferingSalesChannelsResponse[0].labels;
        this.dailyOfferingsChartDataSets = [{ data: this.dailyOfferingsChartData, label: "Offerings" }]
      }
    );



    this.homeService.getOfferingOfCategories().subscribe(
      (data) => {
        this.getOfferingOfCategoriesResponse = data;
      },
      error => console.log("Error: ", error),
      () => {
        var currentOfferingOfCategoriesChartDataSet = [];
        this.offeringOfCategoriesLabels = [];
        for (let item of this.getOfferingOfCategoriesResponse) {
          currentOfferingOfCategoriesChartDataSet.push({ data: item.data, label: item.datalabel });
        }

        this.offeringOfCategoriesChartDataSet = currentOfferingOfCategoriesChartDataSet;
        this.offeringOfCategoriesLabels = this.getOfferingOfCategoriesResponse[0].labels;
      }
    );



    this.homeService.getOfferingsCountOfCategories().subscribe(
      (data) => {
        this.getOfferingsCountOfCategoriesResponse = data;
      },
      error => console.log("Error: ", error),
      () => {
        this.offeringsCountOfCategoriesData = this.getOfferingsCountOfCategoriesResponse[0].data;
        this.offeringsCountOfCategoriesLabels = this.getOfferingsCountOfCategoriesResponse[0].labels;
        this.offeringsCountOfCategoriesDatasets = [
          {
            labels: this.offeringsCountOfCategoriesLabels,
            data: this.offeringsCountOfCategoriesData,
            backgroundColor: this.backgroundColorOfferings,
            hoverBackgroundColor: this.hoverBackgroundColorOfferings
          }];

        let i = 0;

        // public donutdemo = [{ "value": 70, "label": "Internet" }, { "value": 15, "label": "İşOrtağım" }];
        // public donutLabels = ["ADSL", "Vodafone.Net (Residential", "Internet", "İşOrtağım", "Tel"];

        
        console.log(this.donutdemo);
        var currentData:any[] = [];
        for (let item of this.getOfferingsCountOfCategoriesResponse[0].data) {

          currentData.push({ "value": item, "label": this.getOfferingsCountOfCategoriesResponse[0].labels[i] });

          i = i + 1;

        }

        this.donutdemo = currentData;
        //this.OfferingsOfParent.setData(currentData);
        this.donutLabels = this.getOfferingsCountOfCategoriesResponse[0].labels;

        console.log(this.donutdemo);
        console.log("donutdemo");

      }
    );



    //  this.homeService.getOfferingOfCategories().subscribe(
    //   (data) => {
    //     this.customData = data;
    //   },
    //   error => console.log("Error: ", error),  
    //   () => {     
    //     let daaaaa = [];
    //     for (let item of this.customData) {
    //       daaaaa.push( { data:item.data, label:item.datalabel });
    //     }  
    //     this.customDataSet = JSON.stringify({
    //       labels : this.customData[0].labels,
    //       datasets : daaaaa 
    //    }); 
    //    this.customDataSetdatasets = daaaaa;
    //    this.customDataSetlabels = this.customData[0].labels;
    //     console.log(this.customDataSet);
    //   } 
    // );


    setTimeout(() => {
      if (this.offeringsOfSaleChannelsChart && this.offeringsOfSaleChannelsChart.chart) {
        // this.offeringsOfSaleChannelsChart.chart.config.data.labels = labels;
        // this.offeringsOfSaleChannelsChart.chart.update();
        this.offeringsOfSaleChannelsLabels = this.getOfferingSalesChannelsResponse[0].labels;
      }
    });
  }

  ngOnChanges() { }

  ngOnInit() {


    this.jsonApiService.fetch('/graphs/chartjs.json').subscribe((data) => {
      this.chartjsData = data;
    })

  }

  reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
    let currentUrl = this.router.url + '?';
    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }


  ngOnDestroy() { }

  doughnutChartType: string = 'doughnut';
  barChartType2: string = 'bar';



  backgroundColorOfferings: string[] = ["#FF6384", "#36A2EB", "#FFCE56"];
  hoverBackgroundColorOfferings: string[] = ["#FF6384", "#36A2EB", "#FFCE56"];

  dataOfferingsSalesChannel: number[] = [78, 562, 1654];
  labelsOfferingsSalesChannel: string[] = ['Ivr', 'Online', 'Channel'];


  @ViewChild('mycanvas') canvas: ElementRef;
  ctx = this.canvas;

  datasetsOfferingsSalesChannel: any[] = [
    {
      labels: this.dataOfferingsSalesChannel,
      data: this.dataOfferingsSalesChannel,
      backgroundColor: this.backgroundColorOfferings,
      hoverBackgroundColor: this.hoverBackgroundColorOfferings
    }];

  optionsOfferingsSalesChannel = {
    circumference: Math.PI,
    rotation: Math.PI,
    animation: {
      onComplete: function () {
        this.doit(this.ctx);
      }
    }
  }

  dataOfferings: number[] = [51, 498];
  labelsOfferings: string[] = ['Available', 'Closed'];

  datasetsOfferings: any[] = [
    {
      labels: this.labelsOfferings,
      data: this.dataOfferings,
      backgroundColor: this.backgroundColorOfferings,
      hoverBackgroundColor: this.hoverBackgroundColorOfferings
    }];

  public barChartLegend2: boolean = true;

  public barChartData2: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [17, 67, 37, 27, 57, 37, 47], label: 'Series C' }
  ];
  public barChartLabels2: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  public barChartDataSetsSingleLine: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  barChartLabelsSingleLine: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];



  public chartClicked(e: any): void {
    this.offeringsOfSaleChannelsLabels = this.getOfferingSalesChannelsResponse[0].labels;
  }
  public chartHovered(e: any): void {
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }



}
