"use client";

import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DatePickerProps = {
  id: string;
  name: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function parseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return year && month && day ? new Date(year, month - 1, day) : undefined;
}

function toDateValue(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function DatePicker({ id, name, required, value = "", onChange, "aria-invalid": invalid, "aria-describedby": describedBy }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(() => parseDate(value) ?? new Date());
  const selected = parseDate(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = [...Array(firstDay.getDay()).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  function changeMonth(delta: number) {
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));
  }

  function chooseDay(day: number) {
    const chosen = new Date(month.getFullYear(), month.getMonth(), day);
    if (chosen < today) return;
    onChange?.(toDateValue(chosen));
    setOpen(false);
  }

  return (
    <>
      <input type="hidden" name={name} value={value} readOnly />
      <Popover open={open} onOpenChange={(next) => {
        if (next) setMonth(parseDate(value) ?? new Date());
        setOpen(next);
      }}>
        <PopoverTrigger asChild>
          <button
            type="button"
            id={id}
            aria-required={required}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-card px-3.5 text-left text-sm text-foreground shadow-xs outline-none transition-[border-color,box-shadow] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/30"
          >
            <span className={cn(!selected && "text-muted-foreground")}>
              {selected ? selected.toLocaleDateString("en-NG", { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : "Choose a date"}
            </span>
            <CalendarDays aria-hidden className="size-4 text-brand" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[min(20rem,calc(100vw-2rem))] p-3">
          <div className="mb-3 flex items-center justify-between">
            <Button type="button" variant="ghost" size="icon-sm" onClick={() => changeMonth(-1)} aria-label="Previous month">
              <ChevronLeft />
            </Button>
            <p className="font-medium text-foreground">
              {month.toLocaleDateString("en-NG", { month: "long", year: "numeric" })}
            </p>
            <Button type="button" variant="ghost" size="icon-sm" onClick={() => changeMonth(1)} aria-label="Next month">
              <ChevronRight />
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {weekdays.map((day) => (
              <span key={day} className="py-1 text-xs font-medium text-muted-foreground">{day}</span>
            ))}
            {cells.map((day, index) => {
              if (day === null) return <span key={`blank-${index}`} aria-hidden className="size-9" />;
              const date = new Date(month.getFullYear(), month.getMonth(), day);
              const dateValue = toDateValue(date);
              const isSelected = dateValue === value;
              const isToday = dateValue === toDateValue(today);
              const isPast = date < today;
              return (
                <button
                  key={dateValue}
                  type="button"
                  disabled={isPast}
                  aria-label={date.toLocaleDateString("en-NG", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  aria-pressed={isSelected}
                  onClick={() => chooseDay(day)}
                  className={cn(
                    "size-9 cursor-pointer rounded-md text-sm transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-35",
                    isSelected && "bg-primary font-semibold text-primary-foreground hover:bg-primary/90",
                    isToday && !isSelected && "border border-champagne text-brand",
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
