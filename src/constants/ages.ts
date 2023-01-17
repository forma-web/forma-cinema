export enum Ages {
  ZERO = 0,
  SIX = 6,
  TWELVE = 12,
  SIXTEEN = 16,
  EIGHTEEN = 18,
}

const AGES_RESTRICTIONS = [
  Ages.ZERO,
  Ages.SIX,
  Ages.TWELVE,
  Ages.SIXTEEN,
  Ages.EIGHTEEN,
];

export const AGES_OPTIONS = AGES_RESTRICTIONS.map((age) => ({
  value: age,
  label: `${age}+`,
}));

export default AGES_RESTRICTIONS;
