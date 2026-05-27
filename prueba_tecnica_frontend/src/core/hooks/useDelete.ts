import { infoAlert, successAlert } from "@/components/custom/Swal";
import { contactService } from "../services/contact.service";
import { Email } from "../interfaces/email.interface";
import { Phone } from "../interfaces/phone.interface";
import { ContactFormData } from "../interfaces/contactFormControl.inteface";
import { useApi } from "./useApi";
import { ApiError } from "../interfaces/api.interface";




export const useDeleteContact = (onDeleted?: (id: number) => void) => {

  return useApi((contact: ContactFormData) => contactService.deleteContact(contact.id!), {
    autoFetch: false,

    onSuccess: (data) => {
      onDeleted?.(data);
      successAlert('Se quito el Numero de telefono de sus registro')
    },

    onError: (error: ApiError) => {
      console.error('Error eliminando contacto:', error.message);
      infoAlert('Error', error.message)
    },
  });

};

export const useDeleteEmail = (onDeleted?: (id: number) => void) => {

  return useApi((email: Email) => contactService.deleteEmailContact(email.id!), {
    autoFetch: false,

    onSuccess: (data) => {
      onDeleted?.(data.id);
      successAlert('Se quito Correo de sus registro')
    },

    onError: (error: ApiError) => {
      console.error('Error eliminando email:', error.message);
      infoAlert('Error', error.message)
    },
  });

};

export const useDeletePhone = (onDeleted?: (id: number) => void) => {

  return useApi((phone: Phone) => contactService.deletePhoneContact(phone.id!), {
    autoFetch: false,

    onSuccess: (data) => {
      onDeleted?.(data.id);
      successAlert('Se quito el Numero de telefono de sus registro')
    },

    onError: (error: ApiError) => {
      console.error('Error eliminando phone:', error.message);
      infoAlert('Error', error.message)
    },
  });

};