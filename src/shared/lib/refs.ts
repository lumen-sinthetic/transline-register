import { Ref, RefCallback, RefObject, useRef } from "react";

export function assignToRef<T>(
  value: T,
  ...refs: Array<Ref<T> | undefined>
): void {
  refs.forEach(ref => {
    if (!ref) return;
    switch (typeof ref) {
      case "object":
        ref.current = value;
        break;
      case "function":
        ref(value);
        break;
    }
  });
}

export function refs<T extends object | null = Element>(
  ...refs: Ref<T | Element | undefined>[]
): (node: T) => void {
  return node => {
    assignToRef(node, ...refs);
  };
}

export function multiRef<T extends HTMLElement>(arrayRef: RefObject<T[]>) {
  return (node: T | null) => {
    if (node) {
      if (!arrayRef.current?.includes(node)) {
        arrayRef.current?.push(node);
      }
    } else {
      if (arrayRef.current)
        (arrayRef as unknown as { current: T[] }).current =
          arrayRef.current?.filter(el => el !== node);
    }
  };
}

export function useRefArray<T extends HTMLElement = HTMLElement>(
  defaultRef: T[] = []
): readonly [RefObject<T[]>, RefCallback<T>] {
  const ref = useRef<T[]>(defaultRef);
  const callback = multiRef(ref);
  return [ref, callback];
}
