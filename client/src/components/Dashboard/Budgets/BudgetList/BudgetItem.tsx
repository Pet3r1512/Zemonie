import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { Repeat, ShoppingBag } from "lucide-react";

export default function BudgetItem() {
  //   const [progress, setProgress] = useState<number>(80);
  return (
    <Card className="p-5 shadow-xl dark:shadow-dark-bg lg:hover:brightness-110 transition-all duration-150 ease-linear">
      <div className="flex items-center justify-between">
        <div>
          <article className="flex items-center gap-x-1.5">
            <ShoppingBag className="text-violet-500" />
            <p className="text-lg font-bold text-black dark:text-white">Shopping</p>
          </article>
          <p className="text-gray-700 dark:text-gray-500">June 2026</p>
        </div>
        <Badge
          variant={"outline"}
          className="text-green-500 dark:text-green-400 space-x-1 border-green-500 dark:border-green-400"
        >
          <Repeat size={16} />
          <p>Recurred</p>
        </Badge>
      </div>
      <div className="w-full">
        <p></p>
        <Field className="w-full">
          <FieldLabel htmlFor="progress-upload">
            <span>{"$1200 spent"}</span>
            <span className="ms-auto">{"$1500 budget"}</span>
          </FieldLabel>
          <Progress value={66} id="progress-upload" className="bg-primary w-full" />
          <FieldLabel htmlFor="progress-upload">
            <span>{66}%</span>
            <span className="ms-auto text-green-500 dark:text-green-400">{"$300 remaining"}</span>
          </FieldLabel>
        </Field>
      </div>
    </Card>
  );
}
