import { Action, Reaction } from "@/app/dashboard/models/aboutResponse";
import { cn } from "@/lib/utils";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ActionListProps {
  items: (Action | Reaction)[];
  onSelect: (item: Action | Reaction) => void;
  selectedItem?: Action | Reaction | null;
}

export function ActionList({ items, onSelect, selectedItem }: ActionListProps) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <Card
          key={item.name}
          className={cn(
            "cursor-pointer transition-all hover:border-primary/50 hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
            selectedItem?.name === item.name &&
              "border-primary bg-accent ring-1 ring-primary",
          )}
          onClick={() => onSelect(item)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(item);
            }
          }}
          role="button"
          tabIndex={0}
          aria-pressed={selectedItem?.name === item.name}
        >
          <CardHeader className="p-4">
            <CardTitle className="text-base">{item.name}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
