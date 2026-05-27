import { infoAlert, successAlert } from "@/components/custom/Swal";
import { musicalInstrumentService } from "../services/musicalInstrument.service";
import { useApi } from "./useApi";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiError = any;

export const useDeleteInstrument = (onDeleted?: () => void) => {
  return useApi((id: number) => musicalInstrumentService.delete(id), {
    autoFetch: false,
    onSuccess: () => {
      successAlert('Instrumento eliminado correctamente');
      onDeleted?.();
    },
    onError: (error: ApiError) => {
      infoAlert('Error', error.message);
    },
  });
};
