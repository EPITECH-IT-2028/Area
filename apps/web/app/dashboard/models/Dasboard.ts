export interface Area {
  id: string;
  name: string;
  is_active: boolean;
  action: {
    name: string;
    event_type: string;
    service: {
      name: string;
    };
  };
  reaction: {
    name: string;
    action_type: string;
    service: {
      name: string;
    };
  };
}

export interface AreasResponse {
  success: boolean;
  data: Area[];
}

export interface StatsCardsProps {
  totalAreas: number;
  activeAreas: number;
  connectedServicesCount: number;
}