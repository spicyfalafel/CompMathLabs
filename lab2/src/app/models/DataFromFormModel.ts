import {MathFunction} from './MathFunction';
import {Method} from './Method';

export interface DataFromFormModel {
  func: MathFunction,
  a: number,
  b: number,
  method: Method,
  eps: number,
  pribl: number
}
