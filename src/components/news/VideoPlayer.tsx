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
            <ReactPlayer
                url={url}
                controls
                width="100%"
                height="100%"
                className="!absolute inset-0"
                config={{
                    file: {
                        attributes: {
                            controlsList: 'nodownload',
                            className: 'w-full h-full object-cover'
                        }
                    }
                }}
            />
        </div>
    );
}
