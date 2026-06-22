// Instrumento asignado tal como lo devuelve el backend (incluye el nombre)
export interface AssignedInstrument {
  instrumentId: number;
  name: string;
  quantity: number;
}

// Evento tal como lo devuelve el backend
export interface Event {
  id: number;
  name: string;
  description: string;
  eventDate: string;
  location: string;
  status: number; // 1 = agendado, 0 = finalizado
  instruments: AssignedInstrument[];
}

// Lo que se envía al backend por cada instrumento asignado
export interface InstrumentAssignment {
  instrumentId: number;
  quantity: number;
}

// Datos del formulario (crear / actualizar)
export interface EventFormData {
  id?: number | null;
  name: string;
  description: string;
  eventDate: string;
  location: string;
  instruments: InstrumentAssignment[];
}
