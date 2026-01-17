import { useState } from "react";

import { ConfigSchema } from "@/app/dashboard/models/aboutResponse";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ConfigFormProps {
  schema: ConfigSchema;
  onSubmit: (config: Record<string, unknown>) => void;
  initialData?: Record<string, unknown>;
}

export function ConfigForm({
  schema,
  onSubmit,
  initialData = {},
}: ConfigFormProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>(() => {
    const defaults: Record<string, unknown> = {};
    if (schema.properties) {
      Object.entries(schema.properties).forEach(([key, prop]) => {
        if (prop.default !== undefined) {
          defaults[key] = prop.default;
        }
      });
    }
    return { ...defaults, ...initialData };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedData = { ...formData };

    if (schema.properties) {
      Object.entries(schema.properties).forEach(([key, prop]) => {
        const value = processedData[key];
        if (typeof value === "string") {
          if (prop.type === "number") {
            const parsed = parseFloat(value);
            if (!isNaN(parsed)) processedData[key] = parsed;
          } else if (prop.type === "integer") {
            const parsed = parseInt(value, 10);
            if (!isNaN(parsed)) processedData[key] = parsed;
          } else if (prop.type === "boolean") {
            if (value === "true") processedData[key] = true;
            if (value === "false") processedData[key] = false;
          }
        }
      });
    }

    onSubmit(processedData);
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  if (!schema.properties) {
    return (
      <div className="text-center text-muted-foreground">
        No configuration needed.
        <Button onClick={() => onSubmit({})} className="mt-4 w-full">
          Continue
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.entries(schema.properties).map(([key, prop]) => {
        const isRequired = schema.required?.includes(key);
        const inputType =
          prop.format === "password"
            ? "password"
            : prop.type === "number" || prop.type === "integer"
              ? "number"
              : "text";

        return (
          <div key={key} className="grid w-full items-center gap-1.5">
            <Label htmlFor={key} className="capitalize">
              {key.replace(/_/g, " ")}
              {isRequired && <span className="text-red-500">*</span>}
            </Label>
            {prop.description && (
              <p className="text-xs text-muted-foreground">
                {prop.description}
              </p>
            )}
            <Input
              id={key}
              type={inputType}
              required={isRequired}
              placeholder={prop.default ? String(prop.default) : ""}
              value={(formData[key] as string) || ""}
              onChange={(e) => handleChange(key, e.target.value)}
              step={prop.type === "number" ? "any" : undefined}
            />
          </div>
        );
      })}
      <Button type="submit" className="w-full">
        Continue
      </Button>
    </form>
  );
}
