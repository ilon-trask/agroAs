import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  registerables,
  BarController,
} from "chart.js";
import { Line, Bar, Chart, Doughnut } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js/dist/types/index";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarController,
  ...registerables
);
export function LineChart({
  data,
  options,
}: {
  options: ChartOptions;
  data: ChartData;
}) {
  //@ts-ignore
  return <Line options={options} data={data} />;
}

export function BarChart({
  data,
  options,
}: {
  options: ChartOptions;
  data: ChartData;
}) {
  //@ts-ignore
  return <Bar options={options} data={data} />;
}
export function ChartChart({
  data,
  options,
}: {
  options?: ChartOptions;
  data: ChartData;
}) {
  return <Chart type="line" options={options} data={data} />;
}
export function DoughnutChart({
  data,
  options,
}: {
  options?: ChartOptions;
  data: ChartData;
}) {
  //@ts-ignore
  return <Doughnut options={options} data={data} />;
}
