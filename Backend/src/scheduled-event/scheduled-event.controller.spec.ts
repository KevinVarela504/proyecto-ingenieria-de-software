import { Test, TestingModule } from '@nestjs/testing';
import { ScheduledEventController } from './scheduled-event.controller';

describe('ScheduledEventController', () => {
  let controller: ScheduledEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduledEventController],
    }).compile();

    controller = module.get<ScheduledEventController>(ScheduledEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
