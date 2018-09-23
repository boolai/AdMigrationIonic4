import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationPage } from './authorization.page';

describe('AuthorizationPage', () => {
  let component: AuthorizationPage;
  let fixture: ComponentFixture<AuthorizationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
