import { ServiceRequest, UserServiceRequest } from "@/app/services/models/serviceRequest";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ExternalLink, Loader2, Plug, X } from "lucide-react";

interface ServiceCardProps {
  service: ServiceRequest;
  isConnected: boolean;
  userService?: UserServiceRequest;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function ServiceCard({
  service,
  isConnected,
  userService,
  isConnecting,
  onConnect,
  onDisconnect,
}: ServiceCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-md">
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            {service.icon_url ? (
              <img
                src={service.icon_url}
                alt={service.display_name}
                className="h-12 w-12 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Plug className="h-6 w-6 text-primary" />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-foreground">
                {service.display_name}
              </h3>
              <p className="text-sm text-muted-foreground">{service.name}</p>
            </div>
          </div>

          {service.oauth_url && (
            <div
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                isConnected
                  ? "bg-green-500/10 text-green-600 dark:text-green-400"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {isConnected ? (
                <>
                  <Check className="h-3 w-3" />
                  Connected
                </>
              ) : (
                <>
                  <X className="h-3 w-3" />
                  Not connected
                </>
              )}
            </div>
          )}
        </div>

        <div className="mb-4 flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="font-medium text-foreground">
              {service.actions.length}
            </span>{" "}
            Actions
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium text-foreground">
              {service.reactions.length}
            </span>{" "}
            Reactions
          </div>
        </div>

        {isConnected && userService && (
          <div className="mb-4 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Connected on</span>
              <span className="font-medium text-foreground">
                {new Date(userService.created_at).toLocaleDateString()}
              </span>
            </div>
            {userService.last_sync && (
              <div className="mt-1 flex items-center justify-between">
                <span>Last sync</span>
                <span className="font-medium text-foreground">
                  {new Date(userService.last_sync).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2">
          {!isConnected ? (
            <Button
              onClick={onConnect}
              disabled={isConnecting}
              className="w-full gap-2"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <ExternalLink className="h-4 w-4" />
                  Connect
                </>
              )}
            </Button>
          ) : !service.oauth_url ? (
            <div className="w-full rounded-lg bg-muted/50 p-3 text-center text-sm text-muted-foreground">
              No authentication required
            </div>
          ) : (
            <Button
              onClick={onDisconnect}
              variant="destructive"
              className="w-full"
            >
              Disconnect
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
