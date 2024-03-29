import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DummyComponentComponent } from './dummy-component/dummy-component.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app.routing-module";
import {ChartsModule} from "ng2-charts";
import { FrontPageHeaderComponent } from './front-page-header/front-page-header.component';
import { PresentfeatureComponentComponent } from './presentfeature-component/presentfeature-component.component';
import { TutorialVideoComponent } from './tutorial-video/tutorial-video.component';
import { DataanalyticsComponent } from './dataanalytics/dataanalytics.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {HttpClientModule} from "@angular/common/http";
import { GeneralstatsComponent } from './generalstats/generalstats.component';
import { ChartComponent } from './chart/chart.component';
import { LanguagepercentagesComponent } from './languagepercentages/languagepercentages.component';
import { SubmissionlistComponent } from './submissionlist/submissionlist.component';
import {JwPaginationModule} from "jw-angular-pagination";
import {AnalyticsInsightComponent} from "./analytics-insight/analytics-insight.component";
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { SubmissionDetailComponent } from './submission-detail/submission-detail.component';
import {HIGHLIGHT_OPTIONS, HighlightModule, HighlightOptions} from "ngx-highlightjs";
import { CodeblockcomponentComponent } from './codeblockcomponent/codeblockcomponent.component';
import { SubmissionfilterComponent } from './submissionfilter/submissionfilter.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    DummyComponentComponent,
    FrontPageHeaderComponent,
    PresentfeatureComponentComponent,
    TutorialVideoComponent,
    DataanalyticsComponent,
    LandingPageComponent,
    GeneralstatsComponent,
    ChartComponent,
    LanguagepercentagesComponent,
    SubmissionlistComponent,
    AnalyticsInsightComponent,
    LoadingScreenComponent,
    SubmissionDetailComponent,
    CodeblockcomponentComponent,
    SubmissionfilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ChartsModule,
    HttpClientModule,
    JwPaginationModule,
    HighlightModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [    {
    provide: HIGHLIGHT_OPTIONS,
    useValue: <HighlightOptions>{
      fullLibraryLoader: () => import('highlight.js'),
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
