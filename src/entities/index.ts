export type TMode = {
  $type: string;
  isTflService: boolean;
  isFarePaying: boolean;
  isScheduledService: boolean;
  modeName: string;
};

export type TLine = {
  $type: string;
  id: string;
  name: string;
  modeName: string;
  disruptions: string[];
  created: string;
  modified: string;
  lineStatuses: string[];
  routeSections: string[];
  serviceTypes: {
    $type: string;
    name: string;
    uri: string;
  }[];
  crowding: {
    $type: string;
  };
};
