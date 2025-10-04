"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Eye,
  EyeOff,
  Calendar,
  User,
} from "lucide-react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  isPublished: boolean;
  imageUrl: string;
  tags: string[];
  readTime: number;
}

const mockArticles: NewsArticle[] = [
  {
    id: "1",
    title: "LLCCUE wins global innovation grant",
    excerpt: "Our immersive service lab secured international recognition for its sustainable AI initiative.",
    content: "Full article content here...",
    author: "Sarah Smith",
    publishedAt: "2024-12-15",
    isPublished: true,
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&h=250&fit=crop",
    tags: ["Innovation", "AI", "Sustainability"],
    readTime: 3,
  },
  {
    id: "2",
    title: "Lionism 4.0 workshop empowers 120 youth",
    excerpt: "A transformative session blending leadership micro-learning with interactive holographic stories.",
    content: "Full article content here...",
    author: "John Doe",
    publishedAt: "2024-12-10",
    isPublished: true,
    imageUrl: "https://images.unsplash.com/photo-1529336953121-497c3c8685f8?w=400&h=250&fit=crop",
    tags: ["Leadership", "Workshop", "Youth"],
    readTime: 5,
  },
  {
    id: "3",
    title: "Project Aurora lights up communities",
    excerpt: "Smart solar pods and ambient tech art installations redefining community spaces.",
    content: "Full article content here...",
    author: "Mike Johnson",
    publishedAt: "2024-12-08",
    isPublished: false,
    imageUrl: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=400&h=250&fit=crop",
    tags: ["Environment", "Technology", "Community"],
    readTime: 4,
  },
];

export default function NewsManagement() {
  const [articles, setArticles] = useState<NewsArticle[]>(mockArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "published" && article.isPublished) ||
      (filterStatus === "draft" && !article.isPublished);

    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id: string) => {
    setArticles(articles.filter((article) => article.id !== id));
  };

  const handleTogglePublish = (id: string) => {
    setArticles(
      articles.map((article) =>
        article.id === id
          ? { ...article, isPublished: !article.isPublished }
          : article
      )
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <SectionHeading
          eyebrow="News & Media"
          title="Manage Content"
          subtitle="Create and manage news articles, blog posts, and media content"
        />
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/20 px-6 py-3 text-sm font-semibold text-sky-200 transition hover:border-sky-400/80 hover:bg-sky-500/30"
        >
          <Plus className="h-4 w-4" />
          New Article
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 pl-12 pr-4 py-3 text-sm text-slate-100 placeholder-slate-400 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          />
        </div>
        <div className="flex gap-2">
          {["all", "published", "draft"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as "all" | "published" | "draft")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition capitalize ${
                filterStatus === status
                  ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                  : "border border-white/10 bg-slate-900/70 text-slate-300 hover:border-sky-400/60"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <GlassCard className="group overflow-hidden">
              {/* Article Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  width={400}
                  height={192}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/10 via-sky-500/20 to-slate-900/60" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                      article.isPublished
                        ? "bg-green-500/20 text-green-300 backdrop-blur-sm"
                        : "bg-yellow-500/20 text-yellow-300 backdrop-blur-sm"
                    }`}
                  >
                    {article.isPublished ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    {article.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-100 mb-2 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-sm text-slate-300/80 mb-3 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-sky-500/10 text-sky-300/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                  </div>
                  <span>{article.readTime} min read</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTogglePublish(article.id)}
                    className="flex-1 rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-sky-400/60 hover:bg-slate-900/80"
                  >
                    {article.isPublished ? "Unpublish" : "Publish"}
                  </button>
                  <button className="rounded-lg border border-white/10 bg-slate-900/70 p-2 text-slate-300 transition hover:border-blue-400/60 hover:bg-slate-900/80">
                    <Edit className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="rounded-lg border border-white/10 bg-slate-900/70 p-2 text-slate-300 transition hover:border-red-400/60 hover:bg-slate-900/80"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Add Article Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <GlassCard className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-slate-100 mb-4">
                Create New Article
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Article Title
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    placeholder="Enter article title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Excerpt
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    placeholder="Brief description of the article"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Content
                  </label>
                  <textarea
                    rows={8}
                    className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    placeholder="Write your article content here..."
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                      placeholder="Author name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                      placeholder="Innovation, Leadership, Community"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="publish"
                    className="rounded border-white/10 bg-slate-900/70 text-sky-500 focus:border-sky-500/70 focus:ring-2 focus:ring-sky-500/40"
                  />
                  <label htmlFor="publish" className="text-sm text-slate-300">
                    Publish immediately
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-400/60 hover:bg-slate-900/80"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg border border-sky-500/40 bg-sky-500/20 px-4 py-2 text-sm font-medium text-sky-200 transition hover:border-sky-400/80 hover:bg-sky-500/30"
                  >
                    Create Article
                  </button>
                </div>
              </form>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}