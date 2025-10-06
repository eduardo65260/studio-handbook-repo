"use client";

import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { FeatureSidebar } from './components/feature-sidebar';
import type { Feature } from './components/feature-sidebar';
import { FeatureDisplay } from './components/feature-display';
import featuresData from './data/features.json';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const [selectedFeature, setSelectedFeature] = useState<Feature>(featuresData[0]);

  return (
    <SidebarProvider>
      <FeatureSidebar
        features={featuresData as Feature[]}
        selectedFeatureId={selectedFeature.id}
        onSelectFeature={setSelectedFeature}
      />
      <SidebarInset>
        <FeatureDisplay feature={selectedFeature} images={PlaceHolderImages} />
      </SidebarInset>
    </SidebarProvider>
  );
}
