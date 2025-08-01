
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PlayCircle } from 'lucide-react';

interface Video {
    title: string;
    url: string;
}

interface VideoGalleryProps {
    videos: Video[];
}

export function VideoGallery({ videos }: VideoGalleryProps) {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = (video: Video) => {
        setSelectedVideo(video);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedVideo(null);
    };

    const getYouTubeThumbnail = (url: string) => {
        try {
            const urlParams = new URLSearchParams(new URL(url).search);
            const videoId = urlParams.get('v');
            return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        } catch (error) {
            console.error("Invalid YouTube URL:", url);
            return "https://placehold.co/480x360.png";
        }
    };
    
    const getYouTubeEmbedUrl = (url: string) => {
        try {
            const urlParams = new URLSearchParams(new URL(url).search);
            const videoId = urlParams.get('v');
            return `https://www.youtube.com/embed/${videoId}`;
        } catch (error) {
            return "";
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                    <Card 
                        key={index} 
                        className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                        onClick={() => openDialog(video)}
                    >
                        <div className="relative aspect-video">
                            <Image
                                src={getYouTubeThumbnail(video.url)}
                                alt={video.title}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <PlayCircle className="h-16 w-16 text-white" />
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-semibold text-primary truncate" title={video.title}>
                                {video.title}
                            </h3>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-4xl w-full p-0 border-0">
                    {selectedVideo && (
                        <div className="relative aspect-video">
                            <iframe
                                width="100%"
                                height="100%"
                                src={getYouTubeEmbedUrl(selectedVideo.url)}
                                title={selectedVideo.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="rounded-lg"
                            ></iframe>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
