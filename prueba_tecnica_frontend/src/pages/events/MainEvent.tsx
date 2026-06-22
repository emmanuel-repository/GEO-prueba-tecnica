/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ActionsTable } from "@/core/interfaces/actionsTable.interface";
import { ListEvents } from "./ListEvents";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEventStore } from "@/core/stores/event.store";
import { Event } from "@/core/interfaces/event.interface";
import { useDeleteEvent } from "@/core/hooks/useDeleteEvent";
import { useApi } from "@/core/hooks/useApi";
import { eventsService } from "@/core/services/events.service";
import { ApiError } from "@/core/interfaces/api.interface";
import { confirmationAlert, infoAlert, successAlert } from "@/components/custom/Swal";

export default function MainEvent() {

  const navigate = useNavigate();
  const { setEventData, removeEventFromList, updateEventInList } = useEventStore();
  const pendingDeleteIdRef = useRef<number | null>(null);
  const handleRedirectCreate = useCallback(() => navigate('/new-event'), []);

  const handleRedirectUpdate = useCallback((event: Event) => {
    if (event.status === 0) {
      infoAlert('Aviso', 'No se puede editar un evento finalizado');
      return;
    }
    setEventData(event);
    navigate('/edit-event');
  }, []);

  const { refetch: finalizeEvent } = useApi(
    (id: number) => eventsService.finalize(id),
    {
      autoFetch: false,
      onSuccess: (updated: Event) => {
        updateEventInList(updated);
        successAlert('Evento finalizado. El stock de los instrumentos fue devuelto.');
      },
      onError: (error: ApiError) => {
        infoAlert('Error', error.message);
      },
    }
  );

  const handleFinalize = useCallback(async (event: Event) => {
    if (event.status === 0) {
      infoAlert('Aviso', 'El evento ya está finalizado');
      return;
    }
    const confirmed = await confirmationAlert("Al finalizar el evento se devolverá el stock de los instrumentos asignados.");
    if (confirmed.isConfirmed) {
      finalizeEvent(event.id);
    }
  }, []);

  const { refetch: deleteEvent } = useDeleteEvent(() => {
    if (pendingDeleteIdRef.current !== null) {
      removeEventFromList(pendingDeleteIdRef.current);
      pendingDeleteIdRef.current = null;
    }
  });

  const handleDelete = useCallback(async (event: Event) => {
    const confirmed = await confirmationAlert("Se borrará el evento seleccionado, ¡No se podrá revertir! El stock de los instrumentos será devuelto.");

    if (confirmed.isConfirmed) {
      pendingDeleteIdRef.current = event.id;
      deleteEvent(event.id);
    }
  }, []);

  const listActions = useMemo<ActionsTable[]>(
    () => [
      { description: "Editar", callbacks: handleRedirectUpdate },
      { description: "Finalizar", callbacks: handleFinalize },
      { description: "Eliminar", callbacks: handleDelete },
    ],
    [handleRedirectUpdate, handleFinalize, handleDelete]
  );

  return (
    <div className="flex flex-row pt-20">
      <div className="ml-4 flex-grow">
        <Card className="w-auto">

          <CardHeader>
            <div className="flex flex-row items-center">
              <div className="basis-5/6 text-5xl">Eventos</div>
              <div className="basis-1/6">
                <Button onClick={handleRedirectCreate}>Nuevo Evento</Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <ListEvents actions={listActions} />
          </CardContent>

        </Card>
      </div>
    </div>
  );
}
