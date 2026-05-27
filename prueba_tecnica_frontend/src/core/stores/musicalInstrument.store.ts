import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { MusicalInstrument, MusicalInstrumentFormData } from '../interfaces/musicalInstrument.interface';

interface MusicalInstrumentStore {
  instrumentList: MusicalInstrument[];
  instrumentData: MusicalInstrumentFormData;
  setInstrumentList: (instruments: MusicalInstrument[]) => void;
  setInstrumentData: (instrument: MusicalInstrumentFormData) => void;
  updateInstrumentInList: (updated: MusicalInstrument) => void;
  removeInstrumentFromList: (id: number) => void;
}

const defaultInstrument: MusicalInstrumentFormData = {
  id: null,
  name: "",
  type: "",
  price: 0,
  description: "",
  color: "",
  size: "",
  brand: "",
  model: "",
  categoryId: 0,
};

export const useMusicalInstrumentStore = create<MusicalInstrumentStore>()(
  persist(
    (set) => ({
      instrumentList: [],
      instrumentData: defaultInstrument,

      setInstrumentList: (instruments) => set({ instrumentList: instruments }),

      setInstrumentData: (instrument) => set({ instrumentData: instrument }),

      updateInstrumentInList: (updated) =>
        set((state) => ({
          instrumentList: state.instrumentList.map((i) =>
            i.id === updated.id ? updated : i
          ),
        })),

      removeInstrumentFromList: (id) =>
        set((state) => ({
          instrumentList: state.instrumentList.filter((i) => i.id !== id),
        })),
    }),
    {
      name: 'instrument-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
