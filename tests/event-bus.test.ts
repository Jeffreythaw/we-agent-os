import { describe, it, expect, vi } from 'vitest';
import { EventBus } from '../src/events/event-bus.js';
import { SystemEvent } from '../src/events/types.js';

describe('EventBus', () => {
    it('should subscribe and receive published events', async () => {
        const bus = new EventBus();
        const handler = vi.fn();
        
        bus.subscribe('test.event', handler);
        
        const event: SystemEvent = {
            id: '1',
            type: 'test.event',
            timestamp: Date.now(),
            payload: { data: 'test' }
        };
        
        await bus.publish(event);
        
        expect(handler).toHaveBeenCalledWith(event);
    });

    it('should handle async handlers', async () => {
        const bus = new EventBus();
        let resolved = false;
        
        const handler = async () => {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolved = true;
                    resolve();
                }, 10);
            });
        };
        
        bus.subscribe('async.event', handler);
        await bus.publish({ id: '2', type: 'async.event', timestamp: Date.now(), payload: {} });
        
        expect(resolved).toBe(true);
    });

    it('should unsubscribe correctly', async () => {
        const bus = new EventBus();
        const handler = vi.fn();
        
        const sub = bus.subscribe('test.event', handler);
        sub.unsubscribe();
        
        await bus.publish({ id: '3', type: 'test.event', timestamp: Date.now(), payload: {} });
        
        expect(handler).not.toHaveBeenCalled();
    });
});
