import { Component, OnInit } from '@angular/core';
import {SubscriptionService} from "../../shared/services/SubscriptionService";
import {AnalyticsService} from "../../shared/services/AnalyticsService";
import {HackerrrankJSONService} from "../../shared/datamodels/HackerrankJSON/service/HackerrrankJSONService";
import {Subscription} from "rxjs";

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

  public loadJsFile(url: string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    console.log(node);
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  public loadCSSFile(url: string) {
    let node = document.createElement('link');
    node.href = url;
    node.rel='stylesheet';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
