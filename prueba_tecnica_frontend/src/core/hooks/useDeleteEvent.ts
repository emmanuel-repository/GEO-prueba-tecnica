import { infoAlert, successAlert } from "@/components/custom/Swal";
import { eventsService } from "../services/events.service";
import { useApi } from "./useApi";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiError = any;

export const useDeleteEvent = (onDeleted?: () => void) => {
  return useApi((id: number) => eventsService.delete(id), {
    autoFetch: false,
    onSuccess: () => {
      successAlert('Evento eliminado correctamente');
      onDeleted?.();
    },
    onError: (error: ApiError) => {
      infoAlert('Error', error.message);
    },
  });
};
