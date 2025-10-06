"use client"

import React from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import type { Feature } from './feature-sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

type FeatureDisplayProps = {
  feature: Feature | null;
  images: ImagePlaceholder[];
};

export function FeatureDisplay({ feature, images }: FeatureDisplayProps) {
  if (!feature) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <p className="text-muted-foreground">Select a feature to see details.</p>
      </div>
    );
  }

  const renderContent = () => {
    const contentParts = feature.content.split(/(\[img:[a-zA-Z0-9_-]+\])/g).filter(Boolean);

    return contentParts.map((part, index) => {
      const imageMatch = part.match(/\[img:([a-zA-Z0-9_-]+)\]/);
      if (imageMatch) {
        const imageId = imageMatch[1];
        const image = images.find((img) => img.id === imageId);
        if (image) {
          return (
            <div key={index} className="my-6 overflow-hidden rounded-lg border bg-card shadow-sm">
              <Image
                src={image.imageUrl}
                alt={image.description}
                width={800}
                height={600}
                className="w-full object-cover"
                data-ai-hint={image.imageHint}
              />
            </div>
          );
        }
        return null;
      }
      return (
        <React.Fragment key={index}>
          {part.trim().split('\n\n').map((paragraph, pIndex) => (
            <p key={pIndex} className="mb-4 text-foreground/80 leading-relaxed last:mb-0">
              {paragraph}
            </p>
          ))}
        </React.Fragment>
      );
    });
  };

  return (
    <ScrollArea className="h-screen">
      <div className="p-4 sm:p-6 md:p-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-headline text-2xl md:text-3xl">
              <SidebarTrigger className="md:hidden" />
              {feature.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-base">
            {renderContent()}
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
