import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdapMenuComponent } from './ldap-menu.component';

describe('LdapMenuComponent', () => {
  let component: LdapMenuComponent;
  let fixture: ComponentFixture<LdapMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdapMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdapMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
