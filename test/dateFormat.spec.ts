import { dateFormat } from '../src/utils/index';

describe('dateFormat', () => {
  test('dateFormat("2020-08-24T14:54:02.589Z")', () => {
    expect(dateFormat('2020-08-24T14:54:02.589Z')).toBe('2020-08-24')
  })
  test('dateFormat("2020-08-24T14:54:02.589Z", "MMMM D, YYYY")', () => {
    expect(dateFormat('2020-08-24T14:54:02.589Z', 'MMMM D, YYYY')).toBe('August 24, 2020')
  })
})
