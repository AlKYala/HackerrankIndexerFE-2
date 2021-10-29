import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Label, MultiDataSet} from "ng2-charts";
import {ChartType} from "chart.js";
import {Subscription} from "rxjs";
import {PLanguageService} from "../../shared/datamodels/PLanguage/service/PLanguageService";
import {switchMap} from "rxjs/operators";
import {Planguage} from "../../shared/datamodels/PLanguage/model/PLanguage";
import {AnalyticsService} from "../../shared/services/AnalyticsService";
import {UsageStatistics} from "../../shared/datamodels/Analytics/models/UsageStatistics";
import {SubscriptionService} from "../../shared/services/SubscriptionService";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {

  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [
    []
  ];
  public doughutColors: any[] = [];
  public pieChartColors: Array <any> = [{
    backgroundColor: []
  }];
  public doughnutChartType: ChartType = 'doughnut';
  private subscriptions: Subscription[] = [];
  private pLanguages: Planguage[] = [];


  constructor(private pLanguageService: PLanguageService,
              private analyticsService: AnalyticsService,
              private subscriptionService: SubscriptionService) {}

  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeParam(this.subscriptions);
  }

  ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    const subscription: Subscription = this.pLanguageService
      .findAll()
      .pipe(switchMap((pLanguage: Planguage[]) => {
        this.pLanguages = pLanguage;
        return this.analyticsService.getUsagePercentagesOfPLanguages();
      }))
      .subscribe((data: UsageStatistics) => {
        this.initUsagePercentages(data);
      });
    this.subscriptions.push(subscription);
  }

  private visualizeChart(): void {
    this.pieChartColors = [{backgroundColor: this.doughutColors}];
  }

  private initUsagePercentages(statistics: UsageStatistics): void {
    console.log(this.pieChartColors[0]);
    for(let i = 0; i < statistics.planguages.length; i++) {
      this.doughnutChartLabels.push(statistics.planguages[i].language);
      this.doughnutChartData[0].push(statistics.numberSubmissions[i]);
      this.doughutColors.push(`${statistics.planguages[i].color}`);
    }

    console.log(this.doughutColors);
    this.visualizeChart();
  }
}
