import { TestBed } from '@angular/core/testing';

import { ConsulTeamPresedentService } from './consul-team-presedent.service';

describe('ConsulTeamPresedentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsulTeamPresedentService = TestBed.get(ConsulTeamPresedentService);
    expect(service).toBeTruthy();
  });
});
