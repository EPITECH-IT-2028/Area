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
  const {
    services,
    userServices,
    isLoading,
    isSubmitting,
    fetchServices,
    createArea,
  } = useCreateArea();
  const [step, setStep] = useState<Step>("select-action-service");

  const isServiceConnected = (service: Service): boolean => {
    if (!service.oauth_url) {
      return true;
    }
    return userServices.some(
      (us) => us.service.name === service.name && us.is_connected,
    );
  };

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
    if (!isServiceConnected(service)) {
      toast.error(`Please connect to ${service.display_name} first.`);
      return;
    }
    setDraft((prev) => ({
      ...prev,
      actionService: service,
      action: null,
      actionConfig: {},
    }));
    setStep("select-action");
  };

  const selectAction = (action: Action) => {
    const enrichedAction = { ...action };
    if (
      !enrichedAction.available_variables ||
      enrichedAction.available_variables.length === 0
    ) {
      enrichedAction.available_variables = getAvailableVariablesForAction(
        action.name,
      );
    }
    setDraft((prev) => ({ ...prev, action: enrichedAction, actionConfig: {} }));
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

  const getAvailableVariablesForAction = (actionName: string): string[] => {
    const variableMapping: Record<string, string[]> = {
      open_meteo: ["matchedValue"],
      new_email: ["from", "subject", "snippet"],
      new_outlook_email: ["from", "subject"],
      new_commit_push: ["author", "message", "sha", "url", "date"],
      new_pull_request: ["repository"],
      new_discord_message: ["content", "author", "channel_id", "timestamp"],
    };

    return variableMapping[actionName] || ["data"];
  };

  const configureAction = (config: Record<string, unknown>) => {
    setDraft((prev) => ({ ...prev, actionConfig: config }));
    setStep("select-reaction-service");
  };

  const selectReactionService = (service: Service) => {
    if (!isServiceConnected(service)) {
      toast.error(`Please connect to ${service.display_name} first.`);
      return;
    }
    setDraft((prev) => ({
      ...prev,
      reactionService: service,
      reaction: null,
      reactionConfig: {},
    }));
    setStep("select-reaction");
  };

  const selectReaction = (reaction: Reaction) => {
    setDraft((prev) => ({ ...prev, reaction, reactionConfig: {} }));
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
        setDraft((prev) => ({
          ...prev,
          actionService: null,
          action: null,
          actionConfig: {},
        }));
        break;
      case "configure-action":
        setStep("select-action");
        setDraft((prev) => ({ ...prev, action: null, actionConfig: {} }));
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
          setDraft((prev) => ({ ...prev, action: null, actionConfig: {} }));
        }
        break;
      case "select-reaction":
        setStep("select-reaction-service");
        setDraft((prev) => ({
          ...prev,
          reactionService: null,
          reaction: null,
          reactionConfig: {},
        }));
        break;
      case "configure-reaction":
        setStep("select-reaction");
        setDraft((prev) => ({ ...prev, reaction: null, reactionConfig: {} }));
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
          setDraft((prev) => ({ ...prev, reaction: null, reactionConfig: {} }));
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
    isServiceConnected,
  };
}
