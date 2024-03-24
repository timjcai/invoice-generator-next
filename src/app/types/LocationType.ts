export type LocationType = {
    streetLine1: string;
    streetLine2?: string;
    country: string;
    suburb: string;
    state: StateType;
    postcode: string | null;
}

export type StateType = 
    | 'VIC' 
    | 'NSW' 
    | 'TAS'
    | 'QLD'
    | 'WA'
    | 'NT'
    | 'SA'