import {Point} from '../../models/Point';
import {ExponentialApproximation} from './ExponentialApproximation';
import {FindEps} from './FindEps';
import {LinearApproximation} from './LinearApproximation';
import {QuadraticApproximation} from './QuadraticApproximation';
import {PowerApproximation} from './PowerApproximation';
import {LogarithmicApproximation} from './LogarithmicApproximation';
import {ApproximatingFunction} from '../../models/ApproximationFunction';
import {ResearchResult} from '../../models/ResearchResult';

export class ApproximationResearcher {

  static research(points: Point[]): ResearchResult[] {
    const linear = new LinearApproximation();
    const quad = new QuadraticApproximation();
    const pow = new PowerApproximation();
    const log = new LogarithmicApproximation();
    const exp = new ExponentialApproximation();

    const approximations: ApproximatingFunction[] = [linear, quad, pow, log, exp];

    const xV = points.map(p => p.x);
    const yV = points.map(p => p.y);
    const results: ResearchResult[] = [];
    for (const appr of approximations) {
      const aValues = appr.getAValues(xV, yV);
      let sumEps = 0;

      for (let i = 0; i < xV.length; i++) {
        const eps = FindEps.countEi(appr, xV[i], yV[i]);
        sumEps += eps * eps;
      }
      const srOtkl = Math.sqrt(sumEps / xV.length);
      const curr: ResearchResult = {
        view: appr.getPhiString(aValues), sumEps, srOtkl, fnc: appr.getPhi, a: aValues[0], b: aValues[1], c: aValues[2]
      };
      results.push(curr);
    }
    return results;
  }
}
