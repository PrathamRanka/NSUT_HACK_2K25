import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { date: 'Mon', risk: 35, alerts: 4 },
  { date: 'Tue', risk: 42, alerts: 6 },
  { date: 'Wed', risk: 38, alerts: 5 },
  { date: 'Thu', risk: 55, alerts: 8 },
  { date: 'Fri', risk: 48, alerts: 7 },
  { date: 'Sat', risk: 32, alerts: 3 },
  { date: 'Sun', risk: 42, alerts: 5 },
];

export function RiskTrendChart() {
  return (
    <div className="rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm p-3 sm:p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Risk Trend (7 Days)
        </h2>
      </div>
      
      <div className="h-[180px] sm:h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(222, 30%, 18%)" 
              vertical={false}
            />
            <XAxis 
              dataKey="date" 
              stroke="hsl(215, 20%, 55%)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(215, 20%, 55%)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222, 47%, 10%)',
                border: '1px solid hsl(222, 30%, 18%)',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              labelStyle={{ color: 'hsl(210, 40%, 96%)' }}
            />
            <Area
              type="monotone"
              dataKey="risk"
              stroke="hsl(199, 89%, 48%)"
              strokeWidth={2}
              fill="url(#riskGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
