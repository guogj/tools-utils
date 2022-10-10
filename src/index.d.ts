declare namespace toolsUtils {
    /**
     * 生成数字范围内的随机数
     * @param min 最小数字
     * @param max 最大数字
     * @returns number类型
     */
    export function random(min: number, max: number): number
  }
  
  declare module 'tools-utils' {
    export = toolsUtils
  }