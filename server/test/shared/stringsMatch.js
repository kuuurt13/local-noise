import { expect } from 'chai';
import stringsMatch from '../../src/shared/stringsMatch';

describe('stringsMatch', () => {
  it('should assert if strings exactly match', () => {
    let a = 'The National';
    let b = 'The National';

    let result = stringsMatch(a, b);

    expect(result).to.be.true;
  });

  it('should assert if strings match within a distance of 0.95', () => {
    let a = 'Blink-182';
    let b = 'Blink182';

    let result = stringsMatch(a, b);

    expect(result).to.be.true;
  });

  it('should assert if strings don\'t match', () => {
    let a = 'The National';
    let b = 'National';

    let result = stringsMatch(a, b);

    expect(result).to.be.false;
  });

  it('should respect wild cards', () => {
    let a = 'Adam and Eve';
    let b = 'Adam & Eve';

    let result = stringsMatch(a, b);

    expect(result).to.be.true;
  });
});
