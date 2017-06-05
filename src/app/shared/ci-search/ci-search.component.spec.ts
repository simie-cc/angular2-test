import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiSearchComponent } from './ci-search.component';

describe('CiSearchComponent', () => {
  let component: CiSearchComponent;
  let fixture: ComponentFixture<CiSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
