"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ServiceRequest } from "@/app/services/models/serviceRequest";

interface ServiceCardProps {
  service: ServiceRequest;
}


export default function ServiceCard({ service }: ServiceCardProps) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const connected = localStorage.getItem("connected_services");
    if (connected) {
      const arr = JSON.parse(connected) as string[];
      setIsConnected(arr.includes(service.name));
    }
  }, [service.name]);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const connected = localStorage.getItem("connected_services");
    let arr: string[] = connected ? JSON.parse(connected) : [];
    if (!isConnected) {
      if (!arr.includes(service.name)) {
        arr.push(service.name);
        localStorage.setItem("connected_services", JSON.stringify(arr));
      }
      setIsConnected(true);
    } else {
      arr = arr.filter((name) => name !== service.name);
      localStorage.setItem("connected_services", JSON.stringify(arr));
      setIsConnected(false);
    }
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
            onClick={handleToggle}
            className="mt-4 rounded px-4 py-2 font-semibold text-white transition bg-blue-600 hover:bg-blue-700"
          >
            Connect
          </button>
        ) : (
          <>
            <button
              onClick={handleToggle}
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
