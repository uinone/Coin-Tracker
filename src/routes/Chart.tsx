import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface ChartProps {
  coinId: string;
}

interface ICoinHistory {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ICandleChartItem {
  x: Date;
  y: number[];
}

function Chart({ coinId }: ChartProps) {
  const { isLoading: historyLoading, data: historyData } = useQuery<
    ICoinHistory[]
  >(["history", coinId], () => fetchCoinHistory(coinId!), {
    refetchInterval: 10000,
  });
  return (
    <div>
      {historyLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: historyData?.map((props) => {
                return {
                  x: new Date(props.time_open * 1000),
                  y: [
                    parseFloat(props.open),
                    parseFloat(props.high),
                    parseFloat(props.low),
                    parseFloat(props.close),
                  ],
                };
              }) as ICandleChartItem[],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              type: "datetime",
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#ff009d",
                  downward: "#0be881",
                },
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
