import { formatDuration, formatDate } from './time'

describe('duration', () => {
  it('is 01:00:00', () => {
    expect(formatDuration(3600)).toBe('01:00:00')
  })
  it('is 00:52', () => {
    expect(formatDuration(52)).toBe('00:52')
  })
  it('is 01:00:03', () => {
    expect(formatDuration(3603)).toBe('01:00:03')
  })
  it('is 01:59', () => {
    expect(formatDuration(119)).toBe('01:59')
  })
  it('is 10:20:30', () => {
    expect(formatDuration(10 * 3600 + 20 * 60 + 30)).toBe('10:20:30')
  })
  it('is 00:00', () => {
    expect(formatDuration(0)).toBe('00:00')
  })
})

describe('date', () => {
  it('is Invalid Date', () => {
    expect(formatDate('not a date')).toBe('Invalid Date')
  })
  it('is xxx.xx.xx', () => {
    expect(
      formatDate('Wed Sep 05 2018 18:53:16 GMT+0800 (中国标准时间)', '.')
    ).toBe('2018.09.05')
  })
  it('is xxx/xx/xx', () => {
    expect(
      formatDate('Wed Sep 05 2018 18:53:16 GMT+0800 (中国标准时间)', '/')
    ).toBe('2018/09/05')
  })
  it('is default format: xxx年xx月xx日', () => {
    expect(formatDate('Wed Sep 05 2018 18:53:16 GMT+0800 (中国标准时间)')).toBe(
      '2018年09月05日'
    )
  })
})
