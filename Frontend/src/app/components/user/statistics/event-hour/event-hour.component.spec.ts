import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventHourComponent } from './event-hour.component';

describe('EventHourComponent', () => {
  let component: EventHourComponent;
  let fixture: ComponentFixture<EventHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventHourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
