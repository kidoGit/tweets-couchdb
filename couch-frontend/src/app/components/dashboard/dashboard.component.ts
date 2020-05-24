import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PIE_OPTIONS } from '../../shared/constants';

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
export class DashboardComponent implements OnInit, AfterViewInit {

  pieOptions: any = PIE_OPTIONS;
  mapType = 'roadmap';

  environmentFetched = false;
  pollutionFetched = false;
  accidentFetched = false;
  lavishFetched = false;

  defaultCenter = { lat: -37.81743, lng: 144.96063, alpha: 0 };
  markers = { environment: [], pollution: [], accident: [], lavish: [] };
  dataLength = { environment: 0, pollution: 0, accident: 0, lavish: 0 };


  constructor(
    private elementRef: ElementRef,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    Highcharts.chart('pieContainer', this.pieOptions);

    this.getEnvironmentTweets();
    this.getPollutionTweets();
    this.getAccidentTweets();
    this.getLavishTweets();
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f2f2f2';
  }

  setMarkers(view, data) {
    if (data) {
      const viewGeoKey = view + 'Geo';
      data.forEach(element => {
        if (element.key === viewGeoKey) {
          const lat = element.value[1].coordinates[0];
          const lng = element.value[1].coordinates[1];
          this.markers[view].push({ lat, lng, alpha: 1 });
        }
      });

      this.dataLength[view] = data.length - this.markers[view].length;

      switch (view) {
        case 'environment':
          this.pieOptions.series[0].data.push({ name: 'Environment Scenario', y: this.dataLength[view] });
          break;

        case 'pollution':
          this.pieOptions.series[0].data.push({ name: 'Pollution Scenario', y: this.dataLength[view] });
          break;

        case 'accident':
          this.pieOptions.series[0].data.push({ name: 'Accident Scenario', y: this.dataLength[view] });
          break;

        case 'lavish':
          this.pieOptions.series[0].data.push({ name: 'Lavishness Scenario', y: this.dataLength[view] });
          break;

        default:
          break;
      }

      if (this.environmentFetched && this.pollutionFetched && this.accidentFetched && this.lavishFetched) {
        Highcharts.chart('pieContainer', this.pieOptions);
      }
    }
  }

  getEnvironmentTweets() {
    this.apiService.getTweets('environment').subscribe((data: any) => {
      this.environmentFetched = true;
      this.setMarkers('environment', data);
    });
  }

  getPollutionTweets() {
    this.apiService.getTweets('pollution').subscribe((data: any) => {
      this.pollutionFetched = true;
      this.setMarkers('pollution', data);
    });
  }

  getAccidentTweets() {
    this.apiService.getTweets('accident').subscribe((data: any) => {
      this.accidentFetched = true;
      this.setMarkers('accident', data);
    });
  }

  getLavishTweets() {
    this.apiService.getTweets('lavish').subscribe((data: any) => {
      this.lavishFetched = true;
      this.setMarkers('lavish', data);
    });
  }

}
