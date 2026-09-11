import ThemeToggle from "@/components/ThemeToggle";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Settings } from "lucide-react";
import Security from "./Security";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

export default function SettingsContainer() {
  const [latestTab, setLatestTab] = useState<string>("");
  return (
    <Card className="p-5 h-full lg:min-h-[50vh]">
      <Tabs
        defaultValue="security"
        orientation="vertical"
        className="flex flex-col md:flex-row gap-6"
      >
        <TabsList className="flex flex-row md:flex-col h-full lg:min-h-full w-full md:w-48 justify-start items-stretch bg-transparent p-0 gap-2">
          <TabsTrigger
            value="security"
            className="justify-start gap-2 px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg"
          >
            <Lock className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger
            value="preferences"
            className="justify-start gap-2 px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg"
          >
            <Settings className="h-4 w-4" />
            <span>Preferences</span>
          </TabsTrigger>
        </TabsList>
        <div className="flex-1 min-w-0">
          <TabsContent value="security" className="mt-0">
            <Security />
          </TabsContent>
          <TabsContent value="preferences" className="mt-0 space-y-5">
            <p className="lg:text-lg font-bold text-secondary">App Preferences</p>
            <Separator className="dark:bg-white/15 md:max-w-xl lg:max-w-2xl" />
            <div className="flex items-center justify-between md:max-w-xl lg:max-w-2xl px-6 md:px-10">
              <p>Theme</p>
              <ThemeToggle />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
}
