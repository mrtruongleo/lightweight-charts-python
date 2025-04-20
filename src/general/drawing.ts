import { IChartApi, Point } from '@mrtruongleo/lightweight-charts';

export interface FibLevel {
  value: number;
  color: string;
}

export class Drawing {
  private chart: IChartApi;
  private data: {
    point1: Point | null;
    point2: Point | null;
  };
  private container: HTMLElement;
  private lines: Record<number, HTMLElement>;
  private fibLevel: number[];

  constructor(chart: IChartApi) {
    this.chart = chart;
    this.data = {
      point1: null,
      point2: null,
    };

    this.container = document.createElement('div');

    this.lines = {};

    this.fibLevel = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1, 1.618, 2.618];

    for (let i = 0; i < this.fibLevel.length; i++) {
      this.lines[i] = document.createElement('div');
      this.container.appendChild(this.lines[i]);
    }

    this.container.className = 'fibdrawer';
    const parentElement = this.chart.chartElement().parentElement;
    if (parentElement) {
      parentElement.appendChild(this.container);
    }
  }

  public addPoint(x: number | any, y: number | any) {
    const point = {
      x: x,
      y: y,
    };
    if (!this.data.point1) {
      this.data.point1 = point;
    } else {
      this.data.point2 = point;
      this.updateGeometry();
    }
  }

  public updateGeometry() {
    if (!this.data.point1 || !this.data.point2) return;

    const p1 = this.data.point1;
    const p2 = this.data.point2;

    let highestY = Math.min(p1.y, p2.y);
    let lowestY = Math.max(p1.y, p2.y);

    // calculate the step between each fibonacci level
    const step = (lowestY - highestY) / 8;

    this.container.style.left = '0px';
    this.container.style.width = '100%';
    this.container.style.top = highestY + 'px';
    this.container.style.height = lowestY - highestY + 'px';

    for (let i = 0; i < this.fibLevel.length; i++) {
      const height = Math.round(step * i);
      const level = this.fibLevel[i];
      this.lines[i].style.bottom = `calc(100% - ${height}px)`;
      this.lines[i].style.width = '100%';
      this.lines[i].style.height = '1px';
      this.lines[i].style.position = 'absolute';
      this.lines[i].style.borderTop = '1px dotted white';
      this.lines[i].style.zIndex = '5';
      this.lines[
        i
      ].innerHTML = `<span style="position: absolute; left: 0; top: 0;">${level}</span><span style="position: absolute; right: 0; top: 0;">${level}</span>`;
    }
  }

  public destroy() {
    this.container.remove();
  }
}
