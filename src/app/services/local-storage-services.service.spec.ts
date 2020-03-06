import { TestBed } from '@angular/core/testing';

import { LocalStorageServicesService } from './local-storage-services.service';

describe('LocalStorageServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalStorageServicesService = TestBed.get(LocalStorageServicesService);
    expect(service).toBeTruthy();
  });
});
