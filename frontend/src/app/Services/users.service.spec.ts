import { TestBed } from '@angular/core/testing';

import { UserCardService } from './users.service';

describe('UserCardService', () => {
  let service: UserCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
