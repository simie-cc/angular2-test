import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRectiveFormComponent } from './test-rective-form.component';

describe('TestRectiveFormComponent', () => {
  let component: TestRectiveFormComponent;
  let fixture: ComponentFixture<TestRectiveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestRectiveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRectiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
