/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ActionsTable } from "@/core/interfaces/actionsTable.interface";
import { ListInstruments } from "./ListInstruments";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useMusicalInstrumentStore } from "@/core/stores/musicalInstrument.store";
import { MusicalInstrument } from "@/core/interfaces/musicalInstrument.interface";
import { useDeleteInstrument } from "@/core/hooks/useDeleteInstrument";
import { confirmationAlert } from "@/components/custom/Swal";

export default function MainInstrument() {

  const navigate = useNavigate();
  const { setInstrumentData, removeInstrumentFromList } = useMusicalInstrumentStore();
  const pendingDeleteIdRef = useRef<number | null>(null);
  const handleRedirectCreate = useCallback(() => navigate('/new-instrument'), []);

  const handleRedirectUpdate = useCallback((instrument: MusicalInstrument) => {
    setInstrumentData(instrument);
    navigate('/edit-instrument');
  }, []);

  const { refetch: deleteInstrument } = useDeleteInstrument(() => {
    if (pendingDeleteIdRef.current !== null) {
      removeInstrumentFromList(pendingDeleteIdRef.current);
      pendingDeleteIdRef.current = null;
    }
  });

  const handleDelete = useCallback(async (instrument: MusicalInstrument) => {
    const confirmed = await confirmationAlert("Se borrará el instrumento seleccionado, ¡No se podrá revertir!");
    
    if (confirmed.isConfirmed) {
      pendingDeleteIdRef.current = instrument.id;
      deleteInstrument(instrument.id);
    }
  }, []);

  const listActions = useMemo<ActionsTable[]>(
    () => [
      { description: "Editar", callbacks: handleRedirectUpdate },
      { description: "Eliminar", callbacks: handleDelete },
    ],
    [handleRedirectUpdate, handleDelete]
  );

  return (
    <div className="flex flex-row pt-20">
      <div className="ml-4 flex-grow">
        <Card className="w-auto">

          <CardHeader>
            <div className="flex flex-row items-center">
              <div className="basis-5/6 text-5xl">Instrumentos Musicales</div>
              <div className="basis-1/6">
                <Button onClick={handleRedirectCreate}>Nuevo Instrumento</Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <ListInstruments actions={listActions} />
          </CardContent>

        </Card>
      </div>
    </div>
  );
}
