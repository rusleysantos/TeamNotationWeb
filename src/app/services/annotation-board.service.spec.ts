import { TestBed } from '@angular/core/testing';

import { AnnotationBoardService } from './annotation-board.service';

describe('AnnotationBoardService', () => {
  let service: AnnotationBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnotationBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
