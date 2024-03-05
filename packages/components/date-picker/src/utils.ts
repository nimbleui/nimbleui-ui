import { isDate, isNumber, isString } from "@nimble-ui/utils";
import type { DatePickerModelValue, DatePickerType } from "./types";

/**
 * 生成日期列表
 * @param date 当前时间
 */
export function getCalendar(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const startDate = new Date(year, month, 1);
  const day = startDate.getDay();
  if (day > 1) {
    const dates = new Date(year, month, 0);
    const start = dates.getDate() - day + 2;
    startDate.setMonth(month - 1, start);
  }

  const endDate = new Date(year, month, 1);
  endDate.setDate(42 - day + 1);

  const list: Date[] = [];
  while (startDate.getTime() <= endDate.getTime()) {
    list.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  return list;
}

function transitionModelValueString(value: string, type: DatePickerType) {
  let time = "";
  if (type.indexOf("time")) {
    const index = value.lastIndexOf(" ");
    time = value.substring(index);
    value = value.substring(0, index);
  }

  return value.replace(/[- ]/g, "/") + time;
}

/**
 * 把传入的值转成时间数组
 * @param type 类型
 * @param value 目标
 * @returns
 */
export function formatModelValue(type: DatePickerType, value?: DatePickerModelValue) {
  const isRange = type.indexOf("Range") > -1;
  const startDate = new Date();
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
  // 判断是否为空
  if (!value) return isRange ? [startDate, endDate] : [startDate];

  const formatValue: Array<string | number | Date> =
    isNumber(value) || isString(value) || isDate(value) ? [value] : value;

  const list = formatValue.map((v) => {
    if (isString(v)) {
      return new Date(transitionModelValueString(v, type));
    } else if (isNumber(v)) {
      return new Date(v);
    }
    return v;
  });

  if (isRange && list.length < 2) {
    const start = list[0];
    if (start) {
      list[1] = new Date(start.getFullYear(), start.getMonth() + 1, 1);
    } else {
      list.push(startDate, endDate);
    }
  }

  return list;
}

export function formatDate(date: Date, fmt = "yyyy-MM-dd") {
  const obj = {
    "y+": date.getFullYear(), // 年份
    "M+": date.getMonth() + 1, // 月
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };

  for (const k in obj) {
    const result = new RegExp(`(${k})`).exec(fmt)?.[1];
    const value = obj[k as keyof typeof obj] + "";
    const len = result?.length ?? 0;
    if (result) {
      fmt = fmt.replace(result, len == 1 ? value : value.padStart(len, "0"));
    }
  }

  return fmt;
}

const REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;
function toDate(date?: Date | string | number | null): Date {
  if (isDate(date)) return date;
  if (isNumber(date)) return new Date(date);

  if (isString(date)) {
    const d = date.match(REGEX_PARSE);
    if (d) {
      const m = d[2] || 0;
    }
  }

  return new Date();
}

export function moment(value?: Date | string | number | null) {
  const date = toDate(value);
}
