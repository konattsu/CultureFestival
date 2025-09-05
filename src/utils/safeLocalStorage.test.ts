// ! テスト対象が一つもないとactionsが失敗するのでこのファイルは絶対に消してはいけない

import { describe, expect, beforeEach, afterEach, test } from "vitest";

import { safeLocalStorage } from "./safeLocalStorage";

describe("safeLocalStorage", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: ((): {
        getItem: (key: string) => string | null;
        setItem: (key: string, value: string) => void;
        removeItem: (key: string) => void;
        clear: () => void;
      } => {
        let store: Record<string, string> = {};
        return {
          getItem: (key: string): string | null => {
            return store[key] ?? null;
          },
          setItem: (key: string, value: string): void => {
            store[key] = value;
          },
          removeItem: (key: string): void => {
            delete store[key];
          },
          clear: (): void => {
            store = {};
          },
        };
      })(),
      writable: true,
    });
  });

  afterEach(() => {
    safeLocalStorage.clear();
  });

  test("setItem and getItem", () => {
    safeLocalStorage.setItem("foo", "bar");
    expect(safeLocalStorage.getItem("foo")).toBe("bar");
  });

  test("removeItem", () => {
    safeLocalStorage.setItem("foo", "bar");
    safeLocalStorage.removeItem("foo");
    expect(safeLocalStorage.getItem("foo")).toBeNull();
  });

  test("clear", () => {
    safeLocalStorage.setItem("foo", "bar");
    safeLocalStorage.setItem("baz", "qux");
    safeLocalStorage.clear();
    expect(safeLocalStorage.getItem("foo")).toBeNull();
    expect(safeLocalStorage.getItem("baz")).toBeNull();
  });
});
