import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tweetData: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {}

  getData() {
    this.apiService.getTweetData().subscribe((data) => {
      console.log('fetched data ', data);
      this.tweetData = JSON.stringify(data);
    });
  }

}
