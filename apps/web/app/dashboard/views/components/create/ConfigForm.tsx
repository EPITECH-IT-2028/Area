import { useState } from "react";

import {
  ConfigProperty,
  ConfigSchema,
} from "@/app/dashboard/models/aboutResponse";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ConfigFormProps {
  schema: ConfigSchema;
  onSubmit: (config: Record<string, unknown>) => void;
  initialData?: Record<string, unknown>;
  availableVariables?: string[];
}

export function ConfigForm({
  schema,
  onSubmit,
  initialData = {},
  availableVariables = [],
}: ConfigFormProps) {
  const [formData, setFormData] =
    useState<Record<string, unknown>>(initialData);

  const getDeepValue = (obj: any, path: string[]) => {
    let current = obj;
    for (const key of path) {
      if (current === undefined || current === null) return undefined;
      current = current[key];
    }
    return current;
  };

  const setDeepValue = (path: string[], value: any) => {
    setFormData((prev) => {
      const newObj = JSON.parse(JSON.stringify(prev));
      let current = newObj;
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (!current[key]) current[key] = {};
        current = current[key];
      }
      current[path[path.length - 1]] = value;
      return newObj;
    });
  };

  const parseValue = (value: string, type?: string) => {
    if (type === "number") {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? value : parsed;
    }
    if (type === "integer") {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? value : parsed;
    }
    if (type === "boolean") {
      return value === "true";
    }
    return value;
  };

  const processSubmissionData = (
    data: any,
    props: Record<string, ConfigProperty>,
  ): any => {
    const result: any = {};

    Object.entries(props).forEach(([key, prop]) => {
      const value = data?.[key];

      if (prop.type === "object" && prop.properties) {
        if (value && typeof value === "object") {
          result[key] = processSubmissionData(value, prop.properties);
        }
      } else if (value !== undefined) {
        if (typeof value === "string") {
          result[key] = parseValue(value, prop.type);
        } else {
          result[key] = value;
        }
      }
    });
    return result;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (schema.properties) {
      const processed = processSubmissionData(formData, schema.properties);
      onSubmit(processed);
    } else {
      onSubmit(formData);
    }
  };

  const renderField = (
    key: string,
    prop: ConfigProperty,
    path: string[],
    isRequired: boolean,
  ) => {
    const fieldId = path.join(".");
    const currentValue = getDeepValue(formData, path);

    if (prop.type === "object" && prop.properties) {
      return (
        <div
          key={fieldId}
          className="space-y-4 rounded-md border bg-accent/10 p-4"
        >
          <div className="space-y-1">
            <Label className="text-base font-bold capitalize">
              {key.replace(/_/g, " ")}
            </Label>
            {prop.description && (
              <p className="text-xs text-muted-foreground">
                {prop.description}
              </p>
            )}
          </div>
          <div className="space-y-4 border-l-2 border-border/50 pl-4">
            {Object.entries(prop.properties).map(([childKey, childProp]) => {
              const childRequired = prop.required?.includes(childKey) ?? false;
              return renderField(
                childKey,
                childProp,
                [...path, childKey],
                childRequired,
              );
            })}
          </div>
        </div>
      );
    }

    if (prop.enum) {
      return (
        <div key={fieldId} className="grid w-full items-center gap-1.5">
          <Label htmlFor={fieldId} className="capitalize">
            {key.replace(/_/g, " ")}{" "}
            {isRequired && <span className="text-red-500">*</span>}
          </Label>
          {prop.description && (
            <p className="text-xs text-muted-foreground">{prop.description}</p>
          )}
          <div className="relative">
            <select
              id={fieldId}
              className={cn(
                "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              )}
              value={currentValue !== undefined ? String(currentValue) : ""}
              onChange={(e) => setDeepValue(path, e.target.value)}
              required={isRequired}
            >
              <option value="" disabled>
                Select an option
              </option>
              {prop.enum.map((opt) => (
                <option key={String(opt)} value={String(opt)}>
                  {String(opt)}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }

    const inputType =
      prop.format === "password"
        ? "password"
        : prop.type === "number" || prop.type === "integer"
          ? "number"
          : "text";

    const isTemplateField =
      prop.description?.toLowerCase().includes("template") ||
      prop.description?.toLowerCase().includes("variables") ||
      key.toLowerCase().includes("template") ||
      key.toLowerCase().includes("message");

    return (
      <div key={fieldId} className="grid w-full items-center gap-1.5">
        <Label htmlFor={fieldId} className="capitalize">
          {key.replace(/_/g, " ")}{" "}
          {isRequired && <span className="text-red-500">*</span>}
        </Label>

        {isTemplateField && availableVariables.length > 0 && (
          <div className="mb-1 flex flex-wrap gap-1">
            <span className="mr-1 text-xs text-muted-foreground">
              Variables:
            </span>
            {availableVariables.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => {
                  const val = currentValue ? String(currentValue) : "";
                  setDeepValue(path, val + `{{${v}}}`);
                }}
                className="cursor-pointer rounded border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary transition-colors hover:bg-primary/20"
              >
                {v}
              </button>
            ))}
          </div>
        )}

        {prop.description && (
          <p className="text-xs text-muted-foreground">{prop.description}</p>
        )}
        <Input
          id={fieldId}
          type={inputType}
          required={isRequired}
          placeholder={prop.default ? String(prop.default) : ""}
          value={currentValue !== undefined ? String(currentValue) : ""}
          onChange={(e) => setDeepValue(path, e.target.value)}
          step={prop.type === "number" ? "any" : undefined}
        />
      </div>
    );
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
        const isRequired = schema.required?.includes(key) ?? false;
        return renderField(key, prop, [key], isRequired);
      })}
      <Button type="submit" className="w-full">
        Continue
      </Button>
    </form>
  );
}
