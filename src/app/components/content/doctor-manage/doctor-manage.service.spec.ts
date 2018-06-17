import { TestBed, inject } from '@angular/core/testing';

import { DoctorManageService } from './doctor-manage.service';

describe('DoctorManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoctorManageService]
    });
  });

  it('should be created', inject([DoctorManageService], (service: DoctorManageService) => {
    expect(service).toBeTruthy();
  }));
});
