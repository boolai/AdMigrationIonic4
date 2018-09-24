import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdPage } from './edit-ad.page';

describe('EditAdPage', () => {
  let component: EditAdPage;
  let fixture: ComponentFixture<EditAdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
