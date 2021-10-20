import { Component, OnInit } from '@angular/core';
import {Label, MultiDataSet} from "ng2-charts";
import {ChartType} from "chart.js";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales', "AA", "BB", "CC", "DD", "EE", "FF", "GG", "HH"];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100, 99,99,99,99,99,99,99,99]
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public loaded: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  private initData(): void {

  }
}
