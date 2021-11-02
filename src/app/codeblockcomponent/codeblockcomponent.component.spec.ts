import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeblockcomponentComponent } from './codeblockcomponent.component';

describe('CodeblockcomponentComponent', () => {
  let component: CodeblockcomponentComponent;
  let fixture: ComponentFixture<CodeblockcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeblockcomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeblockcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
