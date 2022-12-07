import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Statistics } from 'src/app/models/statistics';
import { CashingService } from 'src/app/services/cashing/cashing.service';

@Component({
  selector: 'app-statistika',
  templateUrl: './statistika.component.html',
  styleUrls: ['./statistika.component.css'],
})
export class StatistikaComponent implements OnInit {
  statistics: Statistics = {} as Statistics;

  subStatistics: Subscription = new Subscription();

  constructor(private cashingService: CashingService) {}

  ngOnInit(): void {
    this.initStatistics();
  }
  initStatistics(): void {
    this.cashingService.statistics$.subscribe((res) => {
      this.statistics = res;
    });
  }
}
