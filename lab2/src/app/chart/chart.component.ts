import {AfterContentInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {Chart} from 'chart.js';
import {MathFunction} from '../models/MathFunction';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['chart.component.scss'],
  providers: []
})

export class ChartComponent implements OnInit, OnChanges {
  chart = [];
  @Input() func: MathFunction;
  @Input() startNum: number;
  @Input() endNum: number;
  start: number = -4;
  finish: number = 4;

  constructor(private elementRef: ElementRef) {
  }

  round(x: number, pow: number) {
    return Math.round(x * Math.pow(10, pow)) / Math.pow(10, pow);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setChart();
  }

  ngOnInit(): void {
    this.setChart();
  }

  setChart() {
    const htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);
    const step = 0.25
    const labels = []
    for(let i = -20; i<20;i++){
      labels[i+20] = this.round(step*i, 3);
    }

    const data = {
      labels: labels/*[-5,-4, -3, -2, -1, 0, 1, 2, 3, 4,5]*/,
      datasets: [
        {
          label: 'f(x)',
          function: this.func.fnc,
          data: [],
          borderColor: '#3cba9f',
          fill: false
        }
      ]
    };
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
    const end: number = data.labels.indexOf(this.endNum);
    const start: number = data.labels.indexOf(this.startNum);
    const lines = [];
    if (end != -1 && start != -1) {
      lines[0] = start;
      lines[1] = end;
    }

    this.chart = new Chart(htmlRef, {
      type: 'line',
      data: data,
      lineAtIndex: lines,
      options: {
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
