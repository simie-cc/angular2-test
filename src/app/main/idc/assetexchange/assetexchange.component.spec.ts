import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetexchangeComponent } from './assetexchange.component';

describe('AssetexchangeComponent', () => {
  let component: AssetexchangeComponent;
  let fixture: ComponentFixture<AssetexchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetexchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetexchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
