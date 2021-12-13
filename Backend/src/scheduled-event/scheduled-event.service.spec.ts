import { Test, TestingModule } from '@nestjs/testing';
import { ScheduledEventService } from './scheduled-event.service';

describe('ScheduledEventService', () => {
  let service: ScheduledEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduledEventService],
    }).compile();

    service = module.get<ScheduledEventService>(ScheduledEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
