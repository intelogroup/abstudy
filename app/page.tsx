'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import MainContent from '@/components/layout/MainContent';

export default function StudyApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<"grid" | "list">('list');
  const [activeTab, setActiveTab] = useState<"search" | "flashcards" | "timer">('search');
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [responseMode, setResponseMode] = useState<"general" | "hy" | "hdt" | "diff">('general');
  const { theme } = useTheme();

  // New state for Gemini API interaction
  const [geminiResponse, setGeminiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // For theme toggle
  useEffect(() => {
    setMounted(true);
    // Optional: Test GET endpoint on load, if not already done elsewhere
    // fetch('/api/study-agent').then(res => res.json()).then(data => console.log('API GET test:', data.message));
  }, []);

  const handleSearchSubmit = async () => {
    if (!searchQuery.trim()) {
      console.log("handleSearchSubmit: searchQuery is empty, returning.");
      return;
    }

    setIsLoading(true);
    setApiError(null);
    setGeminiResponse('');

    const requestPayload = { query: searchQuery };
    const requestBodyString = JSON.stringify(requestPayload);

    console.log("handleSearchSubmit: searchQuery:", searchQuery);
    console.log("handleSearchSubmit: requestPayload:", requestPayload);
    console.log("handleSearchSubmit: requestBodyString:", requestBodyString);

    try {
      const res = await fetch('/api/study-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBodyString,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch response from agent');
      }

      const data = await res.json();
      setGeminiResponse(data.response);
    } catch (err: any) {
      setApiError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Main Content */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <MainContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          responseMode={responseMode}
          setResponseMode={setResponseMode}
          // Pass new props for Gemini interaction
          geminiResponse={geminiResponse}
          isLoading={isLoading}
          apiError={apiError}
          onSearchSubmit={handleSearchSubmit} // Renamed for clarity, was handleSearchSubmit
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
