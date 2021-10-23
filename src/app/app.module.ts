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
    SubmissionlistComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    JwPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
