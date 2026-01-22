import { useEffect, useState } from "react";

import { Area } from "@/app/dashboard/models/areasResponse";
import { cn } from "@/lib/utils";
import { ArrowRight, Pencil, Play, Save, Trash2, X, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface AreaCardProps {
  area: Area;
  getStatusColor?: (status: string) => string;
  onDelete?: (id: string) => void;
  onUpdate?: (
    id: string,
    data: { name?: string; description?: string; is_active?: boolean },
  ) => void;
}

export function AreaCard({
  area,
  onDelete,
  onUpdate,
  getStatusColor,
}: AreaCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedName, setEditedName] = useState(area.name);
  const [editedDescription, setEditedDescription] = useState(
    area.description || "",
  );
  const [isActive, setIsActive] = useState(area.is_active);

  useEffect(() => {
    setTimeout(() => {
      setEditedName(area.name);
      setEditedDescription(area.description || "");
      setIsActive(area.is_active);
    }, 0);
  }, [area.id, area.name, area.description, area.is_active]);

  const status = area.is_active ? "success" : "disabled";
  const statusColorClass = getStatusColor
    ? getStatusColor(status)
    : area.is_active
      ? "bg-emerald-500"
      : "bg-muted-foreground/50";

  const handleUpdate = () => {
    onUpdate?.(area.id, {
      name: editedName,
      description: editedDescription,
      is_active: isActive,
    });
    setIsEditDialogOpen(false);
  };

  return (
    <>
      <div className="group relative overflow-hidden rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition-all hover:border-primary/20 hover:shadow-md md:p-5">
        <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />

        <div className="relative mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="leading-none font-semibold tracking-tight">
                {area.name}
              </h3>
              <p className="mt-1.5 text-xs font-medium text-muted-foreground">
                {area.action.service.name}{" "}
                <span className="mx-1 text-muted-foreground/50">→</span>{" "}
                {area.reaction.service.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase transition-colors",
                area.is_active
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-muted text-muted-foreground",
              )}
            >
              <div
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  area.is_active && "animate-pulse",
                  statusColorClass,
                )}
              />
              {area.is_active ? "Active" : "Disabled"}
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-muted-foreground/60 transition-colors hover:bg-primary/10 hover:text-primary"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-muted-foreground/60 transition-colors hover:bg-destructive/10 hover:text-destructive"
                onClick={() => onDelete?.(area.id)}
                aria-label={`Delete area ${area.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {area.description && (
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {area.description}
          </p>
        )}

        <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/40 p-3 md:p-4">
          <div className="space-y-1.5">
            <span className="flex items-center gap-1 text-[10px] font-bold tracking-widest text-blue-500 uppercase dark:text-blue-400">
              <Play className="h-3 w-3 fill-current" />
              Trigger
            </span>
            <div>
              <p className="line-clamp-1 text-sm font-semibold">
                {area.action.event_type}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {area.action.service.name}
              </p>
            </div>
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background">
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="space-y-1.5 text-right">
            <span className="flex items-center justify-end gap-1 text-[10px] font-bold tracking-widest text-purple-500 uppercase dark:text-purple-400">
              Action
              <Zap className="h-3 w-3 fill-current" />
            </span>
            <div>
              <p className="line-clamp-1 text-sm font-semibold">
                {area.reaction.action_type}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {area.reaction.service.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Automation</DialogTitle>
            <DialogDescription>
              Modify your automation details here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="active-status">Active Status</Label>
              <Switch
                id="active-status"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleUpdate}>
              <Save className="mr-2 h-4 w-4" />
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
