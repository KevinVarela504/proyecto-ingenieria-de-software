import { TestBed } from '@angular/core/testing';

import { ScheduledEventService } from './scheduled-event.service';

describe('ScheduledEventService', () => {
  let service: ScheduledEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduledEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
