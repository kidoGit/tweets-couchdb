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

}
