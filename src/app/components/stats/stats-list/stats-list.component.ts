import { Component, OnInit, ViewChild } from '@angular/core';
import { House } from 'src/app/models/house.model';
import { HouseService } from 'src/app/services/house.service';
import { Label, SingleDataSet, Color, BaseChartDirective } from 'ng2-charts';
import * as Chart from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-stats-list',
  templateUrl: './stats-list.component.html',
  styleUrls: ['./stats-list.component.css']
})
export class StatsListComponent implements OnInit {

    houses: House[];
    _incomeForLastFiveYears: number[] = [];
    _YTDIncomesByHouse = {};

    get labels(): string[] {
        const labels = [];
        this.houses.forEach(house => {
            labels.push(`${house.name[0].toUpperCase()}${house.name.substr(1)}`);
        });
        return labels;
    }

    get _barChartData(): number[] {
        const data = [];
        this.houses.forEach(house => {
            data.push(house.totalRentPerMonth);
        });
        return data;
    }

    get _pieChartData(): number[] {
        const results = [];
        this.houses.forEach(house => {
            results.push(this._YTDIncomesByHouse[house.name]);
        });
        return results;
    }

    get incomeForLastFiveYears(): number[] {
        return this._incomeForLastFiveYears;
    }

    public chartLabels: Label[] = [];
    public barChartType: Chart.ChartType = 'bar';
    public pieChartLegend = true;
    public barChartData = [];
    public pieChartPlugins = [pluginDataLabels];


    public pieChartLabels: Label[] = [];
    public pieChartData: SingleDataSet = [];
    public pieChartType: Chart.ChartType = 'pie';

    public barChartOptions: Chart.ChartOptions = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: { xAxes: [{}], yAxes: [{
            ticks: {
                callback: function(value) {
                    return `€${value}`;
                },
                beginAtZero: true
            }
        }] },
        plugins: {
          datalabels: {
                anchor: 'end',
                align: 'end',
          }
        },
        legend: {
            display: false
        },
        title: {
            display: false
        },
        tooltips: {
            callbacks: {
                label: (tick, index) => {
                    return `€${tick.yLabel}`;
                }
            }
        }
    };

    public pieChartOptions: Chart.ChartOptions = {
        responsive: true,
        legend: {
            display: true,
            labels: {
                usePointStyle: true,
            },
            position: 'bottom'
        },
        plugins: {
          datalabels: {
              display: false,
          },
        }
    };

    public chartColors: Array<any> = [
        { // all colors in order
          backgroundColor: ['rgba(27, 201, 142, 0.8)', 'rgba(230, 71, 89, 0.8)', 'rgba(247, 195, 49, 0.8)'],
        }
    ];

    public lineChartData: Chart.ChartDataSets[] = [
        {data: []}, {data: []}, {data: []}, {data: []},
        { data: this.incomeForLastFiveYears, label: 'Series A'},
      ];

      public lineChartLabels: Label[] = ['2014', '2015', '2016', '2017', '2018'];
      public lineChartOptions: (Chart.ChartOptions) = {
        responsive: true,
        legend: {
            display: false
        },

        scales: {
          // We use this empty structure as a placeholder for dynamic theming.
          xAxes: [{}],
          yAxes: [
            {
              id: 'y-axis-0',
              position: 'left',
              ticks: {
                  beginAtZero: false,
                //   min: 40000,
                  callback: function(value) {
                    return `€${value}`;
                  }
              }
            },
          ]
        },
      };
      public lineChartLegend = true;
      public lineChartType = 'line';
      public lineChartPlugins = [pluginAnnotations];



    constructor(private houseService: HouseService, private paymentService: PaymentService) { }

    ngOnInit() {
        this.houseService.getHouses().subscribe(data => {
            this.houses = data;
            this.barChartData = this._barChartData;
            this.chartLabels = this.labels;
            this.pieChartLabels = this.labels;
        });

        this.paymentService.getPaymentsForLastFiveYears().subscribe(data => {
            console.log(this.lineChartData[4], data);
            this._incomeForLastFiveYears = data;
            this.lineChartData = [
                {data: []}, {data: []}, {data: []}, {data: []},
                { data: data, label: 'Rental Incomes'},
              ];
        });

        this.paymentService.getIncomeForEachHouseThisYear().subscribe(data => {
            this._YTDIncomesByHouse = data;
            this.pieChartData = this._pieChartData;
        });
    }

}
