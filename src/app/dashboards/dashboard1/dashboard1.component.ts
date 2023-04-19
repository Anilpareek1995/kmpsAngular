import { Component, OnInit, ViewChild } from '@angular/core';


import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from 'ng-apexcharts';
import { DashBoardService } from 'src/app/services/dash-board.service';
import { SessionService } from 'src/app/services/session.service';

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss'],
})
export class Dashboard1Component implements OnInit {
  dashboardlist = {
    EveningAmt:0,
EveningFat:0,
EveningQty:0,
EveningSnf:0,
MilkPaymentInYear:0,
MilkQuantityInYear:0,
MilkSupplyDaysInYear:0,
MorningAmt:0,
MorningFat:0,
MorningQty:0,
MorningSnf:0,
ProductDeduction:0,
ShareDeduction:0,
Summer:0,
Winte:0
  }
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public chartOptions: Partial<ChartOptions>;
  constructor(private sessionService:SessionService,
    private dashbaordService:DashBoardService){
    this.chartOptions = {
      series: [
        {
          name: 'GR',
          data: [44, 55, 57, 56, 61, 58],
        },
        {
          name: 'Freight Memo',
          data: [76, 85, 101, 98, 87, 105],
        },
      ],
      chart: {
        type: 'bar',
        fontFamily: 'Poppins,sans-serif',
        height: 347,
      },
      grid: {
        borderColor: 'rgba(0,0,0,.2)',
        strokeDashArray: 3,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },

      legend: {
        show: false,
      },
      fill: {
        colors: ['#26c6da', '#1e88e5'],
        opacity: 1,
      },
      tooltip: {
        theme: 'dark',
      },
    };
  }
  ngOnInit(): void {
   this.GetDashboard();
  }


  GetDashboard(){ 
    console.log("get companyid",this.sessionService.getCurrentUser().value);
    var request = {farmerid:this.sessionService.getCurrentUser().value.CompanyCode,FinYear:"2021"}
  this.dashbaordService.getDashBoardAll(request).subscribe((res:any)=>{
    console.log("res",res);
     this.dashboardlist = res.result;
  })
  }
}
