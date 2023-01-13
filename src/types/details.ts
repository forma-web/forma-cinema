export type TDetail = {
  type: string;
  label: string;
  value: string;
};

export type TDetailConfig = {
  type: string;
  label: string;
  convert?: (value: any) => string;
};
