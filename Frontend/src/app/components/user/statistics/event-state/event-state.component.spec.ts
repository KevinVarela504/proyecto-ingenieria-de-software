import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStateComponent } from './event-state.component';

describe('EventStateComponent', () => {
  let component: EventStateComponent;
  let fixture: ComponentFixture<EventStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
