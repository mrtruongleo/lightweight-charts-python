import {
  createChart,
  LineSeries,
  LineType,
} from '@mrtruongleo/lightweight-charts';

const chart = createChart('container', { width: 1024, height: 768 });

const lineSeries = chart.addSeries(LineSeries, {
  lineType: LineType.WithGaps,
});
lineSeries.setData([
  { time: '2018-12-22', value: 42.51 },
  { time: '2018-12-23', value: 41.11 },
  { time: '2018-12-24', value: null },
  { time: '2018-12-25', value: null },
  { time: '2018-12-26', value: 35.17 },
  { time: '2018-12-27', value: 38.89 },
  { time: '2018-12-28', value: 35.46 },
  { time: '2018-12-29', value: 33.92 },
  { time: '2018-12-30', value: 32.68 },
  { time: '2018-12-31', value: 32.67 },
]);
chart.timeScale().fitContent();
