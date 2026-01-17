"use client";

import { useCreateAreaViewModel } from "@/app/dashboard/viewModels/createAreaViewModel";
import { ActionList } from "@/app/dashboard/views/components/create/ActionList";
import { ConfigForm } from "@/app/dashboard/views/components/create/ConfigForm";
import { ReviewStep } from "@/app/dashboard/views/components/create/ReviewStep";
import { ServiceGrid } from "@/app/dashboard/views/components/create/ServiceGrid";
import { StepProgress } from "@/app/dashboard/views/components/create/StepProgress";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface CreateAreaViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateAreaView({
  open,
  onOpenChange,
}: CreateAreaViewProps) {
  const handleClose = () => {
    onOpenChange(false);
  };

  const {
    step,
    services,
    draft,
    isLoading,
    isSubmitting,
    selectActionService,
    selectAction,
    configureAction,
    selectReactionService,
    selectReaction,
    configureReaction,
    updateDraftDetails,
    goBack,
    submit,
  } = useCreateAreaViewModel(handleClose, handleClose);

  const getStepTitle = () => {
    switch (step) {
      case "select-action-service":
        return "Select a Trigger Service";
      case "select-action":
        return `Select a Trigger for ${draft.actionService?.display_name}`;
      case "configure-action":
        return `Configure ${draft.action?.name}`;
      case "select-reaction-service":
        return "Select an Action Service";
      case "select-reaction":
        return `Select an Action for ${draft.reactionService?.display_name}`;
      case "configure-reaction":
        return `Configure ${draft.reaction?.name}`;
      case "review":
        return "Review & Create";
      default:
        return "Create Automation";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case "select-action-service":
        return "Choose the service that will trigger this automation.";
      case "select-action":
        return "Choose the event that will start the automation.";
      case "configure-action":
        return "Set up the trigger details.";
      case "select-reaction-service":
        return "Choose the service where the action will happen.";
      case "select-reaction":
        return "Choose what should happen when the trigger fires.";
      case "configure-reaction":
        return "Set up the action details.";
      case "review":
        return "Give your automation a name and create it.";
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {step !== "select-action-service" && (
              <Button
                variant="ghost"
                size="icon"
                className="-ml-2 h-8 w-8"
                onClick={goBack}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            <DialogTitle>{getStepTitle()}</DialogTitle>
          </div>
          <DialogDescription>{getStepDescription()}</DialogDescription>
        </DialogHeader>

        <div className="my-6 px-2">
          <StepProgress currentStep={step} />
        </div>

        <Separator className="mb-4" />

        <div className="min-h-[300px] py-2">
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <>
              {step === "select-action-service" && (
                <ServiceGrid
                  services={services.filter((s) => s.actions.length > 0)}
                  onSelect={selectActionService}
                  selectedService={draft.actionService}
                />
              )}

              {step === "select-action" && draft.actionService && (
                <ActionList
                  items={draft.actionService.actions}
                  onSelect={selectAction}
                  selectedItem={draft.action}
                />
              )}

              {step === "configure-action" && draft.action?.config_schema && (
                <ConfigForm
                  schema={draft.action.config_schema}
                  onSubmit={configureAction}
                  initialData={draft.actionConfig}
                />
              )}

              {step === "select-reaction-service" && (
                <ServiceGrid
                  services={services.filter((s) => s.reactions.length > 0)}
                  onSelect={selectReactionService}
                  selectedService={draft.reactionService}
                />
              )}

              {step === "select-reaction" && draft.reactionService && (
                <ActionList
                  items={draft.reactionService.reactions}
                  onSelect={selectReaction}
                  selectedItem={draft.reaction}
                />
              )}

              {step === "configure-reaction" &&
                draft.reaction?.config_schema && (
                  <ConfigForm
                    schema={draft.reaction.config_schema}
                    onSubmit={configureReaction}
                    initialData={draft.reactionConfig}
                    availableVariables={draft.action?.available_variables}
                  />
                )}

              {step === "review" && (
                <ReviewStep
                  draft={draft}
                  onUpdate={updateDraftDetails}
                  onSubmit={submit}
                  isSubmitting={isSubmitting}
                />
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
