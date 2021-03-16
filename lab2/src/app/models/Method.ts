import {MathFunction} from './MathFunction';

export interface Method {
  name: string,
  func: MathFunction,
  a: number,
  b: number,
  eps:number,
  solve():any[],
  result: any[],
  headers: string[]
}
