
'use client';

import { useState, useEffect } from 'react';
import { useViewProfile } from '@coinbase/onchainkit/minikit';

interface Fan {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  engagementScore: number;
  totalInteractions: number;
  isTopFan: boolean;
  joinedDate: string;
}

export default function TopFansList() {
  const [fans, setFans] = useState<Fan[]>([]);
  const [loading, setLoading] = useState(true);
  const viewProfile = useViewProfile();

  useEffect(() => {
    // Simulate loading top fans data
    const timer = setTimeout(() => {
      setFans([
        {
          id: '1',
          username: 'cryptofan.eth',
          displayName: 'Crypto Fan',
          avatar: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/e5b8f847-f1e1-4e8e-91e4-0c3de4df8a00/original',
          engagementScore: 94,
          totalInteractions: 187,
          isTopFan: true,
          joinedDate: '2024-01-15'
        },
        {
          id: '2',
          username: 'basebuild.fc',
          displayName: 'Base Builder',
          avatar: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/7f7f0a8c-6c3a-4e8e-8e7a-1c3de4df8a00/original',
          engagementScore: 87,
          totalInteractions: 142,
          isTopFan: true,
          joinedDate: '2024-02-03'
        },
        {
          id: '3',
          username: 'degen.lover',
          displayName: 'Degen Lover',
          avatar: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/2f2f0a8c-6c3a-4e8e-8e7a-1c3de4df8a00/original',
          engagementScore: 82,
          totalInteractions: 124,
          isTopFan: false,
          joinedDate: '2024-01-28'
        },
        {
          id: '4',
          username: 'onchain.max',
          displayName: 'Onchain Maxi',
          avatar: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/3f3f0a8c-6c3a-4e8e-8e7a-1c3de4df8a00/original',
          engagementScore: 76,
          totalInteractions: 98,
          isTopFan: false,
          joinedDate: '2024-02-14'
        },
        {
          id: '5',
          username: 'frame.builder',
          displayName: 'Frame Builder',
          avatar: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/4f4f0a8c-6c3a-4e8e-8e7a-1c3de4df8a00/original',
          engagementScore: 73,
          totalInteractions: 89,
          isTopFan: false,
          joinedDate: '2024-03-01'
        }
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleViewFanProfile = (fanId: string) => {
    // In a real app, you'd pass the fan's FID
    viewProfile();
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-20"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Top Fans</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="top-fan-badge px-2 py-1 rounded-full text-xs">TOP FAN</span>
          <span>= 80%+ engagement</span>
        </div>
      </div>

      <div className="space-y-3">
        {fans.map((fan, index) => (
          <div
            key={fan.id}
            className={`fan-card rounded-xl p-4 border transition-all hover:scale-[1.02] ${
              fan.isTopFan 
                ? 'border-yellow-400 shadow-lg shadow-yellow-400/20' 
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-farcaster-purple to-base-blue rounded-full flex items-center justify-center text-white font-bold">
                  {fan.displayName.charAt(0)}
                </div>
                <div className="absolute -top-1 -right-1 bg-white dark:bg-gray-800 rounded-full px-1.5 py-0.5 text-xs font-bold text-gray-900 dark:text-white border">
                  #{index + 1}
                </div>
                {fan.isTopFan && (
                  <div className="absolute -bottom-1 -right-1">
                    <span className="text-lg">⭐</span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{fan.displayName}</h3>
                  {fan.isTopFan && (
                    <span className="top-fan-badge px-2 py-0.5 rounded-full text-xs">TOP FAN</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">@{fan.username}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>{fan.totalInteractions} interactions</span>
                  <span>Since {new Date(fan.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-farcaster-purple">{fan.engagementScore}%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">engagement</div>
                <button
                  onClick={() => handleViewFanProfile(fan.id)}
                  className="text-xs text-base-blue hover:text-farcaster-purple mt-1 font-medium transition-colors"
                >
                  View Profile
                </button>
              </div>
            </div>

            {/* Engagement Progress Bar */}
            <div className="mt-3">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="engagement-bar h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${fan.engagementScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center pt-4">
        <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          Load More Fans
        </button>
      </div>
    </div>
  );
}
