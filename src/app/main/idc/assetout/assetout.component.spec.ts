import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetoutComponent } from './assetout.component';

describe('AssetoutComponent', () => {
  let component: AssetoutComponent;
  let fixture: ComponentFixture<AssetoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
