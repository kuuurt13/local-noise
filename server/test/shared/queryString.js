import { expect } from 'chai';
import queryString from '../../src/shared/queryString';

describe('queryString', () => {
  it('should take an object and turn it into query string', () => {
    let paramObject = {
      artist: 'Hella',
      page: 1
    };

    let expected = 'artist=Hella&page=1';

    let result = queryString(paramObject);

    expect(result).to.equal(expected);
  });

  it('should not be responsible for encoding query string', () => {
    let paramObject = {
      artist: 'David Bowie',
      page: 1
    };

    let expected = 'artist=David%Bowie&page=1';

    let result = queryString(paramObject);

    expect(result).to.not.equal(expected);
  });
});
