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
  submitted: boolean = false;
  file!: File;
  private numberOfTabs: number = 4;

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

    this.fireParseRequest(this.file);
  }

  private fireParseRequest(hackerrankJsonFile: File) {
    this.wait = true;
    const subscription: Subscription = this.hackerrankJsonService.fireHackerrankParsing(hackerrankJsonFile).pipe().subscribe((response: string) => {
      this.datafound = true;
      GlobalVariables.isUploaded = true;
      this.wait = false;
    });
    this.subscriptions.push(subscription);
  }

  private checkIsUploadedAlready(): void {
    const subscription: Subscription = this.analyticsService.checkUploadsExist()
      .pipe().subscribe((data: boolean) => {
        this.datafound = data;
        this.wait = false;
        console.log(this.wait);
        console.log(this.datafound);
      })
    this.subscriptions.push(subscription);
  }

  public activateTab(id: number): void {
    for(let i = 0; i < this.numberOfTabs; i++) {
      // @ts-ignore
      document.getElementById(`tab-${i}`).className = "tab-pane";
      // @ts-ignore
      document.getElementById(`tab-header-${i}`).className = "nav-link";
    }
    // @ts-ignore
    document.getElementById(`tab-${id}`).className = "tab-pane active";
    // @ts-ignore
    document.getElementById(`tab-header-${id}`).className = "nav-link active";
  }
}
