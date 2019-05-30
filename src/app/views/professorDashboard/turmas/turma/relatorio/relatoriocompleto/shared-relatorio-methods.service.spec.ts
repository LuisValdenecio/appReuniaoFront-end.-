import { TestBed } from '@angular/core/testing';

import { SharedRelatorioMethodsService } from './shared-relatorio-methods.service';

describe('SharedRelatorioMethodsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedRelatorioMethodsService = TestBed.get(SharedRelatorioMethodsService);
    expect(service).toBeTruthy();
  });
});
