import { dateFormat } from '../src/utils/index';

describe('dateFormat', () => {
  it('dateFormat("2020-08-24T14:54:02.589Z")', () => {
    expect(dateFormat('2020-08-24T14:54:02.589Z')).toBe('2020-08-24')
  })
  it('dateFormat("2020-08-24T14:54:02.589Z", "MMMM D, YYYY")', () => {
    expect(dateFormat('2020-08-24T14:54:02.589Z', 'MMMM D, YYYY')).toBe('August 24, 2020')
  })
})
