import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IncomeForm } from "./IncomeForm";
import { ExpenseForm } from "./ExpenseForm";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";

type TabValue = "income" | "expense";

export default function NewTransactionForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabValue>("income");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        asChild
        onClick={(e) => {
          e.currentTarget.blur();
        }}
      >
        <Button className="bg-primary hover:bg-primary/80 dark:bg-primary/80 dark:hover:bg-primary/90 dark:text-white text-white rounded-2xl text-lg h-10.5">
          + Add
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={() => {}}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-sm bg-white dark:bg-dark-elevated pointer-events-auto"
      >
        <DialogHeader>
          <DialogTitle>{activeTab === "income" ? "Add Income" : "Add Expense"}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only"></DialogDescription>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)}>
          <TabsList className="flex items-center gap-x-2.5">
            <TabsTrigger
              className="flex-1 bg-gray-600 border-2 border-transparent
             data-[state=active]:border-b-green-500
             data-[state=active]:bg-b-green-500/20"
              value="income"
            >
              <ArrowDown />
              Income
            </TabsTrigger>
            <TabsTrigger
              className="flex-1 bg-gray-600 border-2 border-transparent
             data-[state=active]:border-b-red-500
             data-[state=active]:bg-b-red-500/20"
              value="expense"
            >
              <ArrowUp />
              Expense
            </TabsTrigger>
          </TabsList>
          <TabsContent value="income">
            <IncomeForm onClose={() => setIsOpen(false)} />
          </TabsContent>
          <TabsContent value="expense">
            <ExpenseForm onClose={() => setIsOpen(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
