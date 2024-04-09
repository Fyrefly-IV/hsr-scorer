export const randomElement = <T>(arr: T[]): T | null => {
  if (arr.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export const randomElements = <T>(arr: T[], count: number = 1): T[] | null => {
  if (arr.length < count) {
    return null;
  }

  const shuffledArr = arr.slice().sort(() => Math.random() - 0.5);
  return shuffledArr.slice(0, count);
};

export const permutations = <T>(arr: T[], k: number): T[][] => {
  const result: T[][] = [];

  const backtrack = (start: number, current: T[]): void => {
    if (current.length === k) {
      result.push([...current]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  };

  backtrack(0, []);

  return result;
};
