/**
 * 常用日期相关工具函数
 */

/**
 * @param dateStr 字符串格式为 2017-02-10 18:20:30
 * 注意：此处月、日、时分秒、必须为2位数字，否则报错
 * @returns 时间戳
 */
 export function getTimestamp(dateStr: string): number {
    return Date.parse(new Date(dateStr).toString())
  }
  
  /**
   * @param date Date类型 new Date()
   * @param fmt 格式化类型 yyyy-MM-dd hh:mm:ss
   * @returns 时间字符串 2022-03-29 17:22:30
   */
  export function format(date: Date, fmt: string): string {
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          // eslint-disable-next-line
          // @ts-ignore
          RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  }
  
  /**
   * 转换音视频时长，把秒数转换为：HH:MM:SS格式
   * @param duration 音视频时长：120
   * @returns 时间字符串：02:00
   */
  export function makeDuration(duration: number): string {
    const h =
      Math.floor(duration / 3600) < 10
        ? '0' + Math.floor(duration / 3600)
        : Math.floor(duration / 3600)
    const m =
      Math.floor((duration / 60) % 60) < 10
        ? '0' + Math.floor((duration / 60) % 60)
        : Math.floor((duration / 60) % 60)
    const s =
      Math.floor(duration % 60) < 10 ? '0' + Math.floor(duration % 60) : Math.floor(duration % 60)
    let res = ''
    if (h > 0) {
      res += h + ':'
    }
    if (m > 0) {
      res += m + ':'
    } else {
      res += '00:'
    }
    if (s > 0) {
      res += s
    } else {
      res += '00'
    }
    return res
  }
  
  /**
   * 转换时间字符串为大致时间描述
   * @param date 日期：2022-03-29 09:08:11
   * @returns 时间字符串：1个月前
   */
  export function makeChTime(date: string): string {
    const inDate = new Date() //存放传入时间
    const curDate = new Date() //取得当前时间
    const yearAndTime = date.split(' ') //根据空格组成数组
    const fullYear = yearAndTime[0].split('-') //根据'-'组成数组
    const time = yearAndTime[1].split(':') //根据':'组成数组
    time[2] = time[2].split('.')[0] //修正正确的秒
    inDate.setFullYear(Number(fullYear[0]), Number(fullYear[1]) - 1, Number(fullYear[2])) //设置传入时间的年月日
    inDate.setHours(Number(time[0]), Number(time[1]), Number(time[2])) //设置传入时间的时分秒
    let str = '' //用于存放返回的字符串
    inDate.setMilliseconds(0) //设置传入时间的毫秒为0
    curDate.setMilliseconds(0) //设置当前时间的毫秒为0
    const YEAR1 = 1000 * 60 * 60 * 24 * 365 //定义一年
    const YEAR2 = 1000 * 60 * 60 * 24 * 365 * 2 //定义两年
    const DAY = 1000 * 60 * 60 * 24 //定义一天
    const HOUR = 1000 * 60 * 60 //定义一个小时
    const MIN = 1000 * 60 //定义1分钟
    const diff = Number(curDate) - Number(inDate) //取得当前时间与传入时间的时间差
    if (diff - YEAR2 >= 0) {
      //判断是否是两年以上
      str += inDate.getFullYear() + '年'
      str += inDate.getMonth() + 1 + '月' + inDate.getDate() + '日'
    } else {
      if (diff - YEAR1 >= 0) {
        //判断是否是1年以上
        str += '1年前'
      } else {
        let subdaynum = -1
        let workmonthnum = 0
        for (let i = inDate.getTime(); i <= curDate.getTime(); i = i + DAY) {
          const days = new Date(i)
          subdaynum++
          if (days.getDate() == 1) {
            workmonthnum++ //记录当前时间与传入时间相差几个月
          }
        }
        if (subdaynum >= 31) {
          //相差天数是否大于31天
          str += workmonthnum + '个月前'
        } else {
          if (subdaynum >= 1) {
            //相差天数是否大于1天
            str += subdaynum + '天前'
          } else {
            const h = parseInt(diff / HOUR + '')
            if (h >= 1) {
              //相差时间是否大于1小时
              if (curDate.getDate() - inDate.getDate() == 1 && h > 12) {
                //是否跨日期相差超过12小时
                str += '1天前'
              } else {
                str += h + '小时前'
              }
            } else {
              const m = parseInt(diff / MIN + '')
              if (m >= 1) {
                //是否相差超过1分钟
                str += m + '分钟前'
              } else {
                str += '刚刚'
              }
            }
          }
        }
      }
    }
    return str
  }
  
  /**
   * 转换数字为 大致数字描述
   * @param value 数字：1001
   * @returns 时间字符串：1千
   */
  export function makeChNumber(value: number): string {
    const newValue = ['', '', '']
    let fr = 1000
    let num = 3
    let text1 = ''
    let fm = 1
    while (value / fr >= 1) {
      fr *= 10
      num += 1
    }
    if (num <= 4) {
      // 千
      newValue[0] = parseInt(value / 1000 + '') + ''
      newValue[1] = '千'
    } else if (num <= 8) {
      // 万
      text1 = parseInt(num - 4 + '') / 3 > 1 ? '千万' : '万'
      fm = text1 === '万' ? 10000 : 10000000
      if (value % fm === 0) {
        newValue[0] = parseInt(value / fm + '') + ''
      } else {
        newValue[0] = parseFloat(value / fm + '').toFixed(1) + ''
      }
      newValue[1] = text1
    } else if (num <= 16) {
      // 亿
      text1 = (num - 8) / 3 > 1 ? '千亿' : '亿'
      text1 = (num - 8) / 4 > 1 ? '万亿' : text1
      text1 = (num - 8) / 7 > 1 ? '千万亿' : text1
      fm = 1
      if (text1 === '亿') {
        fm = 100000000
      } else if (text1 === '千亿') {
        fm = 100000000000
      } else if (text1 === '万亿') {
        fm = 1000000000000
      } else if (text1 === '千万亿') {
        fm = 1000000000000000
      }
      if (value % fm === 0) {
        newValue[0] = parseInt(value / fm + '') + ''
      } else {
        newValue[0] = parseFloat(value / fm + '').toFixed(2) + ''
      }
      newValue[1] = text1
    }
    if (value < 1000) {
      newValue[0] = value + ''
      newValue[1] = ''
    }
    return newValue.join('')
  }
  