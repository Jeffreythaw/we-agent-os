import { SystemEvent, EventHandler, Subscription } from './types.js';
import crypto from 'node:crypto';

export class EventBus {
    private handlers: Map<string, Map<string, EventHandler>> = new Map();

    public subscribe(eventType: string, handler: EventHandler): Subscription {
        if (!this.handlers.has(eventType)) {
            this.handlers.set(eventType, new Map());
        }
        
        const id = crypto.randomUUID();
        this.handlers.get(eventType)!.set(id, handler);

        return {
            id,
            unsubscribe: () => this.unsubscribe(eventType, id),
        };
    }

    public unsubscribe(eventType: string, handlerId: string): void {
        const typeHandlers = this.handlers.get(eventType);
        if (typeHandlers) {
            typeHandlers.delete(handlerId);
        }
    }

    public async publish(event: SystemEvent): Promise<void> {
        const typeHandlers = this.handlers.get(event.type);
        if (!typeHandlers) {
            return;
        }

        const promises: Promise<void>[] = [];
        for (const handler of typeHandlers.values()) {
            try {
                const result = handler(event);
                if (result instanceof Promise) {
                    promises.push(result);
                }
            } catch (error) {
                // In a real system, push to DLQ or log, but do not crash
                console.error(`Error in event handler for ${event.type}:`, error);
            }
        }
        
        await Promise.allSettled(promises);
    }
}
