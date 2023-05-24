export function startComposing({ target }: Event) {
  (target as any).composing = true;
}

export function endComposing({ target }: Event) {
  if ((target as any).composing) {
    (target as any).composing = false;
    target?.dispatchEvent(new Event("input"));
  }
}
