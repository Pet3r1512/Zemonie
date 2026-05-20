import { HoverEffect } from "@/components/ui/aceternity/CardHoverEffect";
import { Calendar, ChartNoAxesCombined, Tag } from "lucide-react";
import { ReactNode } from "react";

export interface FeatureCardData {
  icon: ReactNode;
  title: string;
  desc: string;
}

const ICON_CLASSNAME = "text-primary";

const features: FeatureCardData[] = [
  {
    icon: <Calendar className={ICON_CLASSNAME} />,
    title: "Smart Icon Tracking",
    desc: "Set up your salary schedule and recurring income. Clario automatically adds them on the right dates.",
  },
  {
    icon: <Tag className={ICON_CLASSNAME} />,
    title: "Expense Categorization",
    desc: "Label your expenses for better tracking. Organize spending into categories like food, entertainment, and more.",
  },
  {
    icon: <ChartNoAxesCombined className={ICON_CLASSNAME} />,
    title: "Visual Insights",
    desc: "Beautiful charts and graphs help you understand your spending habits and financial patterns.",
  },
];

export default function FeatureCards() {
  return <HoverEffect className="mt-14 lg:mt-0" items={features} />;
}
