"use client";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import localISOString from "@/helpers/localISOString";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Transaction } from "../Dashboard/Overall/Forms/IncomeForm";
import { Button } from "./button";

export function DatePicker({ defaultDate }: { defaultDate?: string }) {
  const [date, setDate] = useState<Date | undefined>(
    defaultDate ? new Date(defaultDate) : undefined,
  );
  const [open, setOpen] = useState(false);

  const { setValue } = useFormContext<Transaction>();

  const today = new Date();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild id="date" autoFocus={open}>
        <Button
          type="button"
          variant="outline"
          className="h-9 w-64 justify-start rounded-md border border-gray-200 bg-white px-3 py-1 text-left text-base text-gray-900 font-normal pointer-events-auto md:text-sm dark:border-white/[0.07] dark:bg-[#08080a]/85 dark:text-white"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : format(today, "PPP")}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="h-auto w-64 p-0 z-110"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={date}
          onSelect={(d) => {
            setDate(d);
            setOpen(false);
            setValue("createdAt", d ? localISOString(d) : undefined);
          }}
          className="h-83 lg:h-75 z-100 w-full rounded-[10px] bg-white pointer-events-auto dark:bg-[#08080a]/95 dark:backdrop-blur-xl"
        />
      </PopoverContent>
    </Popover>
  );
}
