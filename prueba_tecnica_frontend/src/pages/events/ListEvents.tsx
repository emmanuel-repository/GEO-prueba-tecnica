import { TableHeaderCustom } from "@/components/custom/TableHeaderCustom";
import { TableBodyCustom } from "@/components/custom/TableBodyCustom";
import { PaginationTableCustom } from "@/components/custom/PaginationTableCustom";
import { ActionsTable } from "@/core/interfaces/actionsTable.interface";
import { KeysTable } from "@/core/interfaces/keysTable.interface";
import { useApi } from "@/core/hooks/useApi";
import { getColumns } from "@/core/lib/tables.configs";
import { Table } from "@/components/ui/table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo } from "react";
import { eventsService } from "@/core/services/events.service";
import { useEventStore } from "@/core/stores/event.store";

interface ListEventsProps {
  actions: ActionsTable[];
}

export const ListEvents: React.FC<ListEventsProps> = ({ actions }) => {

  const { eventList, setEventList } = useEventStore();
  const { data: fetchedList, error } = useApi(eventsService.getAll);

  const keysColumns = useMemo<KeysTable[]>(
    () => [
      { keyColumn: "id", description: "ID" },
      { keyColumn: "name", description: "Nombre" },
      { keyColumn: "location", description: "Ubicación" },
      { keyColumn: "eventDate", description: "Fecha" },
      { keyColumn: "instrumentsCount", description: "Instrumentos" },
      { keyColumn: "statusLabel", description: "Estado" },
    ],
    []
  );

  const columns = useMemo(() => getColumns(keysColumns, actions), [actions, keysColumns]);

  useEffect(() => {
    if (fetchedList) {
      setEventList(fetchedList);
    } else if (error) {
      setEventList([]);
    }
  }, [fetchedList, error, setEventList]);

  // Añade columnas derivadas: conteo de instrumentos y etiqueta de estado
  const tableData = useMemo(
    () => eventList.map((e) => ({
      ...e,
      instrumentsCount: e.instruments?.length ?? 0,
      statusLabel: e.status === 1 ? "Agendado" : "Finalizado",
    })),
    [eventList]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <Table>
        <TableHeaderCustom table={table} />
        <TableBodyCustom table={table} columns={columns} />
      </Table>
      <div className="pt-8">
        <PaginationTableCustom table={table} />
      </div>
    </>
  );
};
