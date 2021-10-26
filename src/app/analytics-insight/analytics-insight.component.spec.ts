import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsInsightComponent } from './analytics-insight.component';

describe('AnalyticsInsightComponent', () => {
  let component: AnalyticsInsightComponent;
  let fixture: ComponentFixture<AnalyticsInsightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsInsightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
