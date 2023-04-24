export const isBrowser = typeof document !== "undefined" && typeof window !== "undefined";

// canvas合成海报，解决画布模糊的问题
export function getRatio(context: any): number {
  if (!context) {
    return 1;
  }
  // 获取画布的宽高比
  const backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;
  return (window.devicePixelRatio || 1) / backingStore;
}
