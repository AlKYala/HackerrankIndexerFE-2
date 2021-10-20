import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralstatsComponent } from './generalstats.component';

describe('GeneralstatsComponent', () => {
  let component: GeneralstatsComponent;
  let fixture: ComponentFixture<GeneralstatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralstatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
