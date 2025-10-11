"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, ExternalLink, Clock } from "lucide-react";
import Image from "next/image";
import { GlassCard } from "./glass-card";
import { cn } from "@/lib/utils";

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

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const getReadingTime = (text: string) => {
  const wordsPerMinute = 200;
  const words = text.split(' ').length;
  return Math.ceil(words / wordsPerMinute);
};

export function NewsCard({ article, index }: NewsCardProps) {
  const readingTime = getReadingTime(article.description);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <GlassCard className="group h-full flex flex-col p-0 overflow-hidden glass-card-hover rounded-t-3xl">
        {/* Article Image */}
        <div className="relative h-56 overflow-hidden rounded-t-3xl">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectPosition: 'center' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/logo.png";
              }}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center rounded-t-3xl">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <ExternalLink className="w-10 h-10 text-white/60" />
              </div>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-xl border border-white/30 bg-white/15 text-white/90 shadow-lg">
              {article.category}
            </span>
          </div>

          {/* Reading Time Badge */}
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-xl border border-white/20 bg-black/30 text-white/80 flex items-center gap-1 shadow-lg">
              <Clock className="w-3 h-3" />
              {readingTime}m
            </span>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Article Content */}
        <div className="flex-1 flex flex-col p-6 relative">
          {/* Liquid Card Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Source and Date */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/70 font-medium">
              {article.source}
            </span>
            <span className="text-xs text-white/50 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(article.publishedDate)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 leading-tight group-hover:text-blue-300 transition-colors duration-300">
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-white/60 text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
            {article.description}
          </p>

          {/* Read More Link */}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 liquid-button",
              "text-blue-300 border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-blue-200"
            )}
          >
            Read More
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
        </div>
      </GlassCard>
    </motion.div>
  );
}

interface NewsCardSkeletonProps {
  index: number;
}

export function NewsCardSkeleton({ index }: NewsCardSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="h-full"
    >
      <GlassCard className="h-full flex flex-col p-0 overflow-hidden rounded-t-3xl">
        {/* Image Skeleton */}
        <div className="h-56 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 animate-pulse relative rounded-t-3xl">
          <div className="absolute top-3 left-3 h-6 w-16 bg-white/10 rounded-full animate-pulse" />
          <div className="absolute top-3 right-3 h-6 w-12 bg-white/10 rounded-full animate-pulse" />
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 flex flex-col p-6 space-y-4">
          <div className="flex justify-between">
            <div className="h-4 w-24 bg-white/10 rounded-full animate-pulse" />
            <div className="h-4 w-20 bg-white/10 rounded-full animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-6 bg-white/10 rounded animate-pulse w-3/4" />
            <div className="h-6 bg-white/10 rounded animate-pulse w-1/2" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-white/10 rounded animate-pulse w-full" />
            <div className="h-4 bg-white/10 rounded animate-pulse w-5/6" />
            <div className="h-4 bg-white/10 rounded animate-pulse w-4/6" />
          </div>
          <div className="h-10 w-24 bg-white/10 rounded-full animate-pulse mt-auto" />
        </div>
      </GlassCard>
    </motion.div>
  );
}