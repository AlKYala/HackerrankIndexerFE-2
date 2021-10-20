import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagepercentagesComponent } from './languagepercentages.component';

describe('LanguagepercentagesComponent', () => {
  let component: LanguagepercentagesComponent;
  let fixture: ComponentFixture<LanguagepercentagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguagepercentagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagepercentagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
