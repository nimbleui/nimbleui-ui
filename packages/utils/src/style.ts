export const classNameToArray = (cls = "") => cls.split(" ").filter((item) => !!item.trim());

export const hasClass = (el: Element, cls: string): boolean => {
  if (!el || !cls) return false;
  if (cls.includes(" ")) throw new Error("className不应该包含空格。");
  return el.classList.contains(cls);
};

export const addClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) return;
  el.classList.add(...classNameToArray(cls));
};

export const removeClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) return;
  el.classList.remove(...classNameToArray(cls));
};
