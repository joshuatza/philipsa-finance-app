import type React from "react";
import { useId } from "react";
import { cn } from "../../../lib/utils";
import { Input } from "../input";
import { Label } from "../label";

interface IconInputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

function IconInput({ label, icon, className, ...props }: IconInputProps) {
  const id = useId();

  return (
    <div className="space-y-2">
      <div className="group relative">
        {label && (
          <Label
            className={cn(
              "-translate-y-1/2 pointer-events-none absolute top-1/2 origin-start cursor-text px-2 text-muted-foreground/70 text-sm transition-all",
              "group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:font-medium group-focus-within:text-foreground group-focus-within:text-xs",
              "has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground has-[+input:not(:placeholder-shown)]:text-xs",
            )}
            htmlFor={id}
          >
            <span className="inline-flex bg-transparent px-6">
              <span className="rounded-sm bg-background px-1">{label}</span>
            </span>
          </Label>
        )}

        <Input
          className={cn("bg-background pl-9", className)}
          id={id}
          placeholder=""
          {...props}
        />

        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center ps-3 text-primary peer-disabled:opacity-50">
            {icon}
          </div>
        )}
      </div>

      {/* Optional error display */}
      {props.error && <p className="text-destructive text-sm">{props.error}</p>}
    </div>
  );
}

export { IconInput };
