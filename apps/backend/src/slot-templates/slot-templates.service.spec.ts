import { Test, TestingModule } from '@nestjs/testing';
import { SlotTemplatesService } from './slot-templates.service';

describe('SlotTemplatesService', () => {
  let service: SlotTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlotTemplatesService],
    }).compile();

    service = module.get<SlotTemplatesService>(SlotTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
