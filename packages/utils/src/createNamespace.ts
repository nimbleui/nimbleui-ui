class BEM {
  private block = "";
  constructor(name: string) {
    this.block = `y-${name}`;
  }
  b(name?: string, state = true) {
    return name ? (state ? `${this.block}-${name}` : undefined) : this.block;
  }

  e(element: string) {
    const e = `${this.block}__${element}`;
    return e;
  }

  m(modifier: string) {
    return modifier ? `${this.block}--${modifier}` : undefined;
  }

  is(name: string, state = true) {
    return name && state ? `is-${name}` : undefined;
  }
}

export function createNamespace(name: string) {
  return new BEM(name);
}
