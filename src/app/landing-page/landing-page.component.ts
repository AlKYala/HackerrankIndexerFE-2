import { Component, OnInit } from '@angular/core';
import {NodeLoaderUtil} from "../../shared/Utils/NodeLoaderUtil";
import {GlobalVariables} from "../../shared/GlobalVariables";
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  get isUploaded(): boolean {
    return GlobalVariables.isUploaded;
  }
}
