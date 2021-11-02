import {Component, Input, OnInit} from '@angular/core';
import {Event} from "@angular/router";
// @ts-ignore
declare const hljs;

@Component({
  selector: 'app-codeblockcomponent',
  templateUrl: './codeblockcomponent.component.html',
  styleUrls: ['./codeblockcomponent.component.scss']
})
export class CodeblockcomponentComponent implements OnInit {

  @Input()
  code!: string;

  constructor() { }

  ngOnInit(): void {
  }

  onHighlight(event: any, x: any) {
    hljs.lineNumbersBlock(x);
  }
}
