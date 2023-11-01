export type Nullable<T> = T | null;
export type Awaitable<T> = Promise<T> | T;
export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
export type ObjectTypes<T = any> = { [key: string | number]: T };
export type ContainFunction<T extends (...args: any[]) => any> = T | ReturnType<T>;
export type Fun<T> = (...args: any[]) => T;
