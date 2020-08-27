import dayjs from 'dayjs'

/**
 * @param {string} value - 日期
 * @param {string} [fromat="YYYY-MM-DD"] - 日期格式
 * @return {string} 格式化后的日期
 */
export const dateFormat = (value: string, fromat = 'YYYY-MM-DD') => {
  return dayjs(value).format(fromat)
}
