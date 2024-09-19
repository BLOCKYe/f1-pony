import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import HeaderCard from '@/modules/home/components/HeaderCard';
import { useTheme } from '@/providers/theme-provider';

interface ChartData {
  place: string;
  race: number;
  qualifying: number;
}

interface DriverRacesLineChartProps {
  data: ChartData[];
}

const DriverRacesLineChart: React.FC<DriverRacesLineChartProps> = (props) => {
  const { data } = props;
  const { theme } = useTheme();

  const chartConfig = {
    race: {
      label: 'Race',
      color: theme === 'dark' ? '#fafafa' : '#0a0a0a',
    },
    qualifying: {
      label: 'Qualifying',
      color: theme === 'dark' ? '#525252' : '#d4d4d4',
    },
  } satisfies ChartConfig;

  return (
    <div className={'w-full h-full'}>
      <div className={'mb-5 ml-5'}>
        <h3>Races</h3>
        <p>Visual representation of races results</p>
      </div>

      <HeaderCard>
        <ResponsiveContainer width='100%' height={'300px'}>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={data}
              layout='horizontal'
              margin={{
                left: 10,
                right: 10,
              }}>
              <YAxis dataKey={'race'} type={'number'} axisLine={false} tickLine={false} tickMargin={10} />
              <XAxis
                dataKey='place'
                height={80}
                angle={-45}
                textAnchor='end'
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => value.slice(0, 10)}
              />

              <CartesianGrid vertical={false} />

              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

              <ChartLegend content={<ChartLegendContent />} verticalAlign={'top'} />

              <Line dataKey='qualifying' stroke='var(--color-qualifying)' type='monotone' strokeWidth={2} dot={false} />
              <Line dataKey='race' stroke='var(--color-race)' type='monotone' strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </ResponsiveContainer>
      </HeaderCard>
    </div>
  );
};

export default DriverRacesLineChart;
