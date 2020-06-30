import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { MultiDataSet, Color, BaseChartDirective, Label } from 'ng2-charts';
import { DatepickerOptions } from 'ng2-datepicker';
import * as enLocale from 'date-fns/locale/en';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Doughnut
  public doughnutChartLabels: Label[] = ['Today', 'This Month', 'This Year'];
  public doughnutChartData: MultiDataSet = [
    [50, 230, 1270],
  ];
  public doughnutChartType: ChartType = 'doughnut';
  
  // Doughnut
  public lineChartData: ChartDataSets[] = [
    { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
  ];
  public lineChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(0,0,0,0.3)',
          },
          ticks: {
            fontColor: 'gray',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'gray',
          borderWidth: 2
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  
  fromdate: Date;
  todate: Date;
  optionsFrom: DatepickerOptions = {
    minYear: 1990,
    maxDate: new Date(),
    locale: enLocale
  };
  optionsTo: DatepickerOptions = {
    minDate: this.todate,
    maxDate: new Date(),
  };
  fromDate($event){
    this.todate = $event;
    this.optionsTo = {
      minDate: this.todate,
      maxDate: new Date(),
      locale: enLocale
    }
  }
  
  constructor() {
    this.fromdate = new Date();
    this.todate = new Date();
  }

  ngOnInit(): void {
  }

}
