import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsListPage } from './ads-list.page';

describe('AdsListPage', () => {
  let component: AdsListPage;
  let fixture: ComponentFixture<AdsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
