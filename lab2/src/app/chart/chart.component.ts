import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Chart} from 'chart.js';
import {MathFunction} from '../models/MathFunction';
import {DataFromFormModel} from '../models/DataFromFormModel';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['chart.component.scss'],
  providers: []
})

export class ChartComponent implements OnInit, OnChanges {
  chart = [];
  labels = [];
  @Input() dataForm: DataFromFormModel;
  @Input() dataFromMethod;
  data;

  @Input() secants: boolean;
  private readonly step: number;


  constructor(private elementRef: ElementRef) {
    const step = 0.1;
    this.step = step;
    for (let i = -20; i <= 20; i++) {
      this.labels[i + 20] = this.round(step * i, 3);
    }
    if (!this.dataFromMethod) {
      this.dataFromMethod =
        [{
          a: 0,
          b: 5
        }];
    }
  }

  round(x: number, pow: number) {
    return Math.round(x * Math.pow(10, pow)) / Math.pow(10, pow);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.secants) {
      this.drawWithSecants();
    } else {
      this.setChart();
    }
  }

  ngOnInit(): void {
    if (!this.dataFromMethod) {
      this.dataFromMethod =
        [{
          a: 0,
          b: 5
        }];
    }
    this.resetChartData();
    this.setChart();
  }

  drawWithSecants() {
    console.log('drawing with secants', this.dataFromMethod);
    this.resetChartData();
    for (const row of this.dataFromMethod) {
      const a = row.xIminus1;
      const b = row.xi;
      const fa = this.dataForm.func.fnc(a);
      const fb = this.dataForm.func.fnc(b);
      this.data.datasets.push({
        data: [],
        pointRadius: 0,
        function: x => (-(a * fb - b * fa) - (fa - fb) * x) / (b - a),
        fill: false,
        borderWidth: 0,
        borderColor: 'orange',
        spanGaps: true
      });
    }
    this.setChart();
  }


  resetChartData() {
    this.data = {
      labels: this.labels,
      datasets: [
        {
          label: 'f(x)',
          function: this.dataForm.func.fnc,
          data: [],
          borderColor: '#3cba9f',
          fill: false
        }
      ]
    };
  }

  setChart() {
    console.log('setting chart');
    const htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);
    const verticalLinePlugin = {
      getLinePosition: function(chart, pointIndex) {
        const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
        const data = meta.data;
        return data[pointIndex]._model.x;
      },
      renderVerticalLine: function(chartInstance, pointIndex) {
        const lineLeftOffset = this.getLinePosition(chartInstance, pointIndex);
        const scale = chartInstance.scales['y-axis-0'];
        const context = chartInstance.chart.ctx;

        // render vertical line
        context.beginPath();
        context.strokeStyle = '#ff0000';
        context.moveTo(lineLeftOffset, scale.top);
        context.lineTo(lineLeftOffset, scale.bottom);
        context.stroke();

        // write label
        //context.fillStyle = "#ff0000";
        //context.textAlign = 'center';
        //context.fillText('MY TEXT', lineLeftOffset, (scale.bottom - scale.top) / 2 + scale.top);
      },

      afterDatasetsDraw: function(chart, easing) {
        if (chart.config.lineAtIndex) {
          chart.config.lineAtIndex.forEach(pointIndex => this.renderVerticalLine(chart, pointIndex));
        }
      }
    };
    Chart.plugins.register(verticalLinePlugin);
    Chart.pluginService.register({
      beforeInit(chart) {
        const data = chart.config.data;
        for (let i = 0; i < data.datasets.length; i++) {
          for (let j = 0; j < data.labels.length; j++) {
            const fct = data.datasets[i].function;
            const x = data.labels[j];
            const y = fct(x);
            data.datasets[i].data.push(y);
          }
        }
      }
    });
    const start: number = this.data.labels.indexOf(this.dataForm.a);
    const end: number = this.data.labels.indexOf(this.dataForm.b);
    const lines = [];
    if (end != -1 && start != -1) {
      lines[0] = start;
      lines[1] = end;
    }

    this.chart = new Chart(htmlRef, {
      type: 'line',
      data: this.data,
      lineAtIndex: lines,
      options: {
        legend: {
          display: false
        },
        animation: {
          duration: 2000
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
