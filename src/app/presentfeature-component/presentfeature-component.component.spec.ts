import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentfeatureComponentComponent } from './presentfeature-component.component';

describe('PresentfeatureComponentComponent', () => {
  let component: PresentfeatureComponentComponent;
  let fixture: ComponentFixture<PresentfeatureComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentfeatureComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentfeatureComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
