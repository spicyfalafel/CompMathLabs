import {ApproximatingFunction} from '../../models/ApproximationFunction';

export class FindEps {
  static countEi(f: ApproximatingFunction, x: number, y: number): number {
    return f.getPhi1(x) - y;
  }
}
