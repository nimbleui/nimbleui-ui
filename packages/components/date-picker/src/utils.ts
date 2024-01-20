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

// export function formatDate(date: Date) {}
