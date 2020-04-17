function stringify(value: any): string {
  return JSON.stringify(value);
}

function parse<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    return null;
  }
}

export function setValue(key: string, data: any) {
  if (!process.browser) {
    return null
  }
  localStorage.setItem(key, stringify(data));
}

export function getValue<T>(key: string, defaultValue?: T): T | null {
  if (!process.browser) {
    return null
  }
  const value = localStorage.getItem(key);

  if (!value) return defaultValue || null;
  const data = parse<T>(value);
  return data;
}
export function removeValue(key: string) {
  if (!process.browser) {
    return null
  }
  localStorage.removeItem(key);
}
