"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as any;

interface VideoPlayerProps {
    url: string;
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
    return (
        <div className="absolute top-0 left-0 w-full h-full">
            {/* @ts-ignore - react-player types are sometimes incomplete when dynamically imported */}
            <ReactPlayer
                url={url}
                width="100%"
                height="100%"
                controls={true}
                light={false}
                playing={false}
            />
        </div>
    );
}
