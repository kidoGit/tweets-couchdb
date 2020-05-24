import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BAR_OPTIONS, PIE_OPTIONS, SCATTER_OPTIONS } from '../../shared/constants';

import * as Highcharts from 'highcharts';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  scatterOptions: any = SCATTER_OPTIONS;
  barOptions: any = BAR_OPTIONS;
  pieOptions: any = PIE_OPTIONS;

  tweetData = [];
  displayTweets = [];
  fetchedRows = [];
  currentPageNo = 0;
  coordinates = [];

  PIECHART_OPTIONS = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Distribution of Scenarios!'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
        name: 'Chrome',
        y: 61.41,
        sliced: true,
        selected: true
      }, {
        name: 'Internet Explorer',
        y: 11.84
      }, {
        name: 'Firefox',
        y: 10.85
      }, {
        name: 'Edge',
        y: 4.67
      }, {
        name: 'Safari',
        y: 4.18
      }, {
        name: 'Sogou Explorer',
        y: 1.64
      }, {
        name: 'Opera',
        y: 1.6
      }, {
        name: 'QQ',
        y: 1.2
      }, {
        name: 'Other',
        y: 2.61
      }]
    }]
  };

  defaultCenter = { lat: -37.81743, lng: 144.96063, alpha: 0 }
  markers = { environment: [], pollution: [], accident: [], lavish: [] }
  dataLength = { environment: 0, pollution: 0, accident: 0, lavish: 0 }

  // latitude = 22.3039;
  // longitude = 70.8022;
  mapType = 'roadmap';
  selectedMarker;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // Highcharts.chart('scatterContainer', this.scatterOptions);
    // Highcharts.chart('barContainer', this.barOptions);
    Highcharts.chart('pieContainer', this.pieOptions);
  }

  getTweets(view) {
    this.apiService.getTweets(view).subscribe((data: any) => {
      console.log(data)
      const viewGeoKey = view + 'Geo'
      data.forEach(element => {
        if (element.key === viewGeoKey) {
          const lat = element.value[1].coordinates[0]
          const lng = element.value[1].coordinates[1]
          this.markers[view].push({ lat, lng, alpha: 1 })
        }
      });
      this.dataLength[view] = data.length - this.markers[view].length
      this.tweetData = this.tweetData.concat(data.rows);
    });
  }

  // addMarker(lat: number, lng: number) {
  //   // alpha is the opacity of the marker
  //   this.markers.push({ lat, lng, alpha: 1 });
  // }

  // max(coordType: 'lat' | 'lng'): number {
  //   return Math.max(...this.markers.map(marker => marker[coordType]));
  // }

  // min(coordType: 'lat' | 'lng'): number {
  //   return Math.min(...this.markers.map(marker => marker[coordType]));
  // }

  // selectMarker(event) {
  //   this.selectedMarker = {
  //     lat: event.latitude,
  //     lng: event.longitude
  //   };
  // }
}
