import { TestBed } from '@angular/core/testing';

import { CountryResolver } from './country.resolver';

describe('CountryResolver', () => {
  let resolver: CountryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CountryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
