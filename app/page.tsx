
'use client';

import { useMiniKit, useAddFrame, useOpenUrl, useViewProfile, useNotification } from '@coinbase/onchainkit/minikit';
import { Name, Identity, Address, Avatar } from '@coinbase/onchainkit/identity';
import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet';
import { useEffect, useState, useCallback, useMemo } from 'react';
import FanAnalytics from './components/FanAnalytics';
import TopFansList from './components/TopFansList';
import EngagementMetrics from './components/EngagementMetrics';

export default function FarcasterFanfinder() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const viewProfile = useViewProfile();
  const sendNotification = useNotification();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
    
    if (frameAdded) {
      await sendNotification({
        title: 'Fanfinder Added! 🎉',
        body: 'Start discovering your biggest fans on Farcaster'
      });
    }
  }, [addFrame, sendNotification]);

  const handleViewProfile = useCallback(() => {
    viewProfile();
  }, [viewProfile]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <button
          onClick={handleAddFrame}
          className="bg-farcaster-purple hover:bg-farcaster-light text-white font-semibold text-sm px-3 py-1 rounded-lg transition-colors"
        >
          Save
        </button>
      );
    }
    return null;
  }, [context, handleAddFrame]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-farcaster-purple to-base-blue rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Fanfinder</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Wallet className="z-10">
            <ConnectWallet>
              <Name className="text-inherit" />
            </ConnectWallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
              </Identity>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
          
          {saveFrameButton}
          
          <button
            onClick={handleViewProfile}
            className="text-farcaster-purple hover:text-farcaster-light font-semibold text-sm transition-colors"
          >
            Profile
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        {[
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'fans', label: 'Top Fans', icon: '⭐' },
          { id: 'metrics', label: 'Metrics', icon: '📈' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-farcaster-purple border-b-2 border-farcaster-purple bg-white/70 dark:bg-gray-800/70'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="p-4">
        {activeTab === 'overview' && <FanAnalytics />}
        {activeTab === 'fans' && <TopFansList />}
        {activeTab === 'metrics' && <EngagementMetrics />}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => openUrl('https://base.org')}
          className="w-full bg-gradient-to-r from-base-blue to-farcaster-purple text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
        >
          Built on Base 🔵
        </button>
      </div>
    </div>
  );
}
