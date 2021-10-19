import { Component, OnInit } from '@angular/core';
import {ChartType} from "chart.js";
import {Label, MultiDataSet} from "ng2-charts";
import {NodeLoaderUtil} from "../shared/Utils/NodeLoaderUtil";

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

  private jsFiles: string[] = ["/assets/js/chart.min.js", "/assets/bootstrap/js/bootstrap.min.js","/assets/js/bs-init.js"];
  private cssFiles: string[] = ["/assets/bootstrap/css/bootstrap.min.css", "/assets/fonts/fontawesome-all.min.css",
    "/assets/css/Highlight-Clean.css", "/assets/css/styles.css"];

  constructor() { }

  ngOnInit(): void {
    NodeLoaderUtil.loadJSFiles(this.jsFiles, document);
    NodeLoaderUtil.loadCSSFiles(this.cssFiles, document);
  }

  public loadJsFile(url: string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    console.log(node);
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
