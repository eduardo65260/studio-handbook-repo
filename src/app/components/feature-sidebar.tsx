"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Icons } from './icons';
import { Button } from '@/components/ui/button';

export type Feature = {
  id: string;
  title: string;
  icon: string;
  content: string;
};

type FeatureSidebarProps = {
  features: Feature[];
  selectedFeatureId: string;
  onSelectFeature: (feature: Feature) => void;
};

export function FeatureSidebar({
  features,
  selectedFeatureId,
  onSelectFeature,
}: FeatureSidebarProps) {

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-primary" asChild>
            <div className="p-1">
              <Icons.Bot className="size-6" />
            </div>
          </Button>
          <h2 className="text-lg font-semibold font-headline tracking-tight text-sidebar-foreground">
            Firebase Studio Handbook
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {features.map((feature) => {
            const IconComponent = Icons[feature.icon as keyof typeof Icons] || Icons.ListChecks;
            return (
              <SidebarMenuItem key={feature.id}>
                <SidebarMenuButton
                  onClick={() => onSelectFeature(feature)}
                  isActive={selectedFeatureId === feature.id}
                  className="justify-start"
                >
                  <IconComponent className="size-4" />
                  <span>{feature.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
