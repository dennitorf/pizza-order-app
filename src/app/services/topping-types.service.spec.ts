import { TestBed } from '@angular/core/testing';

import { ToppingTypesService } from './topping-types.service';

describe('ToppingTypesService', () => {
  let service: ToppingTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToppingTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
