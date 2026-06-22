import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Event, EventFormData } from '../interfaces/event.interface';

interface EventStore {
  eventList: Event[];
  eventData: EventFormData;
  setEventList: (events: Event[]) => void;
  setEventData: (event: EventFormData) => void;
  updateEventInList: (updated: Event) => void;
  removeEventFromList: (id: number) => void;
}

const defaultEvent: EventFormData = {
  id: null,
  name: "",
  description: "",
  eventDate: "",
  location: "",
  instruments: [],
};

export const useEventStore = create<EventStore>()(
  persist(
    (set) => ({
      eventList: [],
      eventData: defaultEvent,

      setEventList: (events) => set({ eventList: events }),

      setEventData: (event) => set({ eventData: event }),

      updateEventInList: (updated) =>
        set((state) => ({
          eventList: state.eventList.map((e) =>
            e.id === updated.id ? updated : e
          ),
        })),

      removeEventFromList: (id) =>
        set((state) => ({
          eventList: state.eventList.filter((e) => e.id !== id),
        })),
    }),
    {
      name: 'event-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
