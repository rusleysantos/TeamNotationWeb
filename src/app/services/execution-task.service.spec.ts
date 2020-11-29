import { TestBed } from '@angular/core/testing';

import { ExecutionTaskService } from './execution-task.service';

describe('ExecutionTaskService', () => {
  let service: ExecutionTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecutionTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
