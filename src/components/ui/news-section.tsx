"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, RefreshCw, AlertCircle, ExternalLink } from "lucide-react";
import { NewsCard, NewsCardSkeleton } from "./news-card";
import { GlassCard } from "./glass-card";
import { SectionHeading } from "./section-heading";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  image?: string;
  source: string;
  category: string;
  publishedDate: string;
  url: string;
}

interface NewsResponse {
  articles: NewsArticle[];
  total: number;
  lastUpdated: string;
  categories: string[];
  error?: string;
}

const CATEGORIES = [
  { value: "all", label: "All News", color: "from-blue-500 to-cyan-500" },
  { value: "Official", label: "Official", color: "from-purple-500 to-pink-500" },
  { value: "Magazine", label: "Magazine", color: "from-green-500 to-emerald-500" },
  { value: "Regional", label: "Regional", color: "from-orange-500 to-red-500" },
  { value: "Humanitarian", label: "Humanitarian", color: "from-indigo-500 to-purple-500" }
];

const LOADING_SKELETONS = 6;

export function NewsSection() {
  const [newsData, setNewsData] = useState<NewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  const fetchNews = async (showRefreshAnimation = false) => {
    try {
      if (showRefreshAnimation) setRefreshing(true);

      const url = selectedCategory === "all"
        ? "/api/news?limit=12"
        : `/api/news?category=${selectedCategory}&limit=12`;

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setNewsData(data);
        setError(null);
      } else {
        throw new Error(data.error || "Failed to fetch news");
      }
    } catch (err) {
      console.error("News fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to load news");
      setNewsData(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchNews();
  }, [selectedCategory]);

  const handleRefresh = () => {
    fetchNews(true);
  };

  const filteredArticles = newsData?.articles || [];

  return (
    <section id="news" className="relative py-20 pb-24">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Lions News Hub"
          description="Stay updated with the latest from Lions International and service communities worldwide"
          gradient="from-blue-400 to-cyan-400"
        />

        {/* Category Filter and Refresh */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-16 mt-12">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {CATEGORIES.map((category) => (
              <motion.button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.value
                    ? "text-white"
                    : "text-white/60 hover:text-white/80"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {selectedCategory === category.value && (
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${category.color}`}
                    layoutId="activeCategory"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  {category.value === "all" && <Filter className="w-4 h-4" />}
                  {category.label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Refresh Button */}
          <motion.button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </motion.button>
        </div>

        {/* News Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 mt-8">
          <AnimatePresence mode="wait">
            {loading ? (
              // Loading Skeletons
              Array.from({ length: LOADING_SKELETONS }).map((_, index) => (
                <NewsCardSkeleton key={`skeleton-${index}`} index={index} />
              ))
            ) : error ? (
              // Error State
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="col-span-full"
              >
                <GlassCard className="text-center py-12">
                  <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Unable to Load News
                  </h3>
                  <p className="text-white/70 mb-6 max-w-md mx-auto">
                    {error}
                  </p>
                  <motion.button
                    onClick={handleRefresh}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Try Again
                  </motion.button>
                </GlassCard>
              </motion.div>
            ) : filteredArticles.length === 0 ? (
              // Empty State
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="col-span-full"
              >
                <GlassCard className="text-center py-12">
                  <ExternalLink className="w-16 h-16 text-white/40 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white/80 mb-2">
                    No News Available
                  </h3>
                  <p className="text-white/60 max-w-md mx-auto">
                    No articles found for the selected category. Try selecting a different category or check back later.
                  </p>
                </GlassCard>
              </motion.div>
            ) : (
              // News Articles
              filteredArticles.map((article, index) => (
                <NewsCard key={article.id} article={article} index={index} />
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Last Updated Info */}
        {newsData && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <p className="text-white/50 text-sm">
              Last updated: {new Date(newsData.lastUpdated).toLocaleString()}
            </p>
            {newsData.total > filteredArticles.length && (
              <p className="text-white/40 text-xs mt-1">
                Showing {filteredArticles.length} of {newsData.total} articles
              </p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}