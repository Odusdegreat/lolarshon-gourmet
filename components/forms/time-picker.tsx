"use client";

import { useState } from "react";
import { Clock3 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type TimePickerProps = {
  id: string;
  name: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

function formatTime(value: string) {
  if (!value) return "";
  const [hours, minutes] = value.split(":").map(Number);
  const hour = hours % 12 || 12;
  return `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;
}

export function TimePicker({ id, name, required, value = "", onChange, "aria-invalid": invalid, "aria-describedby": describedBy }: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const [hour, setHour] = useState(() => value ? String((Number(value.slice(0, 2)) % 12) || 12) : "");
  const [minute, setMinute] = useState(() => value ? value.slice(3, 5) : "");

  function updateTime(nextHour: string, nextMinute: string) {
    setHour(nextHour);
    setMinute(nextMinute);
    if (!nextHour || !nextMinute) return;
    const hour24 = Number(nextHour) === 12 ? 12 : Number(nextHour) + 12;
    onChange?.(`${String(hour24).padStart(2, "0")}:${nextMinute}`);
  }

  return (
    <>
      <input type="hidden" name={name} value={value} readOnly />
      <Popover open={open} onOpenChange={(next) => {
        if (next && value) {
          setHour(String((Number(value.slice(0, 2)) % 12) || 12));
          setMinute(value.slice(3, 5));
        }
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
            <span className={cn(!value && "text-muted-foreground")}>{value ? formatTime(value) : "Choose a time"}</span>
            <Clock3 aria-hidden className="size-4 text-brand" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-72 space-y-3">
          <div>
            <p className="text-sm font-medium">Choose a time</p>
            <p className="mt-1 text-xs text-muted-foreground">Available daily from 1:00 pm to 11:00 pm.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Select aria-label="Hour" value={hour} onChange={(event) => updateTime(event.target.value, minute)}>
              <option value="">Hour</option>
              {Array.from({ length: 11 }, (_, index) => index + 1).map((item) => (
                <option key={item} value={String(item)}>{String(item).padStart(2, "0")}</option>
              ))}
            </Select>
            <Select aria-label="Minutes" value={minute} onChange={(event) => updateTime(hour, event.target.value)}>
              <option value="">Minutes</option>
              {hour === "11" ? <option value="00">00</option> : <><option value="00">00</option><option value="30">30</option></>}
            </Select>
          </div>
          <p className="rounded-md bg-secondary/70 px-3 py-2 text-center text-sm font-medium text-brand">
            {hour && minute ? `${String(Number(hour)).padStart(2, "0")}:${minute} PM` : "Select an hour and minutes"}
          </p>
        </PopoverContent>
      </Popover>
    </>
  );
}
