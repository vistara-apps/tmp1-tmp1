
'use client';

import { useState, useEffect } from 'react';
import { useNotification } from '@coinbase/onchainkit/minikit';

interface FanStats {
  totalFans: number;
  topFanEngagement: number;
  avgEngagement: number;
  recentGrowth: number;
}

export default function FanAnalytics() {
  const [stats, setStats] = useState<FanStats | null>(null);
  const [loading, setLoading] = useState(true);
  const sendNotification = useNotification();

  useEffect(() => {
    // Simulate loading fan analytics
    const timer = setTimeout(() => {
      setStats({
        totalFans: 1247,
        topFanEngagement: 94,
        avgEngagement: 23,
        recentGrowth: 12
      });
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleNotifyTopFans = async () => {
    await sendNotification({
      title: 'Top Fan Appreciation! 💜',
      body: 'Your biggest supporters have been recognized!'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Fan Analytics</h2>
        <button
          onClick={handleNotifyTopFans}
          className="bg-farcaster-purple hover:bg-farcaster-light text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Notify Top Fans
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">👥</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Fans</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalFans.toLocaleString()}</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">⭐</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Top Fan Score</span>
          </div>
          <div className="text-2xl font-bold text-farcaster-purple">{stats?.topFanEngagement}%</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">📊</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Engagement</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.avgEngagement}%</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">📈</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Growth</span>
          </div>
          <div className="text-2xl font-bold text-green-600">+{stats?.recentGrowth}%</div>
        </div>
      </div>

      {/* Fan Engagement Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Engagement Overview</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Likes</span>
              <span className="font-medium">78%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="engagement-bar h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Recasts</span>
              <span className="font-medium">45%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="engagement-bar h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Comments</span>
              <span className="font-medium">62%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="engagement-bar h-2 rounded-full" style={{ width: '62%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
