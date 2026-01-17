import Image from "next/image";

import { AreaDraft } from "@/app/dashboard/viewModels/createAreaViewModel";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ReviewStepProps {
  draft: AreaDraft;
  onUpdate: (name: string, description: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function ReviewStep({
  draft,
  onUpdate,
  onSubmit,
  isSubmitting,
}: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <div className="flex space-x-2">
            <Label htmlFor="name">Area Name</Label>
            <span className="text-red-500">*</span>
          </div>
          <Input
            id="name"
            placeholder="My Awesome Automation"
            value={draft.name}
            onChange={(e) => onUpdate(e.target.value, draft.description)}
            autoFocus
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="description">Description (Optional)</Label>
          <Input
            id="description"
            placeholder="What does this automation do?"
            value={draft.description}
            onChange={(e) => onUpdate(draft.name, e.target.value)}
          />
        </div>
      </div>

      <div className="relative flex items-center justify-between gap-4 rounded-xl border bg-card p-6 shadow-sm">
        <div className="absolute top-1/2 left-1/2 -z-10 h-0.5 w-1/2 -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-primary/20 to-primary/20" />

        <div className="flex flex-1 flex-col items-center text-center">
          <div className="relative mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border bg-background p-3 shadow-sm transition-transform hover:scale-105">
            <div className="absolute -top-3 -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm">
              IF
            </div>
            <Image
              src={draft.actionService?.icon_url || "/globe.svg"}
              alt={draft.actionService?.display_name || "Service"}
              width={48}
              height={48}
              className="h-10 w-10 object-contain"
            />
          </div>
          <p className="font-semibold text-foreground">
            {draft.actionService?.display_name}
          </p>
          <p className="max-w-[120px] text-xs text-muted-foreground">
            {draft.action?.name}
          </p>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ArrowRight className="h-4 w-4" />
        </div>

        <div className="flex flex-1 flex-col items-center text-center">
          <div className="relative mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border bg-background p-3 shadow-sm transition-transform hover:scale-105">
            <div className="absolute -top-3 -right-6 flex h-6 w-6 items-center justify-center rounded-full bg-primary px-5 text-[10px] font-bold text-primary-foreground shadow-sm">
              THEN
            </div>
            <Image
              src={draft.reactionService?.icon_url || "/globe.svg"}
              alt={draft.reactionService?.display_name || "Service"}
              width={48}
              height={48}
              className="h-10 w-10 object-contain"
            />
          </div>
          <p className="font-semibold text-foreground">
            {draft.reactionService?.display_name}
          </p>
          <p className="max-w-[120px] text-xs text-muted-foreground">
            {draft.reaction?.name}
          </p>
        </div>
      </div>

      <Button
        onClick={onSubmit}
        className="w-full py-6 text-lg"
        disabled={isSubmitting || !draft.name}
      >
        {isSubmitting ? (
          "Creating..."
        ) : (
          <>
            <Check className="mr-2 h-5 w-5" /> Create Automation
          </>
        )}
      </Button>
    </div>
  );
}
