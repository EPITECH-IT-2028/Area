"use client";

import { useEffect, useState } from "react";
import { ServiceRequest } from "@/app/services/models/serviceRequest";

interface ServiceCardProps {
  service: ServiceRequest;
  isConnected: boolean;
}

export default function ServiceCard({ service, isConnected: initialIsConnected }: ServiceCardProps) {
  const [isConnected, setIsConnected] = useState(initialIsConnected);

  useEffect(() => {
    setIsConnected(initialIsConnected);
  }, [initialIsConnected]);

  const handleConnect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const oauthRoutes: Record<string, string> = {
      google: '/auth/google',
      github: '/auth/github',
    };
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
    const route = oauthRoutes[service.name];
    if (route) {
      window.location.href = `${apiBaseUrl}${route}`;
    }
  };
  const handleDisconnect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log('Disconnect service:', service.name);
  };

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:scale-105 hover:shadow-lg">
      <div className="flex flex-col items-center space-y-4">
        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${service.color} text-white transition-transform`}>
          {service.icon}
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold">{service.displayName}</h3>
          {service.description && (
            <p className="mt-2 text-sm text-muted-foreground">
              {service.description}
            </p>
          )}
        </div>
        {!isConnected ? (
          <button
            onClick={handleConnect}
            className="mt-4 rounded px-4 py-2 font-semibold text-white transition bg-blue-600 hover:bg-blue-700"
          >
            Connect
          </button>
        ) : (
          <>
            <button
              onClick={handleDisconnect}
              className="mt-4 rounded px-4 py-2 font-semibold text-white transition bg-red-500 hover:bg-red-600"
            >
              Disconnect
            </button>
            <span className="mt-2 text-green-600 text-sm font-semibold">You are connected</span>
          </>
        )}
      </div>
    </div>
  );
}
