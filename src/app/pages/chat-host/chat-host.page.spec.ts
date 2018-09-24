import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHostPage } from './chat-host.page';

describe('ChatHostPage', () => {
  let component: ChatHostPage;
  let fixture: ComponentFixture<ChatHostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatHostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatHostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
