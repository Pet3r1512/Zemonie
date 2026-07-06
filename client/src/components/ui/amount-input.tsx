import { CurrencyCode, getCurrencySymbol } from "@/helpers/formatCurrency";
import { cn } from "@/lib/utils";
import { useCallback, useRef, ChangeEvent, FocusEvent } from "react";

type AmountInputProps = {
  value?: number;
  onChange?: (value: number | undefined) => void;
  onBlur?: () => void;
  currency?: CurrencyCode;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
};

const MAX_DECIMALS: Record<CurrencyCode, number> = {
  AUD: 2,
  USD: 2,
  VND: 0,
};

function stripToRaw(value: string): string {
  return value.replace(/[^0-9.]/g, "");
}

function formatDisplay(raw: string, currency: CurrencyCode): string {
  if (!raw) return "";

  const dotIndex = raw.indexOf(".");
  const intRaw = dotIndex === -1 ? raw : raw.slice(0, dotIndex);
  const decRaw = dotIndex === -1 ? "" : raw.slice(dotIndex + 1);

  const intNum = parseInt(intRaw, 10);
  const formattedInt = isNaN(intNum) ? "" : new Intl.NumberFormat("en-US").format(intNum);

  const maxDec = MAX_DECIMALS[currency];
  const decPart = decRaw.replace(/[^0-9]/g, "").slice(0, maxDec);

  if (maxDec === 0) return formattedInt;
  if (dotIndex !== -1) return decPart ? `${formattedInt}.${decPart}` : `${formattedInt}.`;
  return formattedInt;
}

function formatForDisplay(value: number | undefined, currency: CurrencyCode): string {
  if (value === undefined || value === null) return "";
  return formatDisplay(String(value), currency);
}

export function AmountInput({
  value,
  onChange,
  onBlur,
  currency = "AUD",
  placeholder = "0.00",
  disabled,
  className,
  id,
}: AmountInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const rawRef = useRef("");

  const commitValue = useCallback(
    (raw: string) => {
      const cleaned = stripToRaw(raw);
      const num = cleaned && cleaned !== "." ? parseFloat(cleaned) : undefined;
      onChange?.(num !== undefined && !isNaN(num) ? num : undefined);
    },
    [onChange],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const cursorPos = e.target.selectionStart ?? raw.length;

      const digitsBeforeCursor = raw.slice(0, cursorPos).replace(/[^0-9]/g, "").length;

      const cleaned = stripToRaw(raw);
      rawRef.current = cleaned;

      const display = formatDisplay(cleaned, currency);
      e.target.value = display;

      let newPos = 0;
      let digitCount = 0;
      for (let i = 0; i < display.length; i++) {
        if (digitCount >= digitsBeforeCursor) {
          newPos = i;
          break;
        }
        newPos = i + 1;
        if (display[i] >= "0" && display[i] <= "9") digitCount++;
      }
      if (digitCount < digitsBeforeCursor) newPos = display.length;

      // Keep cursor after the decimal point so digits typed next go into decimals
      if (display.includes(".")) {
        const dotPos = display.indexOf(".");
        if (newPos === dotPos) newPos = dotPos + 1;
      }

      try {
        e.target.setSelectionRange(newPos, newPos);
      } catch {}
    },
    [currency],
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      commitValue(rawRef.current);

      // Format the committed value for clean display
      const cleaned = stripToRaw(e.target.value);
      const num = cleaned && cleaned !== "." ? parseFloat(cleaned) : undefined;
      if (num !== undefined && !isNaN(num)) {
        e.target.value = formatDisplay(String(num), currency);
      } else {
        e.target.value = "";
      }

      onBlur?.();
    },
    [currency, onBlur, commitValue],
  );

  const handleFocus = useCallback((e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
  }, []);

  const symbol = getCurrencySymbol(currency);
  const isSymbolSuffix = currency === "VND";

  // When the form resets or external value changes, sync the display
  const displayText = formatForDisplay(value, currency);

  return (
    <div className="relative">
      {!isSymbolSuffix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 text-sm font-medium pointer-events-none select-none">
          {symbol}
        </span>
      )}
      <input
        ref={inputRef}
        id={id}
        type="text"
        inputMode="decimal"
        data-slot="input"
        className={cn(
          "file:text-neutral-950 placeholder:text-neutral-500 selection:bg-neutral-900 selection:text-neutral-50 dark:bg-dark-bg/30 border-neutral-200 flex h-9 w-full min-w-0 rounded-md border bg-transparent py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:selection:bg-neutral-50 dark:selection:text-neutral-900 dark:bg-dark-card/30 dark:border-dark-card",
          "focus-visible:border-neutral-950 focus-visible:ring-neutral-950/50 focus-visible:ring-[3px] dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50",
          "aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 dark:aria-invalid:ring-red-900/20 dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900",
          isSymbolSuffix ? "px-3" : "pl-7 pr-3",
          className,
        )}
        defaultValue={displayText}
        key={displayText}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
      />
      {isSymbolSuffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 text-sm font-medium pointer-events-none select-none">
          {symbol}
        </span>
      )}
    </div>
  );
}
