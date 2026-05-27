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
import { musicalInstrumentService } from "@/core/services/musicalInstrument.service";
import { useMusicalInstrumentStore } from "@/core/stores/musicalInstrument.store";

interface ListInstrumentsProps {
  actions: ActionsTable[];
}

export const ListInstruments: React.FC<ListInstrumentsProps> = ({ actions }) => {

  const { instrumentList, setInstrumentList } = useMusicalInstrumentStore();
  const { data: fetchedList, error } = useApi(musicalInstrumentService.getAll);

  const keysColumns = useMemo<KeysTable[]>(
    () => [
      { keyColumn: "id", description: "ID" },
      { keyColumn: "name", description: "Nombre" },
      { keyColumn: "brand", description: "Marca" },
      { keyColumn: "model", description: "Modelo" },
      { keyColumn: "type", description: "Tipo" },
      { keyColumn: "price", description: "Precio" },
      { keyColumn: "color", description: "Color" },
    ],
    []
  );

  const columns = useMemo(() => getColumns(keysColumns, actions), [actions, keysColumns]);

  useEffect(() => {
    if (fetchedList) {
      setInstrumentList(fetchedList);
    } else if (error) {
      setInstrumentList([]);
    }
  }, [fetchedList, error, setInstrumentList]);

  const table = useReactTable({
    data: instrumentList,
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
