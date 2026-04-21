import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend, LabelList, PieChart, Pie, Cell, ReferenceLine } from 'recharts';
import { Users, DollarSign, TrendingUp, CreditCard, Activity, Target, ShieldCheck, ChevronDown, ChevronRight, UserPlus, UserMinus, Search, X, Check, Cloud, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const genderData = [
  { name: 'Male', value: 650 },
  { name: 'Female', value: 550 },
];

const ageData = [
  { range: '18-25', count: 350 },
  { range: '26-35', count: 480 },
  { range: '36-45', count: 220 },
  { range: '46+', count: 150 },
];

const retentionData = [
  { month: 'Jan', rate: 62 },
  { month: 'Feb', rate: 65 },
  { month: 'Mar', rate: 61 },
  { month: 'Apr', rate: 68 },
  { month: 'May', rate: 66 },
  { month: 'Jun', rate: 71 },
  { month: 'Jul', rate: 72 },
  { month: 'Aug', rate: 78 },
  { month: 'Sep', rate: 81 },
  { month: 'Oct', rate: 83 },
  { month: 'Nov', rate: 79 },
  { month: 'Dec', rate: 84 },
];

const occupationData = [
  { name: 'Employees', count: 480 },
  { name: 'Students', count: 335 },
  { name: 'Self-Employed', count: 180 },
  { name: 'Housewives', count: 95 },
  { name: 'Others', count: 110 },
];

const totalMembersCount = genderData.reduce((acc, curr) => acc + curr.value, 0);

const COLORS = ['#10b981', '#f43f5e', '#3b82f6', '#f59e0b', '#8b5cf6'];

const timeframeConfig = {
  daily: { min: 500, max: 4000, step: 1000 },
  weekly: { min: 1000, max: 8000, step: 1000 },
  monthly: { min: 1500, max: 10000, step: 1000 },
  annual: { min: 10000, max: 40000, step: 5000 },
};

const financialData = {
  daily: [
    { name: '08:00', income: 800, expenses: 600 },
    { name: '10:00', income: 1200, expenses: 700 },
    { name: '12:00', income: 1800, expenses: 900 },
    { name: '14:00', income: 1500, expenses: 800 },
    { name: '16:00', income: 2400, expenses: 1200 },
    { name: '18:00', income: 3500, expenses: 1500 },
    { name: '20:00', income: 2800, expenses: 1100 },
  ],
  weekly: [
    { name: 'Mon', income: 4000, expenses: 2400 },
    { name: 'Tue', income: 3500, expenses: 1800 },
    { name: 'Wed', income: 5200, expenses: 2100 },
    { name: 'Thu', income: 4800, expenses: 2900 },
    { name: 'Fri', income: 5500, expenses: 3100 },
    { name: 'Sat', income: 7200, expenses: 3800 },
    { name: 'Sun', income: 6500, expenses: 3400 },
  ],
  monthly: [
    { name: 'Week 1', income: 7500, expenses: 4000 },
    { name: 'Week 2', income: 8200, expenses: 4500 },
    { name: 'Week 3', income: 6800, expenses: 5200 },
    { name: 'Week 4', income: 9500, expenses: 5000 },
  ],
  annual: [
    { name: 'Jan', income: 25000, expenses: 15000 },
    { name: 'Feb', income: 28000, expenses: 16000 },
    { name: 'Mar', income: 22000, expenses: 18000 },
    { name: 'Apr', income: 31000, expenses: 20000 },
    { name: 'May', income: 29000, expenses: 19000 },
    { name: 'Jun', income: 34000, expenses: 22000 },
    { name: 'Jul', income: 38000, expenses: 24000 },
    { name: 'Aug', income: 36000, expenses: 23000 },
    { name: 'Sep', income: 31000, expenses: 21000 },
    { name: 'Oct', income: 33000, expenses: 22000 },
    { name: 'Nov', income: 37000, expenses: 24000 },
    { name: 'Dec', income: 39500, expenses: 25000 },
  ]
};

const memberData = [
  { name: 'Basic', count: 400 },
  { name: 'Pro', count: 300 },
  { name: 'Elite', count: 300 },
  { name: 'Corporate', count: 200 },
];

const clients = [
  { id: 1, name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', dob: '1990-05-15', email: 'john@example.com', phone: '+216 22 123 456', faceId: true, plan: 'Elite', joinDate: '2023-01-15', paymentDate: '2024-04-15', remainingDays: 24, status: 'Active', source: 'App' },
  { id: 2, name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', dob: '1995-08-22', email: 'jane@example.com', phone: '+216 55 987 654', faceId: true, plan: 'Pro', joinDate: '2023-03-22', paymentDate: '2024-04-10', remainingDays: 19, status: 'Active', source: 'Website' },
  { id: 3, name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', dob: '1988-12-10', email: 'mike@example.com', phone: '+216 98 456 123', faceId: false, plan: 'Basic', joinDate: '2023-06-10', paymentDate: '2023-12-10', remainingDays: 0, status: 'Inactive', source: 'In-Gym' },
  { id: 4, name: 'Sarah Williams', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', dob: '1992-03-05', email: 'sarah@example.com', phone: '+216 21 222 333', faceId: true, plan: 'Corporate', joinDate: '2023-08-05', paymentDate: '2024-04-20', remainingDays: 29, status: 'Active', source: 'App' },
  { id: 5, name: 'David Brown', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', dob: '1985-11-12', email: 'david@example.com', phone: '+216 50 444 555', faceId: true, plan: 'Pro', joinDate: '2023-11-12', paymentDate: '2024-04-01', remainingDays: 10, status: 'Active', source: 'Website' },
  { id: 6, name: 'Mondher Masmoudi', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', dob: '1991-07-20', email: 'mondher@ozone.com', phone: '+216 22 777 888', faceId: true, plan: 'Elite', joinDate: '2024-04-21', paymentDate: '2024-04-21', remainingDays: 30, status: 'Active', source: 'App' },
];

const chargesData = [
  { name: 'Equipment Maintenance', amount: '4,500 TND', percent: 15, color: 'bg-blue-500' },
  { 
    name: 'Staff Salaries', amount: '18,000 TND', percent: 60, color: 'bg-emerald-500',
    subCharges: [
      { name: 'Coaches', amount: '10,000 TND', percent: 55 },
      { name: 'Manager', amount: '4,000 TND', percent: 22 },
      { name: 'Receptionist', amount: '2,500 TND', percent: 14 },
      { name: 'Cleaning Team', amount: '1,500 TND', percent: 9 },
    ]
  },
  { name: 'Utilities (Electricity/Water)', amount: '3,200 TND', percent: 10, color: 'bg-amber-500' },
  { name: 'Rent & Facility', amount: '12,000 TND', percent: 40, color: 'bg-purple-500' },
  { name: 'Marketing & Ads', amount: '2,500 TND', percent: 8, color: 'bg-pink-500' },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'annual'>('weekly');
  const [showTimeframeDropdown, setShowTimeframeDropdown] = useState(false);
  const [expandedCharge, setExpandedCharge] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState('1');

  const stats = [
    { title: 'Daily Income', value: '2.1k', change: '+12%', icon: DollarSign, color: 'text-emerald-400' },
    { title: 'Weekly Income', value: '14.8k', change: '+5%', icon: TrendingUp, color: 'text-blue-400' },
    { title: 'Monthly Income', value: '64.2k', change: '+18%', icon: CreditCard, color: 'text-purple-400' },
    { title: 'Annual Income', value: '750k', change: '+25%', icon: Target, color: 'text-amber-400' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-wider text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="h-8 w-8" />
              DIRECTOR DASHBOARD
            </h1>
            <p className="text-gray-400 mt-1">Manage operations, memberships, and financials.</p>
          </div>
          <div className="flex bg-neutral-900 rounded-lg p-1 border border-white/10 overflow-x-auto w-full md:w-auto">
            {['overview', 'clients', 'charges'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 md:flex-none px-6 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                  activeTab === tab ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-neutral-900 border border-white/5 rounded-xl p-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <stat.icon className={`h-16 w-16 ${stat.color}`} />
                  </div>
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className={`p-2 rounded-lg bg-neutral-800 ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-400">{stat.title}</h3>
                  </div>
                  <div className="flex items-baseline gap-2 relative z-10">
                    <span className="text-3xl font-bold text-white tracking-tight">{stat.value}</span>
                    <span className="text-sm font-medium text-emerald-400">{stat.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-neutral-900 border border-white/5 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Activity className="h-5 w-5 text-emerald-400" />
                    Financial Overview
                  </h3>
                  <div className="relative">
                    <button 
                      onClick={() => setShowTimeframeDropdown(!showTimeframeDropdown)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-lg text-sm font-medium hover:bg-neutral-700 transition-colors"
                    >
                      <span className="capitalize">{timeframe}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${showTimeframeDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {showTimeframeDropdown && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-2 w-32 bg-neutral-800 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                        >
                          {(['daily', 'weekly', 'monthly', 'annual'] as const).map((t) => (
                            <button
                              key={t}
                              onClick={() => {
                                setTimeframe(t);
                                setShowTimeframeDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2 text-sm hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors capitalize ${
                                timeframe === t ? 'text-emerald-400 bg-emerald-500/5' : 'text-gray-400'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="h-80 w-full text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={financialData[timeframe]}>
                      <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                      <XAxis dataKey="name" stroke="#888" tickLine={false} axisLine={false} />
                      <YAxis 
                        stroke="#888" 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value.toString()}
                        type="number"
                        domain={[timeframeConfig[timeframe].min, timeframeConfig[timeframe].max]}
                        allowDecimals={false}
                        interval={0}
                        ticks={(() => {
                          const config = timeframeConfig[timeframe];
                          const ticks = [];
                          for (let i = config.min; i <= config.max; i += config.step) {
                            ticks.push(i);
                          }
                          return ticks;
                        })()}
                      />
                      <RechartsTooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            // payload[0] is Expenses (due to itemSorter reversal)
                            // payload[1] is Income
                            return (
                              <div className="bg-neutral-900 border border-white/10 p-3 rounded-lg shadow-2xl">
                                <p className="text-gray-400 text-xs mb-2 font-medium">{payload[0].payload.name}</p>
                                <div className="space-y-1">
                                  {payload.map((entry, index) => (
                                    <div key={index} className="flex justify-between items-center gap-8">
                                      <span className="text-xs font-medium text-gray-300">{entry.name}:</span>
                                      <span className={`text-sm font-bold ${index === 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {entry.value >= 1000 ? `${(Number(entry.value) / 1000).toFixed(1)}k TND` : `${entry.value} TND`}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                        itemSorter={() => -1}
                      />
                      <Legend />
                       <Area 
                        type="monotone" 
                        dataKey="income" 
                        stroke="#34d399" 
                        fillOpacity={1} 
                        fill="url(#colorIncome)" 
                        name="Income" 
                        dot={{ r: 3, fill: '#34d399', strokeWidth: 2, stroke: '#0a0a0a' }}
                        activeDot={{ r: 5, strokeWidth: 0 }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="expenses" 
                        stroke="#ef4444" 
                        fillOpacity={1} 
                        fill="url(#colorExpenses)" 
                        name="Expenses" 
                        dot={{ r: 3, fill: '#ef4444', strokeWidth: 2, stroke: '#0a0a0a' }}
                        activeDot={{ r: 5, strokeWidth: 0 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-neutral-900 border border-white/5 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5 text-amber-400" />
                    Membership Distribution
                  </h3>
                  <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                    <span className="text-xs font-bold text-amber-400">
                      TOTAL: {totalMembersCount.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="h-80 w-full text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={memberData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                      <XAxis type="number" stroke="#888" tickLine={false} axisLine={false} />
                      <YAxis dataKey="name" type="category" stroke="#888" tickLine={false} axisLine={false} />
                      <RechartsTooltip
                        contentStyle={{ backgroundColor: '#171717', borderColor: '#333', color: '#fff', borderRadius: '0.5rem' }}
                        cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                      />
                      <Bar dataKey="count" fill="#fbbf24" radius={[0, 4, 4, 0]} name="Members">
                        <LabelList 
                          dataKey="count" 
                          position="insideRight" 
                          fill="#fff" 
                          offset={10}
                          style={{ 
                            fontWeight: 'bold', 
                            fontSize: '12px',
                            filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.8))'
                          }}
                          formatter={(value: number) => {
                            const total = memberData.reduce((acc, curr) => acc + curr.count, 0);
                            const percentage = ((value / total) * 100).toFixed(0);
                            return `${value} (${percentage}%)`;
                          }} 
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Statistics & Retention Grid Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              {/* Member Retention Rate - Main Focus (2/3 width) */}
              <div className="lg:col-span-2 bg-neutral-900 border border-white/5 rounded-xl p-8 flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold flex items-center gap-3 text-cyan-400">
                    <TrendingUp className="h-6 w-6" />
                    Member Retention Rate
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                      <span className="text-xs font-bold text-amber-500">
                        TOTAL: {totalMembersCount.toLocaleString()}
                      </span>
                    </div>
                    <div className="px-4 py-1.5 bg-cyan-400/10 border border-cyan-400/20 rounded-lg">
                      <span className="text-sm font-bold text-cyan-400">
                        CURRENT: {retentionData[retentionData.length-1].rate}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 min-h-[400px] w-full text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={retentionData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} opacity={0.3} />
                      <XAxis dataKey="month" stroke="#555" tickLine={false} axisLine={false} />
                      <YAxis 
                        domain={[55, 85]} 
                        stroke="#888" 
                        tickLine={false} 
                        axisLine={true} 
                        tickFormatter={(val) => `${val}%`}
                        ticks={[55, 60, 65, 70, 75, 80, 85]}
                        style={{ fontSize: '11px', fontWeight: 'bold' }}
                      />
                      <RechartsTooltip
                        contentStyle={{ backgroundColor: '#171717', borderColor: '#333', color: '#fff', borderRadius: '0.5rem' }}
                        formatter={(value: number) => [`${value}%`, 'Retention Rate']}
                      />
                      <ReferenceLine y={63} stroke="#ef4444" strokeDasharray="5 5" strokeWidth={2} label={{ value: 'MIN (63%)', position: 'right', fill: '#ef4444', fontSize: 10, fontWeight: 'bold' }} />
                      <ReferenceLine y={75} stroke="#10b981" strokeDasharray="5 5" strokeWidth={2} label={{ value: 'OPTIMAL (75%)', position: 'right', fill: '#10b981', fontSize: 10, fontWeight: 'bold' }} />
                      
                      <Area 
                        type="monotone" 
                        dataKey="rate" 
                        stroke="#06b6d4" 
                        fillOpacity={1} 
                        fill="url(#colorRetention)" 
                        strokeWidth={4}
                        dot={{ r: 4, fill: '#0a0a0a', strokeWidth: 2, stroke: '#06b6d4' }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-8 flex flex-wrap gap-6 text-xs border-t border-white/5 pt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                    <span className="text-gray-400 font-medium">Retention Goal (75%+)</span>
                  </div>
                  {(() => {
                    const latest = retentionData[retentionData.length - 1];
                    const previous = retentionData[retentionData.length - 2];
                    const diff = latest.rate - previous.rate;
                    const isPositive = diff >= 0;
                    return (
                      <p className={`italic ml-auto font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                        Retention has {isPositive ? 'increased' : 'decreased'} by {Math.abs(diff)}% this month.
                      </p>
                    );
                  })()}
                </div>
              </div>

              {/* Demographics Column (1/3 width) */}
              <div className="lg:col-span-1 space-y-6">
                {/* Gender Distribution Card */}
                <div className="bg-neutral-900 border border-white/5 rounded-xl p-6 h-[calc(50%-12px)] flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-md font-bold flex items-center gap-2 text-emerald-400">
                      <Users className="h-4 w-4" />
                      Gender Distribution
                    </h3>
                    <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                      <span className="text-[10px] font-bold text-amber-500">
                        TOTAL: {totalMembersCount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 w-full flex items-center justify-center relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={genderData}
                          cx="50%"
                          cy="40%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={10}
                          dataKey="value"
                          stroke="none"
                          labelLine={false}
                          label={({ cx, cy, midAngle, innerRadius, outerRadius, value, percent }) => {
                            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                            const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                            const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                            return (
                              <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-[10px] font-bold">
                                {`${value} (${(percent * 100).toFixed(0)}%)`}
                              </text>
                            );
                          }}
                        >
                          <Cell key="male" fill="#10b981" />
                          <Cell key="female" fill="#f43f5e" />
                        </Pie>
                        <RechartsTooltip contentStyle={{ backgroundColor: '#171717', borderColor: '#333', color: '#fff', borderRadius: '0.5rem' }} />
                        <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Age Distribution Card */}
                <div className="bg-neutral-900 border border-white/5 rounded-xl p-6 h-[calc(50%-12px)] flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-md font-bold flex items-center gap-2 text-indigo-500">
                      <Target className="h-4 w-4" />
                      Age Groups
                    </h3>
                    <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                      <span className="text-[10px] font-bold text-amber-500">
                        TOTAL: {totalMembersCount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ageData} margin={{ top: 30, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="range" stroke="#555" tickLine={false} axisLine={false} style={{ fontSize: '10px' }} interval={0} />
                        <YAxis hide />
                        <RechartsTooltip 
                          cursor={false}
                          contentStyle={{ backgroundColor: '#171717', borderColor: '#333', color: '#fff', borderRadius: '0.5rem' }} 
                        />
                        <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={50}>
                          <LabelList 
                            dataKey="count" 
                            content={({ x, y, width, value }: any) => {
                              const total = ageData.reduce((acc, curr) => acc + curr.count, 0);
                              const percentage = ((value / total) * 100).toFixed(0);
                              return (
                                <g>
                                  <text x={(x as number) + (width as number) / 2} y={(y as number) + 20} fill="#fff" textAnchor="middle" className="text-[10px] font-bold">
                                    {value}
                                  </text>
                                  <text x={(x as number) + (width as number) / 2} y={(y as number) + 32} fill="#fff" textAnchor="middle" className="text-[9px] font-bold opacity-90">
                                    {`(${percentage}%)`}
                                  </text>
                                </g>
                              );
                            }}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Occupational Statistics Section */}
            <div className="bg-neutral-900 border border-white/5 rounded-xl p-8 mt-6">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold flex items-center gap-3 text-emerald-400">
                  <ShieldCheck className="h-6 w-6" />
                  Member Professional Background
                </h3>
                <div className="px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full">
                  <span className="text-sm font-bold text-amber-500">
                    TOTAL: {totalMembersCount.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="bg-neutral-800/30 p-8 rounded-2xl border border-white/5 relative overflow-hidden group max-w-5xl mx-auto">
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Activity size={160} />
                </div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6 text-center">Occupation Distribution</h4>
                <div className="h-80 w-full text-xs text-white">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={occupationData} 
                      layout="vertical" 
                      margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                      barSize={40}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} opacity={0.1} />
                      <XAxis type="number" hide />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        stroke="#888" 
                        tickLine={false} 
                        axisLine={false}
                        width={100}
                        style={{ fontSize: '11px', fontWeight: 'bold' }}
                      />
                      <RechartsTooltip 
                        cursor={false}
                        contentStyle={{ backgroundColor: '#171717', borderColor: '#333', color: '#fff', borderRadius: '0.5rem' }} 
                      />
                      <Bar dataKey="count" fill="#10b981" radius={[0, 6, 6, 0]}>
                        <LabelList 
                          dataKey="count" 
                          position="insideRight" 
                          fill="#fff" 
                          offset={10}
                          style={{ 
                            fontWeight: 'bold', 
                            fontSize: '11px',
                            filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.8))' 
                          }}
                          formatter={(value: number) => {
                            const total = occupationData.reduce((acc, curr) => acc + curr.count, 0);
                            const percentage = ((value / total) * 100).toFixed(0);
                            return `${value} (${percentage}%)`;
                          }} 
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'clients' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-neutral-900 border border-white/5 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-400" />
                  Client Database
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[9px] font-bold text-blue-400 tracking-wider uppercase">
                    <Cloud className="h-2.5 w-2.5" />
                    Auto-Sync Active
                  </div>
                  <span className="text-[10px] text-gray-500 italic">Connected to O-Zone Mobile Service</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search by name, email or phone..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-neutral-800 border border-white/10 rounded-md py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 md:flex-none px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 border border-white/10"
                >
                  <UserPlus className="h-4 w-4" />
                  Add/Remove Client
                </button>
                <button className="flex-1 md:flex-none px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md text-sm font-medium transition-colors">
                  Export Data
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-400 uppercase bg-neutral-800/50">
                  <tr>
                    <th className="px-6 py-4 font-medium">Name & DOB</th>
                    <th className="px-6 py-4 font-medium">Source</th>
                    <th className="px-6 py-4 font-medium">Face ID</th>
                    <th className="px-6 py-4 font-medium">Contact</th>
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium">Plan</th>
                    <th className="px-6 py-4 font-medium">Payment Date</th>
                    <th className="px-6 py-4 font-medium">Remaining</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {clients
                    .filter(client => 
                      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      client.phone.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((client) => (
                    <tr key={client.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{client.name}</div>
                        <div className="text-[10px] text-gray-500">DOB: {client.dob}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[9px] font-bold tracking-tighter uppercase ${
                          client.source === 'App' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                          client.source === 'Website' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {client.source === 'App' ? <Cloud className="h-2.5 w-2.5" /> : client.source === 'Website' ? <Globe className="h-2.5 w-2.5" /> : <Users className="h-2.5 w-2.5" />}
                          {client.source}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img src={client.avatar} className="h-10 w-10 rounded-lg object-cover border border-white/10" alt={client.name} />
                            {client.faceId && (
                              <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 border-2 border-neutral-900">
                                <ShieldCheck className="h-2 w-2 text-white" />
                              </div>
                            )}
                          </div>
                          <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            client.faceId ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${client.faceId ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                            {client.faceId ? 'REGISTERED' : 'MISSING'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300 font-mono text-xs">{client.phone}</td>
                      <td className="px-6 py-4 text-[10px] text-gray-400">{client.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          client.plan === 'Elite' ? 'bg-amber-500/20 text-amber-400' :
                          client.plan === 'Pro' ? 'bg-emerald-500/20 text-emerald-400' :
                          client.plan === 'Basic' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {client.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-xs">{client.paymentDate}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className={`text-xs font-bold ${client.remainingDays <= 5 ? 'text-red-400' : 'text-emerald-400'}`}>
                            {client.remainingDays} Days
                          </span>
                          <div className="w-16 bg-neutral-800 rounded-full h-1">
                            <div 
                              className={`h-1 rounded-full ${client.remainingDays <= 5 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                              style={{ width: `${Math.min(100, (client.remainingDays / 30) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${client.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                          <span className={client.status === 'Active' ? 'text-gray-300' : 'text-gray-500'}>{client.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-emerald-400 hover:text-emerald-300 font-medium">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'charges' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
            <div className="bg-neutral-900 border border-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-red-400" />
                Monthly Operating Charges
              </h3>
              
              <div className="space-y-6">
                {chargesData.map((charge, idx) => (
                  <div key={idx} className="border border-transparent">
                    <div 
                      className={`flex justify-between items-end mb-2 ${charge.subCharges ? 'cursor-pointer group' : ''}`}
                      onClick={() => {
                        if (charge.subCharges) {
                          setExpandedCharge(expandedCharge === charge.name ? null : charge.name);
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {charge.subCharges && (
                          <span className="text-gray-400 group-hover:text-white transition-colors">
                            {expandedCharge === charge.name ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          </span>
                        )}
                        <span className="text-sm font-medium text-gray-300">{charge.name}</span>
                      </div>
                      <span className="text-sm font-bold text-white">{charge.amount}</span>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-2">
                      <div className={`${charge.color} h-2 rounded-full`} style={{ width: `${charge.percent}%` }}></div>
                    </div>
                    
                    {/* Sub charges expandable section */}
                    <AnimatePresence>
                      {charge.subCharges && expandedCharge === charge.name && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pl-6 space-y-4 border-l-2 border-white/5"
                        >
                          {charge.subCharges.map((sub, subIdx) => (
                            <div key={subIdx}>
                              <div className="flex justify-between items-end mb-1">
                                <span className="text-xs font-medium text-gray-400">{sub.name}</span>
                                <span className="text-xs font-semibold text-gray-300">{sub.amount}</span>
                              </div>
                              <div className="w-full bg-neutral-800/50 rounded-full h-1">
                                <div className={`${charge.color} h-1 rounded-full opacity-70`} style={{ width: `${sub.percent}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-red-400 uppercase tracking-widest">Total Monthly Charges</h4>
                    <p className="text-sm text-gray-400 mt-1">Estimated for current month</p>
                  </div>
                  <div className="text-3xl font-bold text-white">40,200 TND</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Client Management Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-neutral-800/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <UserPlus className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Client Management</h3>
                      <p className="text-xs text-gray-500">Add a new member or update existing records.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                </div>

                {/* Form Content */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-neutral-800 border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Date of Birth</label>
                    <input type="date" className="w-full bg-neutral-800 border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full bg-neutral-800 border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                    <input type="tel" placeholder="+216 -- --- ---" className="w-full bg-neutral-800 border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Member Relationship</label>
                    <div className="flex gap-3">
                      <button className="flex-1 py-3 px-4 bg-neutral-800 border border-white/5 hover:border-blue-500/50 hover:bg-neutral-700 text-gray-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                        <UserPlus className="h-4 w-4 text-blue-400" />
                        Add Linked Member (Family / Corporate)
                      </button>
                      <button className="flex-1 py-3 px-4 bg-neutral-800 border border-white/5 hover:border-emerald-500/50 hover:bg-neutral-700 text-gray-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                        <Search className="h-4 w-4 text-emerald-400" />
                        Search Existing Member
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Membership Plan</label>
                    <select className="w-full bg-neutral-800 border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none">
                      <option>Basic Plan</option>
                      <option>Pro Plan</option>
                      <option>Elite Plan</option>
                      <option>Corporate Plan</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Face ID Enrollment</label>
                    <div className="flex flex-col gap-3 py-1">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-1.5 bg-neutral-800 border border-white/10 rounded-lg text-xs font-medium text-gray-300 hover:bg-neutral-700 transition-colors">
                          <Activity className="h-3 w-3 text-emerald-400" />
                          Scan Face
                        </button>
                        <span className="text-[10px] text-gray-500 font-medium italic">Not Registered</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-1.5 bg-neutral-800 border border-white/10 rounded-lg text-xs font-medium text-gray-300 hover:bg-neutral-700 transition-colors">
                          <Activity className="h-3 w-3 text-blue-400" />
                          Scan Face
                        </button>
                        <span className="text-[10px] text-gray-500 font-medium italic">Not Registered</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Payment Date</label>
                    <input type="date" className="w-full bg-neutral-800 border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Duration (Months)</label>
                    <div className="relative">
                      <select 
                        value={selectedDuration}
                        onChange={(e) => setSelectedDuration(e.target.value)}
                        className="w-full bg-neutral-800 border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="1">1 Month</option>
                        <option value="3">3 Months</option>
                        <option value="6">6 Months</option>
                        <option value="12">12 Months (Annual)</option>
                        <option value="other">Other / Custom</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  {selectedDuration === 'other' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-2 md:col-span-1"
                    >
                      <label className="text-xs font-bold text-amber-400 uppercase tracking-wider">Custom Duration (Months)</label>
                      <input type="number" placeholder="Enter months..." className="w-full bg-neutral-800 border border-amber-500/20 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-colors" />
                    </motion.div>
                  )}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Membership Price (TND)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" />
                      <input type="number" placeholder="120" className="w-full bg-neutral-800 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-white/10 bg-neutral-800/30 flex justify-between items-center gap-4">
                  <button className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-sm font-bold transition-all flex items-center gap-2">
                    <UserMinus className="h-4 w-4" />
                    Delete Client
                  </button>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-gray-300 rounded-xl text-sm font-bold transition-all"
                    >
                      Cancel
                    </button>
                    <button className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      Add / Save
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
