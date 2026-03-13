"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as any;

interface VideoPlayerProps {
    url: string;
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
    return (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
            <video
                src={url}
                controls
                className="w-full h-full object-cover"
                playsInline
                onError={(e) => {
                    const target = e.target as HTMLVideoElement;
                    console.error("Video Playback Error:", {
                        src: target.src,
                        error: target.error,
                        code: target.error?.code,
                        message: target.error?.message
                    });
                }}
            >
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
