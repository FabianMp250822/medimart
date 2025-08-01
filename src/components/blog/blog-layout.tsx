"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, UserCircle, Eye } from "lucide-react";
import { CommentsSection } from "@/components/blog/comments-section";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { Blog } from "@/types/blog";
import { ShareButtons } from "./share-buttons";

interface BlogLayoutProps {
  blog: Blog;
  recentBlogs: Blog[];
  visitCount: number;
}

export function BlogLayout({ blog, recentBlogs, visitCount }: BlogLayoutProps) {
  return (
    <article>
      <div className="relative w-full h-80">
        <Image
          src={blog.image}
          alt={blog.title}
          layout="fill"
          objectFit="cover"
          className="z-0"
          priority
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
          <Link
            href={`/noticias?category=${encodeURIComponent(blog.category)}`}
            className="text-sm uppercase tracking-widest bg-accent/80 px-3 py-1 rounded-full hover:bg-accent transition-colors duration-300 mb-4"
          >
            {blog.category}
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>
                {new Date(blog.date).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <span>{visitCount} Visitas</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex justify-end mb-6">
                <ShareButtons blog={blog} />
            </div>
            <div
              className="prose prose-lg max-w-none prose-h3:text-primary prose-a:text-accent hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            <div className="mt-12">
              <CommentsSection blogId={blog.id} />
            </div>
          </div>
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <BlogSidebar recentBlogs={recentBlogs} />
          </aside>
        </div>
      </div>
    </article>
  );
}
