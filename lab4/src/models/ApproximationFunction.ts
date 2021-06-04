export interface ApproximatingFunction {
  getPhi(x: number, a: number, b: number, c: number): number;

  getPhi1(x: number): number;

  getPhiString(aValues: number[]): string;

  getAValues(xValues: number[], yValues: number[]): number[];

}
