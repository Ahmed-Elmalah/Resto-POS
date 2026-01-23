import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Food', value: 400 },
  { name: 'Drinks', value: 300 },
  { name: 'Desserts', value: 300 },
];

const COLORS = ['#137fec', '#3b82f6', '#93c5fd']; // درجات الأزرق عشان تليق مع الأدمن

export default function CategoryPieChart() {
  return (
    <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-96">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Sales by Category</h3>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: '12px', color: '#64748b' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}