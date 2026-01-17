import { useEffect, useState } from "react";

import { useCreateArea } from "@/app/dashboard/hooks/useCreateArea";
import {
  Action,
  Reaction,
  Service,
} from "@/app/dashboard/models/aboutResponse";
import { toast } from "sonner";

export type Step =
  | "select-action-service"
  | "select-action"
  | "configure-action"
  | "select-reaction-service"
  | "select-reaction"
  | "configure-reaction"
  | "review";

export interface AreaDraft {
  name: string;
  description: string;
  actionService: Service | null;
  action: Action | null;
  actionConfig: Record<string, unknown>;
  reactionService: Service | null;
  reaction: Reaction | null;
  reactionConfig: Record<string, unknown>;
}

export function useCreateAreaViewModel(
  onSuccess: () => void,
  onCancel: () => void,
) {
  const { services, isLoading, isSubmitting, fetchServices, createArea } =
    useCreateArea();
  const [step, setStep] = useState<Step>("select-action-service");

  const [draft, setDraft] = useState<AreaDraft>({
    name: "",
    description: "",
    actionService: null,
    action: null,
    actionConfig: {},
    reactionService: null,
    reaction: null,
    reactionConfig: {},
  });

  useEffect(() => {
    void fetchServices();
  }, [fetchServices]);

  const selectActionService = (service: Service) => {
    setDraft((prev) => ({ ...prev, actionService: service }));
    setStep("select-action");
  };

  const selectAction = (action: Action) => {
    setDraft((prev) => ({ ...prev, action }));
    if (
      action.config_schema &&
      action.config_schema.properties &&
      Object.keys(action.config_schema.properties).length > 0
    ) {
      setStep("configure-action");
    } else {
      setStep("select-reaction-service");
    }
  };

  const configureAction = (config: Record<string, unknown>) => {
    setDraft((prev) => ({ ...prev, actionConfig: config }));
    setStep("select-reaction-service");
  };

  const selectReactionService = (service: Service) => {
    setDraft((prev) => ({ ...prev, reactionService: service }));
    setStep("select-reaction");
  };

  const selectReaction = (reaction: Reaction) => {
    setDraft((prev) => ({ ...prev, reaction }));
    if (
      reaction.config_schema &&
      reaction.config_schema.properties &&
      Object.keys(reaction.config_schema.properties).length > 0
    ) {
      setStep("configure-reaction");
    } else {
      setStep("review");
    }
  };

  const configureReaction = (config: Record<string, unknown>) => {
    setDraft((prev) => ({ ...prev, reactionConfig: config }));
    setStep("review");
  };

  const updateDraftDetails = (name: string, description: string) => {
    setDraft((prev) => ({ ...prev, name, description }));
  };

  const goBack = () => {
    switch (step) {
      case "select-action":
        setStep("select-action-service");
        setDraft((prev) => ({ ...prev, actionService: null }));
        break;
      case "configure-action":
        setStep("select-action");
        setDraft((prev) => ({ ...prev, action: null }));
        break;
      case "select-reaction-service":
        if (
          draft.action?.config_schema &&
          draft.action.config_schema.properties &&
          Object.keys(draft.action.config_schema.properties).length > 0
        ) {
          setStep("configure-action");
        } else {
          setStep("select-action");
          setDraft((prev) => ({ ...prev, action: null }));
        }
        break;
      case "select-reaction":
        setStep("select-reaction-service");
        setDraft((prev) => ({ ...prev, reactionService: null }));
        break;
      case "configure-reaction":
        setStep("select-reaction");
        setDraft((prev) => ({ ...prev, reaction: null }));
        break;
      case "review":
        if (
          draft.reaction?.config_schema &&
          draft.reaction.config_schema.properties &&
          Object.keys(draft.reaction.config_schema.properties).length > 0
        ) {
          setStep("configure-reaction");
        } else {
          setStep("select-reaction");
          setDraft((prev) => ({ ...prev, reaction: null }));
        }
        break;
      default:
        onCancel();
    }
  };

  const submit = async () => {
    if (!draft.action || !draft.reaction || !draft.name) {
      toast.error("Please complete all required fields");
      return;
    }

    const success = await createArea({
      name: draft.name,
      description: draft.description,
      is_active: true,
      action_name: draft.action.name,
      action_config: draft.actionConfig,
      reaction_name: draft.reaction.name,
      reaction_config: draft.reactionConfig,
    });

    if (success) {
      onSuccess();
    }
  };

  return {
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
  };
}
