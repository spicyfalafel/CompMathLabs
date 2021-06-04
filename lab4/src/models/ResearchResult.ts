export interface ResearchResult {
  view: string;
  sumEps: number;
  srOtkl: number;
  fnc: (n, a, b, c) => number;
  a: number;
  b: number;
  c?: number;
}
