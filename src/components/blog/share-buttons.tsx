"use client";

import { Blog } from "@/types/blog";
import { Button } from "../ui/button";
import { Linkedin, Twitter, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface ShareButtonsProps {
  blog: Blog;
}

const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
)

export function ShareButtons({ blog }: ShareButtonsProps) {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    // Ensure this runs only on the client
    setShareUrl(window.location.href);
  }, []);

  if (!shareUrl) return null;

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(blog.title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedTitle}`,
  };

  return (
    <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-foreground mr-2">Compartir:</span>
      <Button
        variant="outline"
        size="icon"
        asChild
        className="text-foreground hover:bg-blue-600 hover:text-white"
      >
        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Compartir en Facebook">
          <FacebookIcon />
        </a>
      </Button>
      <Button
        variant="outline"
        size="icon"
        asChild
        className="text-foreground hover:bg-black hover:text-white"
      >
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Compartir en X">
          <Twitter />
        </a>
      </Button>
      <Button
        variant="outline"
        size="icon"
        asChild
        className="text-foreground hover:bg-green-500 hover:text-white"
      >
        <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Compartir en WhatsApp">
          <MessageCircle />
        </a>
      </Button>
      <Button
        variant="outline"
        size="icon"
        asChild
        className="text-foreground hover:bg-blue-700 hover:text-white"
      >
        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Compartir en LinkedIn">
          <Linkedin />
        </a>
      </Button>
    </div>
  );
}
