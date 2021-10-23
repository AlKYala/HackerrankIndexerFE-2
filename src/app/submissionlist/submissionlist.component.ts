import {Component, Input, OnInit, EventEmitter} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SubmissionService} from "../../shared/datamodels/Submission/service/SubmissionService";
import {SubmissionDataService} from "../../shared/services/SubmissionDataService";
import {ActivatedRoute, Router} from "@angular/router";
import {PLanguageService} from "../../shared/datamodels/PLanguage/service/PLanguageService";
import {ChallengeService} from "../../shared/datamodels/Challenge/service/ChallengeService";
import {RequestService} from "../../shared/services/ServiceHandler/RequestService";
import {Submission} from "../../shared/datamodels/Submission/model/Submission";
import paginate from "jw-paginate";
import {RequestServiceEnum} from "../../shared/services/ServiceHandler/RequestServiceEnum";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-submissionlist',
  templateUrl: './submissionlist.component.html',
  styleUrls: ['./submissionlist.component.css']
})
export class SubmissionlistComponent implements OnInit {

  submissions: Submission[] = [];
  private subscriptions: Subscription[] = [];

  @Input()
  inputChallengeId: number | undefined;
  @Input()
  inputLanguageid: number | undefined;

  filteredByInput: boolean = false;

  private challengeId: number = -1;
  private pLanguageId: number = -1;
  //page: number = 1;
  //pageLimit: number = 16;

  pageOfItems!: Array<any>;
  pageSize = 3;
  changePage = new EventEmitter<any>(true);
  maxPages = 3;
  pager: any = paginate(this.submissions.length, 1, this.pageSize, this.maxPages);
  //TODO: Page settings dont work

  constructor(private httpClient: HttpClient,
              private submissionService: SubmissionService,
              private submissionDataService: SubmissionDataService,
              private route: ActivatedRoute,
              private pLanguageService: PLanguageService,
              private challengeService: ChallengeService,
              private router: Router,
              private requestService: RequestService) { }

  ngOnInit(): void {
    this.scanForFilter();
  }

  private scanForFilter() {
    const foundRouting: boolean = this.scanForRoutingParameters();
    if(foundRouting) {
      return;
    }
    const foundInput: boolean = this.scanForInputParameters();
    if(foundInput) {
      return;
    }
    this.getAllSubmissions();
  }

  /**
   * Returns true if filter fires
   * @private
   */
  private scanForInputParameters(): boolean {
    if(this.inputChallengeId != null && this.inputChallengeId > -1) {
      this.getSubmissionsByChallengeId(this.inputChallengeId);
      this.filteredByInput = true;
      return true;
    }
    if(this.inputLanguageid != null && this.inputLanguageid > -1) {
      this.filteredByInput = true;
      this.getSubmissionsByPLanguageId(this.inputLanguageid);
      return true;
    }
    return false;
  }

  /**
   * Returns true if filter fires
   * @private
   */
  private scanForRoutingParameters(): boolean {
    const challengeIdString = this.route.snapshot.paramMap.get('challengeId');
    const pLanguageIdString = this.route.snapshot.paramMap.get('pLanguageId');

    if(typeof challengeIdString == 'string') {
      const challengeId: number = parseInt(challengeIdString);
      this.getSubmissionsByChallengeId(challengeId);
      return true;
    }
    else if(typeof pLanguageIdString == 'string') {
      const pLanguageId: number = parseInt(pLanguageIdString);
      this.getSubmissionsByPLanguageId(pLanguageId);
      return true;
    }
    return false;
  }

  private getSubmissionsByChallengeId(challengeId: number) {
    const subscription: Subscription = this.challengeService.getSubmissionsByChallengeId(challengeId)
      .pipe().subscribe((submissions: Submission[]) => {
        this.submissions = submissions;
        this.setPage(1);
      })
    this.subscriptions.push(subscription);
  }

  private getSubmissionsByPLanguageId(pLanguageId: number) {
    const subscription: Subscription = this.pLanguageService.getSubmissionsByPLanguageId(pLanguageId)
      .pipe().subscribe((submissions: Submission[]) => {
        this.submissions = submissions;
      })
    this.subscriptions.push(subscription);
  }

  private getAllSubmissions() {
    const subscription : Subscription = this.submissionService.findAll().
    pipe().subscribe((submissions: Submission[]) => {
      this.submissions = submissions;
    });
    this.subscriptions.push(subscription);
  }

  private getAllSubmissionsRequest(): Observable<Submission[]> {
    //return this.httpClient.get(`${environment.api}/submission`) as Observable<Submission[]>;
    //TODO try this and check if works
    return this.requestService.anyRequest(RequestServiceEnum.GET, `${environment.api}/submission`) as Observable<Submission[]>;
  }

  public navigateToListingDetail(submission: Submission): void {
    this.submissionDataService.setSubmission(submission);
    this.router.navigate([`/submission/${submission.id}`]);
  }

  onChangePage(pageOfitems: Array<any>) {
    this.pageOfItems = pageOfitems;
    console.log(this.pager);
  }

  private setPage(page: number) {
    this.pager = paginate(this.submissions.length, page, this.pageSize, this.maxPages);
    //debug
    console.log(this.pager);
    var pageOfItems = this.submissions.slice(this.pager.startIndex, this.pager.endIndex +1);
    this.changePage.emit(pageOfItems);
  }
}
