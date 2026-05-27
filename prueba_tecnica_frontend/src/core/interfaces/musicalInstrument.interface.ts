export interface MusicalInstrument {
  id: number;
  name: string;
  type: string;
  price: number;
  description: string;
  color: string;
  size: string;
  brand: string;
  model: string;
  categoryId: number;
}

export interface MusicalInstrumentFormData {
  id?: number | null;
  name: string;
  type: string;
  price: number;
  description: string;
  color: string;
  size: string;
  brand: string;
  model: string;
  categoryId: number;
}
