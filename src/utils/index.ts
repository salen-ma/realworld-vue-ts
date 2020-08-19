import dayjs from 'dayjs'

export const dateFormat = (value: string, fromat = 'YYYY-MM-DD') => {
  return dayjs(value).format(fromat)
}
