import {Router, RouterModule, Routes} from "@angular/router";
import {DummyComponentComponent} from "./dummy-component/dummy-component.component";
import {NgModule} from "@angular/core";
import {LandingPageComponent} from "./landing-page/landing-page.component";

const routes: Routes = [
  {path: '', component: LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
