export function getObjectKeyByValue<T extends {}>(o: T, value: unknown): string | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  const e = Object.entries(o).find(
    ([_, v]) => v === value
  );
  return e ? e[0] : undefined;
}