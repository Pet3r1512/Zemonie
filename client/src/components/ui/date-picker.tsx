"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./button";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Transaction } from "../Dashboard/Overall/Forms/IncomeForm";

export function DatePicker() {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  const { setValue } = useFormContext<Transaction>();

  const today = new Date();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild id="date" autoFocus={open}>
        <Button
          type="button"
          variant="outline"
          className="w-64 justify-start text-left font-normal pointer-events-auto"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : format(today, "PPP")}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="h-auto w-64 p-0"
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
            setValue("createdAt", d?.toISOString());
          }}
          className="w-full h-83 lg:h-75 z-100 bg-white rounded-lg pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );
}
