import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function debounce(fn: any, wait: number) {
  let timer: any;
  return (...args: any) => {
    // @ts-ignore
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(context, args);
    }, wait);
  };
}

export function throttle(fn: any, wait: number) {
  let inThrottle = false;
  return (...args: any) => {
    // @ts-ignore
    const context = this;
    if (!inThrottle) {
      inThrottle = true;
      fn.apply(context, args);
      setTimeout(() => {
        inThrottle = false;
      }, wait);
    }
  };
}
