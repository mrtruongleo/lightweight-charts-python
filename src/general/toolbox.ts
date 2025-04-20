import {
  IChartApi,
  ISeriesApi,
  SeriesType,
} from '@mrtruongleo/lightweight-charts';

declare global {
  interface Window {
    callbackFunction: (action: string) => void;
    fibHandler?: (
      x: number,
      y: number,
      series?: ISeriesApi<SeriesType>
    ) => void;
    fibShowHide?: () => void;
  }
}

import { Drawing } from './drawing';

export function getDrawingMenu(id: string): HTMLElement {
  const menu = document.createElement('div');
  menu.id = `drawing-menu-${id}`;
  return menu;
}

export class ToolBox {
  public div: HTMLDivElement;
  private _commandFunctions: Function[];

  public drawingMenu: HTMLElement;
  private chart: IChartApi;
  private series: ISeriesApi<SeriesType>;
  private _drawingBox: HTMLElement | undefined;
  private _drawing: Drawing | undefined;

  private buttons: Record<string, HTMLElement> = {};

  constructor(
    id: string,
    chart: IChartApi,
    series: ISeriesApi<SeriesType>,
    commandFunctions: Function[]
  ) {
    this._commandFunctions = commandFunctions;
    this.chart = chart;
    this.series = series;

    this.div = document.createElement('div');
    this.div.classList.add('toolbox');
    this.div.style.overflow = 'hidden';

    // Drawing menu init
    this.drawingMenu = getDrawingMenu(id);
    this.drawingMenu.classList.add('drawing-menu');
    this.drawingMenu.classList.add(`dm-${id}`);
    this.drawingMenu.style.display = 'none';
    this.div.appendChild(this.drawingMenu);

    // Buttons init
    this.addCloseButton();
    this.addSettingsButton();
    this.addDrawingButton();
    this.addMagnetButton();
    this.addScreenshotButton();
    // this.addVolumeButton();

    this.addDrawingBox();
  }

  public toJSON() {
    const { _drawing, _drawingBox, chart, drawingMenu, series, ...rest } = this;
    return rest;
  }

  private addCloseButton() {
    let button = document.createElement('i');
    button.classList.add('fas', 'fa-times');
    button.setAttribute('data-tool', 'close');
    button.style.color = 'red';
    button.addEventListener('click', () => {
      window.callbackFunction('chart_close');
    });
    this.div.appendChild(button);
    this.buttons['close'] = button;
  }

  private addSettingsButton() {
    let button = document.createElement('i');
    button.classList.add('fas', 'fa-cog');
    button.setAttribute('data-tool', 'settings');
    button.addEventListener('click', () => {
      window.callbackFunction('chart_settings');
    });
    this.div.appendChild(button);
    this.buttons['settings'] = button;
  }

  private addDrawingButton() {
    let button = document.createElement('i');
    button.classList.add('fas', 'fa-pen');
    button.setAttribute('data-tool', 'drawing');
    button.addEventListener('click', () => {
      const drawingMenu = this.drawingMenu;
      if (drawingMenu.style.display == 'none') {
        drawingMenu.style.display = 'flex';
      } else {
        drawingMenu.style.display = 'none';
      }
    });
    this.div.appendChild(button);
    this.buttons['drawing'] = button;
  }

  private addMagnetButton() {
    let button = document.createElement('i');
    button.classList.add('fas', 'fa-magnet');
    button.setAttribute('data-tool', 'magnet');
    button.addEventListener('click', () => {
      window.callbackFunction('chart_magnet');
    });
    this.div.appendChild(button);
    this.buttons['magnet'] = button;
  }

  private addScreenshotButton() {
    let button = document.createElement('i');
    button.classList.add('fas', 'fa-camera');
    button.setAttribute('data-tool', 'screenshot');
    button.addEventListener('click', () => {
      window.callbackFunction('chart_screenshot');
    });
    this.div.appendChild(button);
    this.buttons['screenshot'] = button;
  }

  private addVolumeButton() {
    let button = document.createElement('i');
    button.classList.add('fas', 'fa-chart-bar');
    button.setAttribute('data-tool', 'volume');
    button.addEventListener('click', () => {
      window.callbackFunction('chart_volume');
    });
    this.div.appendChild(button);
    this.buttons['volume'] = button;
  }

  private addDrawingBox() {
    const div = (this._drawingBox = document.createElement('div'));
    div.id = 'drawing-box';

    const button = document.createElement('button');
    button.textContent = 'Fib Drawing';
    button.id = 'fib-button';
    button.addEventListener('click', () => {
      this.createFibDrawing();
      // @ts-ignore
      window.toggleDrawing('fib-button');
    });

    div.appendChild(button);
    this.div.appendChild(div);
  }

  private createFibDrawing() {
    if (this._drawing) return;

    this._drawing = new Drawing(this.chart);
    const drawing = this._drawing;

    // add to command function
    this._commandFunctions.push((event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.endDrawing();
        return true;
      }
      return false;
    });

    // add to subscribe event
    let subscription: ((range: any) => void) | null = () => {
      drawing.updateGeometry();
    };

    this.chart.timeScale().subscribeVisibleLogicalRangeChange(subscription);

    // check global points
    const handler = (x: number, y: number, series = this.series) => {
      drawing.addPoint(x, y);
    };

    window.fibHandler = handler;
    window.fibShowHide = this.endDrawing.bind(this);
  }

  private endDrawing() {
    // @ts-ignore
    window.toggleDrawing();
    if (!this._drawing) return;
    this._drawing = undefined;
    window.fibHandler = undefined;
  }
}
