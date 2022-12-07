import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Statistics } from 'src/app/models/statistics';
import { CashingService } from 'src/app/services/cashing/cashing.service';

declare var google: any;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  statistics!: Statistics;

  subStatistics: Subscription = new Subscription();
  constructor(private cashingService: CashingService) {}
  ngOnInit(): void {
    this.initStatistics();
    google.charts.load('current', { packages: ['corechart'] });
    this.buildChartInfected(this.statistics);
    this.buildChartDead(this.statistics);
  }

  buildChartInfected(statistics: Statistics) {
    var func = (chart: any) => {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Type');
      data.addColumn('number', 'Broj');
      data.addRows([
        ['Novi', statistics.cases.new],
        ['Aktivni', statistics.cases.active],
        ['Kriticni', statistics.cases.critical],
        ['Oporavljeni', statistics.cases.recovered],
        ['Ukupno', statistics.cases.total],
      ]);
      var options = {
        title: 'Zarazeni',
      };
      chart().draw(data, options);
    };
    var chart = () =>
      new google.visualization.ColumnChart(
        document.getElementById('divBarChartInf')
      );
    var callback = () => func(chart);
    google.charts.setOnLoadCallback(callback);
  }
  buildChartDead(statistics: Statistics) {
    var func = (chart: any) => {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Type');
      data.addColumn('number', 'Broj');
      data.addRows([
        ['Novi', statistics.deaths.new],
        ['Ukupno', statistics.deaths.total],
      ]);
      var options = {
        title: 'Smrtni Slucajevi',
      };
      chart().draw(data, options);
    };
    var chart = () =>
      new google.visualization.ColumnChart(
        document.getElementById('divBarChartDead')
      );
    var callback = () => func(chart);
    google.charts.setOnLoadCallback(callback);
  }

  initStatistics(): void {
    this.cashingService.statistics$.subscribe((res) => {
      this.statistics = res;
    });
  }
}
