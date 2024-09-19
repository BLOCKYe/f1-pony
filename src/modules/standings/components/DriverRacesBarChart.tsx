import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';

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

interface DriverRacesBarChartProps {
  data: ChartData[];
}

const DriverRacesBarChart: React.FC<DriverRacesBarChartProps> = (props) => {
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
        <ResponsiveContainer width='100%' height={800}>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={data}
              layout='vertical'
              margin={{
                left: 10,
                right: 30,
              }}>
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey='place'
                type='category'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                width={100}
                tickFormatter={(value) => value.slice(0, 10)}
              />
              <XAxis dataKey='race' type='number' hide />

              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line' />} />

              <ChartLegend content={<ChartLegendContent />} verticalAlign={'top'} />

              <Bar dataKey='race' layout='vertical' fill={'var(--color-race)'} radius={4}>
                <LabelList dataKey='race' position='right' offset={8} className='fill-foreground' fontSize={12} />
              </Bar>

              <Bar dataKey='qualifying' layout='vertical' fill={'var(--color-qualifying)'} radius={4}>
                <LabelList dataKey='qualifying' position='right' offset={8} className='fill-foreground' fontSize={12} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </HeaderCard>
    </div>
  );
};

export default DriverRacesBarChart;
