import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {Label, MultiDataSet} from "ng2-charts";
import {ChartType} from "chart.js";
import {Subscription} from "rxjs";
import {PLanguageService} from "../../shared/datamodels/PLanguage/service/PLanguageService";
import {switchMap} from "rxjs/operators";
import {Planguage} from "../../shared/datamodels/PLanguage/model/PLanguage";
import {AnalyticsService} from "../../shared/services/AnalyticsService";
import {UsageStatistics} from "../../shared/datamodels/Analytics/models/UsageStatistics";
import {SubscriptionService} from "../../shared/services/SubscriptionService";


/**
 * TODO: FIND OUT WHY CHART ONLY LOADS AFTER REFRESH
 */

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
  public loaded: boolean = false;

  constructor(private pLanguageService: PLanguageService,
              private analyticsService: AnalyticsService,
              private subscriptionService: SubscriptionService,
              public changeDetector: ChangeDetectorRef) {}

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
        return this.analyticsService.getUsageStatisticsOfPLanguages();
      }))
      .subscribe((data: UsageStatistics) => {
        this.initChart(data);
      });
    this.subscriptions.push(subscription);
  }

  private initChart(statistics: UsageStatistics): void {
    this.initUsagePercentages(statistics);
    this.visualizeChart();
    console.log("initialization done");
  }

  private visualizeChart(): void {
    this.pieChartColors = [{backgroundColor: this.doughutColors}];
    this.loaded = true;
  }

  private initUsagePercentages(statistics: UsageStatistics): void {
    for(let i = 0; i < statistics.planguages.length; i++) {
      this.doughnutChartLabels.push(statistics.planguages[i].language);
      this.doughnutChartData[0].push(statistics.numberSubmissions[i]);
      this.doughutColors.push(`${statistics.planguages[i].color}`);
    }
  }
}
