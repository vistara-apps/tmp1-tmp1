
'use client';

import { useState, useEffect } from 'react';

interface MetricData {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

export default function EngagementMetrics() {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [timeframe, setTimeframe] = useState('7d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setMetrics([
        {
          label: 'Likes per Cast',
          value: 34.2,
          change: 12.5,
          trend: 'up'
        },
        {
          label: 'Recasts per Cast',
          value: 8.7,
          change: -2.1,
          trend: 'down'
        },
        {
          label: 'Comments per Cast',
          value: 15.3,
          change: 8.9,
          trend: 'up'
        },
        {
          label: 'Fan Retention',
          value: 87.5,
          change: 3.2,
          trend: 'up'
        },
        {
          label: 'New Followers',
          value: 156,
          change: 23.4,
          trend: 'up'
        },
        {
          label: 'Engagement Rate',
          value: 4.8,
          change: 0.3,
          trend: 'stable'
        }
      ]);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [timeframe]);

  const timeframes = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Engagement Metrics</h2>
        
        <div className="flex space-x-2">
          {timeframes.map((tf) => (
            <button
              key={tf.value}
              onClick={() => setTimeframe(tf.value)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                timeframe === tf.value
                  ? 'bg-farcaster-purple text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {metric.label}
                </h3>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.value.toLocaleString()}
                  {metric.label.includes('Rate') || metric.label.includes('Retention') ? '%' : ''}
                </div>
              </div>
              
              <div className="text-2xl">
                {getTrendIcon(metric.trend)}
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-1">
              <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                vs previous {timeframe}
              </span>
            </div>

            {/* Mini chart visualization */}
            <div className="mt-4">
              <div className="flex items-end space-x-1 h-8">
                {Array.from({ length: 7 }, (_, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-sm ${
                      metric.trend === 'up' 
                        ? 'bg-gradient-to-t from-green-400 to-green-300'
                        : metric.trend === 'down'
                        ? 'bg-gradient-to-t from-red-400 to-red-300'
                        : 'bg-gradient-to-t from-gray-400 to-gray-300'
                    }`}
                    style={{
                      height: `${Math.random() * 100}%`,
                      minHeight: '20%'
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Insights Section */}
      <div className="bg-gradient-to-r from-farcaster-purple/10 to-base-blue/10 rounded-xl p-6 border border-farcaster-purple/20">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          📊 Key Insights
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>• Your engagement rate has increased by 12.5% in the last week</p>
          <p>• Top fans are 3x more likely to recast your content</p>
          <p>• Comments peak on weekends, especially Sunday evenings</p>
          <p>• Your most engaging content type: technical tutorials and memes</p>
        </div>
      </div>
    </div>
  );
}
