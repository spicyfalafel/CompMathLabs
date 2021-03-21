import {MathFunction} from './MathFunction';
import {DataFromFormModel} from './DataFromFormModel';

export interface Method {
  name: string,
  func: MathFunction,
  a: number,
  b: number,
  eps:number,
  solve():any[],
  result: any[],
  headers: string[],
  setData(data: DataFromFormModel);
}
