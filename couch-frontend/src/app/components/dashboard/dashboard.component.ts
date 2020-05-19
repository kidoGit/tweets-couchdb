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

  // latitude = 22.3039;
  // longitude = 70.8022;
  mapType = 'roadmap';
  selectedMarker;
  markers = [
    // dummy coordinates
    { lat: 22.33159, lng: 105.63233, alpha: 1 },
    { lat: 7.92658, lng: -12.05228, alpha: 1 },
    { lat: 48.75606, lng: -118.859, alpha: 1 },
    { lat: 5.19334, lng: -67.03352, alpha: 1 },
    { lat: 12.09407, lng: 26.31618, alpha: 1 },
    { lat: 47.92393, lng: 78.58339, alpha: 1 }
  ];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    Highcharts.chart('scatterContainer', this.scatterOptions);
    Highcharts.chart('barContainer', this.barOptions);
    Highcharts.chart('pieContainer', this.pieOptions);
  }

  getNextTweets() {
    this.currentPageNo += 1;
    this.getTweets(this.currentPageNo);
  }

  getPreviousTweets() {
    this.currentPageNo = this.currentPageNo > 0 ? this.currentPageNo - 1 : this.currentPageNo;
    this.setDisplayTweets();
  }

  getTweets(pageNo) {
    if (!this.fetchedRows.includes(pageNo)) {
      this.apiService.getTweetData(pageNo).subscribe((data: any) => {
        this.tweetData = this.tweetData.concat(data.rows);
        this.setDisplayTweets();
        this.fetchedRows.push(pageNo);
      });
    } else {
      this.setDisplayTweets();
    }
  }

  setDisplayTweets() {
    const startIndex = this.currentPageNo * 20;
    const endIndex = (this.currentPageNo + 1) * 20;
    this.displayTweets = this.tweetData.slice(startIndex, endIndex);
  }


  addMarker(lat: number, lng: number) {
    // alpha is the opacity of the marker
    this.markers.push({ lat, lng, alpha: 1 });
  }

  max(coordType: 'lat' | 'lng'): number {
    return Math.max(...this.markers.map(marker => marker[coordType]));
  }

  min(coordType: 'lat' | 'lng'): number {
    return Math.min(...this.markers.map(marker => marker[coordType]));
  }

  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    };
  }

}
