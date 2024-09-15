export function randomElement<T>(arr: T[]): T | null {
  if (arr.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export function randomElements<T>(arr: T[], count: number = 1): T[] | null {
  if (arr.length < count) {
    return null;
  }

  const shuffledArr = arr.slice().sort(() => Math.random() - 0.5);
  return shuffledArr.slice(0, count);
}

// https://blog.lublot.dev/combinations-in-typescript
export function combinations<T>(arr: T[], comboSize: number = arr.length): T[][] {
  const combinations: T[][] = [];
  const stack: number[] = [];
  let i = 0;

  comboSize = Math.min(arr.length, comboSize);

  while (stack.length > 0 || i < arr.length) {
    if (stack.length === comboSize) {
      combinations.push(stack.map((index) => arr[index]));
      i = stack.pop()! + 1;
    }

    if (i >= arr.length) {
      if (stack.length === 0) {
        break;
      }
      i = stack.pop()! + 1;
    } else {
      stack.push(i++);
    }
  }

  return combinations;
}


// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
export function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
