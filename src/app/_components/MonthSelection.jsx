"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { addMonths } from "date-fns"; //shadcn k saath install hogayi
import { useState } from "react";
import moment from "moment";
import { Calendar } from "@/components/ui/calendar";

const MonthSelection = ({selectedMonth}) => {
  const today = new Date();
  const nextMonths = addMonths(new Date(), 0);
  const [month, setMonth] = useState(nextMonths);
  return (
    <div className="my-2">
      <Popover>
      {/* Hydration error aa rha tha isliye asChild use kiya */}
        <PopoverTrigger asChild>  
          <Button variant="outline" className="flex gap-3 items-center">
            <CalendarDays />
            {moment(month).format("MMMM YYYY")}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            month={month}
            onMonthChange={(value) => {
              selectedMonth(value);
              setMonth(value);
            }}
            className="flex flex-1 justify-center"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MonthSelection;
