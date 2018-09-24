import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAdPage } from './post-ad.page';

describe('PostAdPage', () => {
  let component: PostAdPage;
  let fixture: ComponentFixture<PostAdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostAdPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
