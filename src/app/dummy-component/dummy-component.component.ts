import { Component, OnInit } from '@angular/core';
import {ChartType} from "chart.js";
import {Label, MultiDataSet} from "ng2-charts";

@Component({
  selector: 'app-dummy-component',
  templateUrl: './dummy-component.component.html',
  styleUrls: ['./dummy-component.component.css']
})
export class DummyComponentComponent implements OnInit {

  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales', "AA", "BB", "CC", "DD", "EE", "FF", "GG", "HH"];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100, 99,99,99,99,99,99,99,99]
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
    this.loadJsFile("/assets/js/chart.min.js");
    this.loadJsFile("/assets/bootstrap/js/bootstrap.min.js");
    this.loadJsFile("/assets/js/bs-init.js");
  }

  public loadJsFile(url: string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    console.log(node);
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
