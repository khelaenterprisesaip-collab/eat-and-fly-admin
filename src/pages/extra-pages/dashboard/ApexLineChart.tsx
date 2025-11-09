import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';
import { ThemeMode } from 'config';

const initialLineChartOptions = {
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false
    },
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 1
  },
  xaxis: {
    type: 'category',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    labels: {
      show: true,
      style: {
        fontSize: '12px',
        colors: []
      }
    }
  },
  yaxis: {
    labels: {
      formatter: function (value: any) {
        return '$' + value / 1000 + 'k';
      }
    }
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (value: any, { seriesIndex, dataPointIndex }: any) {
        return '';
      }
    }
  }
};

export default function ApexLineChart({ commission }: any) {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const line = theme.palette.divider;
  const { primary } = theme.palette.text;
  const grey200 = theme.palette.secondary[200];
  const secondary = theme.palette.primary[400];
  const [series, setSeries] = useState<any[]>([]);
  const [options, setOptions] = useState<ChartProps>(initialLineChartOptions);

  useEffect(() => {
    if (commission) {
      const commissionData = new Array(12).fill(0);
      commission?.forEach((item: any) => {
        const monthIndex = item.month - 1;
        commissionData[monthIndex] = parseInt(item.sum, 10);
      });

      setSeries([
        {
          name: 'Commission',
          data: commissionData
        }
      ]);

      setOptions((prevState) => ({
        ...prevState,
        xaxis: {
          ...prevState?.xaxis,
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          labels: {
            show: true,
            style: {
              colors: new Array(12).fill(primary)
            }
          }
        }
      }));
    }
  }, [commission, primary]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: ['#0000ff', '#ffb62f'],
      yaxis: {
        ...prevState.yaxis,
        labels: {
          style: {
            colors: [primary]
          },
          formatter: function (value: any) {
            return '$' + value / 1000 + 'k';
          }
        }
      },
      grid: {
        borderColor: line
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (value: any, { seriesIndex, dataPointIndex }: any) {
            const seriesData = series[seriesIndex]?.data[dataPointIndex];
            return seriesData > 0 ? '$' + seriesData.toLocaleString() : '';
          }
        }
      },
      stroke: {
        curve: 'straight',
        width: 1
      }
    }));
  }, [mode, primary, line, grey200, secondary, series]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
}
