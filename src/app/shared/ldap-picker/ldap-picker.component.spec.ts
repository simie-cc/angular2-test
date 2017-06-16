import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdapPickerComponent } from './ldap-picker.component';

describe('LdapPickerComponent', () => {
  let component: LdapPickerComponent;
  let fixture: ComponentFixture<LdapPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdapPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdapPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
