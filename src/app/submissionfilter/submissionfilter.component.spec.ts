import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionfilterComponent } from './submissionfilter.component';

describe('SubmissionfilterComponent', () => {
  let component: SubmissionfilterComponent;
  let fixture: ComponentFixture<SubmissionfilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionfilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
