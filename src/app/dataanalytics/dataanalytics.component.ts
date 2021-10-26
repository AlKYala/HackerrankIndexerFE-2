import { Component, OnInit } from '@angular/core';
import {SubscriptionService} from "../../shared/services/SubscriptionService";
import {AnalyticsService} from "../../shared/services/AnalyticsService";
import {HackerrrankJSONService} from "../../shared/datamodels/HackerrankJSON/service/HackerrrankJSONService";
import {Subscription} from "rxjs";
import {GlobalVariables} from "../../shared/GlobalVariables";

@Component({
  selector: 'app-dataanalytics',
  templateUrl: './dataanalytics.component.html',
  styleUrls: ['./dataanalytics.component.css']
})
export class DataanalyticsComponent implements OnInit {
  private subscriptions!: Subscription[];

  datafound: boolean = false; //
  wait: boolean = true; //wait for the data to load
  submitted: boolean = false; //unused - used in old form!
  loading: boolean = false;
  file!: File;
  private numberOfTabs: number = 4;
  selectedTab = 1;

  constructor(private subscriptionService: SubscriptionService,
              private analyticsService: AnalyticsService,
              private hackerrankJsonService: HackerrrankJSONService) { }

  ngOnInit(): void {
    this.subscriptions = [];
    this.checkIsUploadedAlready();
  }

  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeParam(this.subscriptions);
  }

  public onChange(event: any): void {
    const file: File = event.target.files[0];
    this.file = file;
    this.fireUpload();
  }

  public fireUpload(): void {
    this.submitted = true;
    this.loading = true;
    this.fireParseRequest(this.file);
  }

  private fireParseRequest(hackerrankJsonFile: File) {
    this.wait = true;
    const subscription: Subscription = this.hackerrankJsonService.fireHackerrankParsing(hackerrankJsonFile).pipe().subscribe((response: string) => {
      this.datafound = true;
      GlobalVariables.isUploaded = true;
      this.wait = false;
      this.loading = false;
      this.enableDataTabs();
      this.loadAnalyticsDataTab();
    });
    this.subscriptions.push(subscription);
  }

  private checkIsUploadedAlready(): void {
    const subscription: Subscription = this.analyticsService.checkUploadsExist()
      .pipe().subscribe((data: boolean) => {
        this.datafound = data;
        this.loadView(data);
        this.wait = false;
        console.log(data);
      })
    this.subscriptions.push(subscription);
  }

  private loadView(isUploaded: boolean) {
    if(!isUploaded) {
      console.log("no")
      this.disableDataTabs();
      return;
    }
    this.enableDataTabs();
    this.loadAnalyticsDataTab();
  }

  //method to disable
  public disableDataTabs(): void {
    this.activateTab(0);
    for(let i = 0; i < this.numberOfTabs; i++) {
      // @ts-ignore
      document.getElementById(`tab-header-${i}`).className = "nav-link disabled";
    }
  }

  public enableDataTabs(): void {
    for(let i = 0; i < this.numberOfTabs; i++) {
      // @ts-ignore
      document.getElementById(`tab-header-${i}`).className = "nav-link";
    }
  }

  private loadAnalyticsDataTab(): void {
    this.activateTab(1);
  }

  public activateTab(id: number): void {
    for(let i = 0; i < this.numberOfTabs; i++) {
      // @ts-ignore
      document.getElementById(`tab-${i}`).className = "tab-pane";
      // @ts-ignore
      document.getElementById(`tab-header-${i}`).className = "nav-link";
    }
    this.selectedTab = id;
    // @ts-ignore
    document.getElementById(`tab-${id}`).className = "tab-pane active";
    // @ts-ignore
    document.getElementById(`tab-header-${id}`).className = "nav-link active";
  }
}
