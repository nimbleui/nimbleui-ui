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
  if (!date) return;

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
export const REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;

interface ConfigParseDate {
  utc?: boolean;
  format?: string;
}
export const parseDate = (date: string | Date | number | undefined, config: ConfigParseDate = {}) => {
  const { utc, format } = config;

  if (date === null) return new Date(NaN);
  if (date === undefined) return new Date();
  if (date instanceof Date) return new Date(date);

  if (format && typeof date === "string") {
    console.log(111);
  }
  if (typeof date === "string" && !/Z$/i.test(date)) {
    const d = date.match(REGEX_PARSE);
    if (d) {
      const y = +d[1];
      const m = +d[2] - 1 || 0;
      const D = +(d[3] || 1);
      const H = +(d[4] || 0);
      const M = +(d[5] || 0);
      const S = +(d[6] || 0);
      const ms = +(d[7] || "0").substring(0, 3);
      if (utc) {
        return new Date(Date.UTC(y, m, D, H, M, S, ms));
      }
      return new Date(y, m, D, H, M, S, ms);
    }
  }

  return new Date(date);
};

export function getDateInfo(date: Date) {
  return {
    Y: date.getFullYear(),
    M: date.getMonth(),
    D: date.getDate(),
    W: date.getDay(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    ms: date.getMilliseconds(),
  };
}

export function calculateDate(
  date: string | Date | number,
  type: "year" | "month" | "day" | "hour" | "minute",
  num: number
) {
  const d = parseDate(date);
  const { Y, M, D, h, m } = getDateInfo(d);

  switch (type) {
    case "year":
      d.setFullYear(Y + num);
      break;
    case "month":
      d.setMonth(M + num);
      break;
    case "day":
      d.setDate(D + num);
      break;
    case "hour":
      d.setHours(h + num);
      break;
    case "minute":
      d.setMinutes(m + num);
      break;
  }

  return d;
}

export function equalityDate(date: Date | undefined, date2: Date | undefined, type: "year" | "month" | "day") {
  if (!date || !date2) return false;

  const dateInfo = getDateInfo(date);
  const date2Info = getDateInfo(date2);
  switch (type) {
    case "year":
      return dateInfo.Y == date2Info.Y;
    case "month":
      return dateInfo.Y == date2Info.Y && dateInfo.M == date2Info.M;
    case "day":
      return dateInfo.Y == date2Info.Y && dateInfo.M == date2Info.M && dateInfo.D == date2Info.D;
  }
}

export function sectionDate(date: Date, ...args: (Date | undefined)[]) {
  if (!args[0] || !args[1]) return false;
  const maxTime = args[0].setHours(0, 0, 0, 0);
  const minTime = args[1].setHours(0, 0, 0, 0);

  const min = maxTime > minTime ? minTime : maxTime;
  const max = maxTime < minTime ? minTime : maxTime;

  return min <= date.getTime() && max >= date.getTime();
}
