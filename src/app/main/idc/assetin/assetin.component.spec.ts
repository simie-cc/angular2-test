import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetinComponent } from './assetin.component';

describe('AssetinComponent', () => {
  let component: AssetinComponent;
  let fixture: ComponentFixture<AssetinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
