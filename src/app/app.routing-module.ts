import {Router, RouterModule, Routes} from "@angular/router";
import {DummyComponentComponent} from "./dummy-component/dummy-component.component";
import {NgModule} from "@angular/core";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {SubmissionDetailComponent} from "./submission-detail/submission-detail.component";

const routes: Routes = [
  {path: 'submission/:id', component: SubmissionDetailComponent},
  {path: '', component: LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
