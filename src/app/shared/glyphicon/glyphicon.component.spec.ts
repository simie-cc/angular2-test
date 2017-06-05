import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlyphiconComponent } from './glyphicon.component';

describe('GlyphiconComponent', () => {
  let component: GlyphiconComponent;
  let fixture: ComponentFixture<GlyphiconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlyphiconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlyphiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
