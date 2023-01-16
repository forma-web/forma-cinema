export type TWordForms = [string, string, string];

const cases = [2, 0, 1, 1, 1, 2];

export const plural = (count: number, words: TWordForms): string => {
  return words[
    count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
  ];
};
