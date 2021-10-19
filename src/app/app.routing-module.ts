import {Router, RouterModule, Routes} from "@angular/router";
import {DummyComponentComponent} from "./dummy-component/dummy-component.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {path: '', component: DummyComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
