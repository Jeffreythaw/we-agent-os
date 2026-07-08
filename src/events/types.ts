export interface SystemEvent {
    id: string;
    type: string;
    timestamp: number;
    payload: any;
}

export type EventHandler = (event: SystemEvent) => Promise<void> | void;

export interface Subscription {
    id: string;
    unsubscribe: () => void;
}
