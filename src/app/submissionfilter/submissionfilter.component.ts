import { Component, OnInit } from '@angular/core';
import {Planguage} from "../../shared/datamodels/PLanguage/model/PLanguage";
import {PLanguageService} from "../../shared/datamodels/PLanguage/service/PLanguageService";
import {Subscription} from "rxjs";
import {Data} from "@angular/router";

@Component({
  selector: 'app-submissionfilter',
  templateUrl: './submissionfilter.component.html',
  styleUrls: ['./submissionfilter.component.css']
})
export class SubmissionfilterComponent implements OnInit {

  failedSubmissions: boolean = true;
  passedSubmissions: boolean = true;
  latestPassedSubmissions: boolean = false;
  languages!: Planguage[];

  loaded: boolean = false;
  constructor(private pLangaugeService: PLanguageService) { }

  ngOnInit(): void {
    this.initPLangauges();
  }

  private initPLangauges(): void {
    const subscription: Subscription = this.pLangaugeService.findAll().pipe().subscribe((data: Planguage[]) => {
      this.languages = data;
      this.loaded = true;
    })
  }

  public toggleLatestPassedSubmissions(): void {
    if(!this.latestPassedSubmissions) {
      this.failedSubmissions = false;
      this.passedSubmissions = false;
      this.latestPassedSubmissions = true;
      return;
    }
    this.deactivateLatestPassedSubmissions();
  }

  public deactivateLatestPassedSubmissions(): void {
    this.failedSubmissions = false;
  }
}
