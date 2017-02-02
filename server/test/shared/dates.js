import { expect } from 'chai';
import { chunkDates } from '../../src/shared/dates';

describe('dates', () => {
  describe('chunkDates', () => {
    it('should chunk dates by weeks for a given start date', () => {
      let startDate = '2/1/2017';

      let expected = [
        { start: '2/1/2017', end: '2/5/2017' },
        { start: '2/6/2017', end: '2/12/2017' },
        { start: '2/13/2017', end: '2/19/2017' },
        { start: '2/20/2017', end: '2/26/2017' }
      ];

      let result = chunkDates(startDate, 4, 1);

      expect(result).to.deep.equal(expected);
    });
  });
});
