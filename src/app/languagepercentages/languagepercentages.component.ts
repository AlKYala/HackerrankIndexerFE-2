import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {AnalyticsService} from "../../shared/services/AnalyticsService";
import {SubscriptionService} from "../../shared/services/SubscriptionService";
import {PLanguageService} from "../../shared/datamodels/PLanguage/service/PLanguageService";
import {Subscription} from "rxjs";
import {switchMap} from "rxjs/operators";
import {Planguage} from "../../shared/datamodels/PLanguage/model/PLanguage";
import {PassPercentages} from "../../shared/datamodels/Analytics/models/PassPercentages";
import {PassData} from "../../shared/datamodels/Analytics/models/PassData";

@Component({
  selector: 'app-languagepercentages',
  templateUrl: './languagepercentages.component.html',
  styleUrls: ['./languagepercentages.component.css']
})
export class LanguagepercentagesComponent implements OnInit, AfterViewInit, OnDestroy {

  pLanguages: Planguage[] = [];
  private subscriptions: Subscription[] = [];
  pLanguagePassPercentageMap = new Map<number, number>();
  passData!: PassData[];
  chartData: any[] = [];

  constructor(private analyticsService: AnalyticsService,
              private subscriptionService: SubscriptionService,
              private pLanguageService: PLanguageService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeParam(this.subscriptions);
  }

  /* Deprecated
  private initData(): void {
    console.log("init");
    const subscription: Subscription = this.pLanguageService.findAll()
      .pipe(switchMap((pLanguages: Planguage[]) => {
        this.pLanguages = pLanguages;
        return this.analyticsService.getPassPercentagesOfPLanguages();
      })).subscribe((data: PassPercentages) => {
        this.initPassPercentages(data);

        this.visualizePassPercentages();
      });
    this.subscriptions.push(subscription);
  }*/

  private initData(): void {
    console.log("init");
    this.passData = [];
    const subscription: Subscription = this.pLanguageService.findAll()
      .pipe(switchMap((pLanguages: Planguage[]) => {
        this.pLanguages = pLanguages;
        return this.analyticsService.getPassPercentagesOfPLanguages();
      })).subscribe((data: PassPercentages) => {
        this.initPassData();
      });
    this.subscriptions.push(subscription);
  }


  private visualizePassPercentages(): void {
    for (const language of this.pLanguages) {
      const percentage = this.pLanguagePassPercentageMap.get(language.id!);
      // @ts-ignore
      document.getElementById(`${language.language.concat('percentageId')}`)!.style.width = `${percentage}%`;
      document.getElementById(`${language.language.concat('percentageId')}`)!.style.backgroundColor = `${language.color}`;
      // @ts-ignore
      document.getElementById(`${language.language.concat('percentageElement')}`).className = "visible";
    }
  }

  private initPassPercentages(percentages: PassPercentages): void {
    for (let i = 0; i < percentages.planguages.length; i++) {
      const languageId = percentages.planguages[i].id;
      const percentagePass = percentages.percentages[i];
      this.pLanguagePassPercentageMap.set(languageId!, Math.round(percentagePass * 100));
    }
  }

  private initPassData() {
    for(const pLanguage of this.pLanguages) {
      this.initPassDataForLanguage(pLanguage.id!);
      console.log(this.chartData);
    }
  }

  private initPassDataForLanguage(id: number): void {
    this.analyticsService.getPassDataForLanguage(id).pipe().subscribe((data: PassData) => {
      //this.passData.push(data);
      this.passDataToChartData(data);
    });
  }

  private passDataToChartData(passData: PassData) {
    const data = {
      "name"
    :
      passData.languageName,
        "series"
    :
      [
        {
          "name": "passed",
          "value": passData.passed
        },
        {
          "name": "failed",
          "value": passData.failed
        }
      ]
    }
    this.chartData.push(data);
  }
}
