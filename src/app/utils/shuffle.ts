// Функция за размесване на масиви (Fisher-Yates shuffle)
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Функция за избиране на случайни елементи от масив
export function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, count);
}
