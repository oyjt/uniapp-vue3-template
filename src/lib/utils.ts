import type { ClassValue } from 'clsx'
import { create } from '@weapp-tailwindcss/merge'
import { clsx } from 'clsx'

const { twMerge } = create(
  {
    // 在当前环境为只有小程序的环境的时候，需要转义，其他就禁止
    disableEscape: true,
  },
)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
