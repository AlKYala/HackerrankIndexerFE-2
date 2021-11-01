import {Component, Input, OnInit} from '@angular/core';
import {Submission} from "../../shared/datamodels/Submission/model/Submission";
import {SubscriptionService} from "../../shared/services/SubscriptionService";
import {SubmissionService} from "../../shared/datamodels/Submission/service/SubmissionService";
import {SubmissionDataService} from "../../shared/services/SubmissionDataService";
import {ActivatedRoute, Router} from "@angular/router";
import {SubmissionDownloadService} from "../../shared/services/SubmissionDownloadService";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-submission-detail',
  templateUrl: './submission-detail.component.html',
  styleUrls: ['./submission-detail.component.scss']
})
export class SubmissionDetailComponent implements OnInit {


  submission!: Submission;
  private subscriptions!: Subscription[];
  public loaded: boolean = false;
  submissionCode!: string;
  scoreInPercent!: number;

  constructor(private subscriptionService: SubscriptionService,
              private submissionService: SubmissionService,
              private submissionDataService: SubmissionDataService,
              private route: ActivatedRoute,
              private router: Router,
              private submissionDownloadService: SubmissionDownloadService) {
  }

  //TODO wenn die SubmissionID 0 ist dann fehlerfeld - keine Submission hat ID 0!

  ngOnInit(): void {
    this.subscriptions = [];
    const id:number = this.resolveSubmissionId();
    this.fetchSubmission(id);
  }

  ngOnDestroy() {
    this.subscriptionService.unsubscribeParam(this.subscriptions);
  }

  private resolveSubmissionId(): number {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if(typeof id === "string") {
      return parseInt(id);
    }
    return -1;
  }

  private fetchSubmission(submissionId: number) {
    this.submissionService.findById(submissionId).pipe().subscribe((submission: Submission) => {
      if(submission.id == 0) {
        this.routeToHomepage();
      }
      this.submission = submission;
      console.log(submission);
      this.submissionCode = submission.code;
      this.resolvePercentage(submission);
      this.loaded = true;
      this.adjustPercentage();
    });
  }

  public generateAndDownloadSubmission() {
    this.submissionDownloadService.generateAndDownloadSubmission(this.submission);
  }

  public routeToLanguage(event: Event): void {
    event.preventDefault();
    this.router.navigate([`/language/${this.submission.language.id}/submissions`]);
  }

  public routeToChallenge(event: Event): void {
    event.preventDefault();
    this.router.navigate([`/challenge/${this.submission.challenge.id}/submissions`]);
  }

  private routeToHomepage() {
    this.router.navigate([`/home`]);
  }

  private resolvePercentage(submission: Submission) {
    console.log(submission.score);
    const precision: number = (submission.score >= 0.1) ? 2 : 1;
    this.scoreInPercent = parseInt((submission.score * 100).toPrecision(precision));
  }

  private adjustPercentage(): void {
    console.log(document.getElementById("progress"));
    if(document.getElementById("progress") != null) {
      // @ts-ignore
      document.getElementById("progress").style.width = `${this.scoreInPercent}%`;
    }
  }
}
