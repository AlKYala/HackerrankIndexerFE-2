import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Label, MultiDataSet} from "ng2-charts";
import {ChartType} from "chart.js";
import {Subscription} from "rxjs";
import {PLanguageService} from "../../shared/datamodels/PLanguage/service/PLanguageService";
import {switchMap} from "rxjs/operators";
import {Planguage} from "../../shared/datamodels/PLanguage/model/PLanguage";
import {AnalyticsService} from "../../shared/services/AnalyticsService";
import {UsageStatistics} from "../../shared/datamodels/Analytics/models/UsageStatistics";
import {SubscriptionService} from "../../shared/services/SubscriptionService";
import {Color, ScaleType} from "@swimlane/ngx-charts";


/**
 * TODO: FIND OUT WHY CHART ONLY LOADS AFTER REFRESH
 */

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {

  //@ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  /*public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [
    []
  ];*/
  public ngxChartData: any[] = [];
  public doughutColors: Color = {group: ScaleType.Ordinal, name: "", selectable: false, domain: ["808080", "B22222", "228B22", "FF1493", "000080", "FF0000", "A52A2A",
      "00FFFF", "008080", "0000CD", "FFFF00", "F5F5DC", "DCDCDC", "1E90FF", "DAA520", "4B0082", "7CFC00",
      "FFB6C1", "DDA0DD", "32CD32", "F5DEB3", "800000", "006400", "F5FFFA", "F0FFFF", "800080", "708090",
      "7FFFD4", "000000", "9ACD32"]};
  /*public pieChartColors: Array <any> = [{
    backgroundColor: this.doughutColors
  }];*/
  //public doughnutChartType: ChartType = 'doughnut';
  private subscriptions: Subscription[] = [];
  public loaded: boolean = false;



  constructor(private pLanguageService: PLanguageService,
              private analyticsService: AnalyticsService,
              private subscriptionService: SubscriptionService,
              public changeDetector: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeParam(this.subscriptions);
  }

  ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    const subscription: Subscription =
      this.analyticsService.getUsageStatisticsList()
      .pipe()
      .subscribe((data: any) => {
        this.ngxChartData = data;
      });
    this.subscriptions.push(subscription);
  }

  private initColors(data: string[]): void {
  this.doughutColors = {group: ScaleType.Linear, name: "", selectable: false, domain: data};
  }

  /* Everything below this line is deprecatedf

  private initChart(statistics: UsageStatistics): void {
    this.initUsagePercentages(statistics);
    this.visualizeChart();
    console.log("initialization done");
  }

  private visualizeChart(): void {
    this.loaded = true;
  }

  private initUsagePercentages(statistics: UsageStatistics): void {
    console.log("initiating");
    const colors: string[] = [];
    const data = [];
    for(let i = 0; i < statistics.planguages.length; i++) {
      //this.doughnutChartLabels.push(statistics.planguages[i].language);
      //this.doughnutChartData[0].push(statistics.numberSubmissions[i]);
      const temp = {name: statistics.planguages[i].language, value: statistics.numberSubmissions[i]};
      colors.push(`${statistics.planguages[i].color}`);
      data.push(temp);
      this.doughutColors.domain.push(`${statistics.planguages[i].color}`)
    }
    //this.doughnutChartLabels = [...this.doughnutChartLabels];
    //this.doughnutChartData= [...this.doughnutChartData];
    this.doughutColors.domain.length = 0;
    this.doughutColors.domain = colors;
    this.ngxChartData = data;
    console.log(data);
  }*/
}
