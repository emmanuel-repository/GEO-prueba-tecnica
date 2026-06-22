import { infoAlert, successAlert } from "@/components/custom/Swal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApiError } from "@/core/interfaces/api.interface";
import { EventFormData } from "@/core/interfaces/event.interface";
import { MusicalInstrument } from "@/core/interfaces/musicalInstrument.interface";
import { eventsService } from "@/core/services/events.service";
import { musicalInstrumentService } from "@/core/services/musicalInstrument.service";
import { useEventStore } from "@/core/stores/event.store";
import { useApi } from "@/core/hooks/useApi";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function FormUpdateEvent() {

  const navigate = useNavigate();
  const { eventData, updateEventInList } = useEventStore();

  const { register, handleSubmit, setValue, control, formState: { errors }, getValues } = useForm<EventFormData>({
    defaultValues: {
      name: eventData.name,
      description: eventData.description,
      // datetime-local espera "yyyy-MM-ddTHH:mm" (sin segundos)
      eventDate: eventData.eventDate?.slice(0, 16),
      location: eventData.location,
      instruments: eventData.instruments?.map((i) => ({
        instrumentId: i.instrumentId,
        quantity: i.quantity,
      })) ?? [{ instrumentId: 0, quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "instruments" });

  const { data: instruments } = useApi<MusicalInstrument[]>(musicalInstrumentService.getAll);

  const { refetch } = useApi(
    () => eventsService.update(eventData.id!, getValues()),
    {
      onSuccess: (updated) => {
        updateEventInList(updated);
        successAlert('Evento actualizado correctamente.');
        setTimeout(() => navigate('/list-events'), 1000);
      },
      onError: (error: ApiError) => {
        infoAlert('Error', error.message);
      },
      autoFetch: false,
    }
  );

  const onSubmit = () => refetch();

  return (
    <div className="flex flex-row pt-20">
      <div className="ml-4 flex-grow">
        <Card className="w-auto">

          <CardHeader>
            <div className="flex flex-row justify-center">
              <div className="text-5xl">Editar Evento</div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-4 space-y-6">

              <div className="grid grid-cols-2 gap-6">

                <div className="flex flex-col space-y-1.5">
                  <Label>Nombre:</Label>
                  <Input {...register('name', { required: true })} />
                  {errors.name && <span className="text-red-500 text-sm">Campo requerido</span>}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label>Ubicación:</Label>
                  <Input {...register('location', { required: true })} />
                  {errors.location && <span className="text-red-500 text-sm">Campo requerido</span>}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label>Fecha del evento:</Label>
                  <Input type="datetime-local" {...register('eventDate', { required: true })} />
                  {errors.eventDate && <span className="text-red-500 text-sm">Campo requerido</span>}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label>Descripción:</Label>
                  <Input {...register('description', { required: true })} />
                  {errors.description && <span className="text-red-500 text-sm">Campo requerido</span>}
                </div>

              </div>

              {/* Instrumentos asignados */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg">Instrumentos asignados</Label>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ instrumentId: 0, quantity: 1 })}
                  >
                    + Agregar instrumento
                  </Button>
                </div>

                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-end gap-4">

                    <div className="flex flex-col space-y-1.5 flex-grow">
                      <Label>Instrumento:</Label>
                      <Select
                        defaultValue={field.instrumentId ? String(field.instrumentId) : undefined}
                        onValueChange={(val) => setValue(`instruments.${index}.instrumentId`, Number(val))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un instrumento" />
                        </SelectTrigger>
                        <SelectContent>
                          {instruments?.map((inst) => (
                            <SelectItem key={inst.id} value={String(inst.id)}>
                              {inst.name} (stock: {inst.stock ?? 0})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col space-y-1.5 w-32">
                      <Label>Cantidad:</Label>
                      <Input
                        type="number"
                        min={1}
                        {...register(`instruments.${index}.quantity`, { required: true, valueAsNumber: true, min: 1 })}
                      />
                    </div>

                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                    >
                      Quitar
                    </Button>

                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate('/list-events')}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-blue-600 text-white">
                  Actualizar
                </Button>
              </div>

            </form>
          </CardContent>

        </Card>
      </div>
    </div>
  );
}
