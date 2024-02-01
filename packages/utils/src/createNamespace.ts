import { isString } from "./type";

export class BEM {
  private block = "";
  constructor(name: string) {
    this.block = `y-${name}`;
  }
  b<T extends string>(name?: T, state = true) {
    return name ? (state ? `${this.block}-${name}` : undefined) : this.block;
  }

  e(element: string) {
    const e = `${this.block}__${element}`;
    return e;
  }

  m(modifier: string | string[], element?: string) {
    if (isString(modifier)) {
      modifier = [modifier];
    }

    return modifier.map((m) => {
      if (element) {
        return `${this.block}__${element}--${m}`;
      }
      return m ? `${this.block}--${m}` : undefined;
    });
  }

  is<T extends string>(name: T | undefined, state = true) {
    return name && state ? `is-${name}` : undefined;
  }

  name(name: string) {
    return name ? `y-${name}` : undefined;
  }
}

export function createNamespace(name: string) {
  return new BEM(name);
}
