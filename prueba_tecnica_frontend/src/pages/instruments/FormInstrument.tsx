import { infoAlert, successAlert } from "@/components/custom/Swal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApiError } from "@/core/interfaces/api.interface";
import { MusicalInstrumentFormData } from "@/core/interfaces/musicalInstrument.interface";
import { Category } from "@/core/interfaces/category.interface";
import { musicalInstrumentService } from "@/core/services/musicalInstrument.service";
import { useApi } from "@/core/hooks/useApi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function FormInstrument() {

  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm<MusicalInstrumentFormData>({
    defaultValues: {
      name: "", type: "", price: 0, description: "",
      color: "", size: "", brand: "", model: "", categoryId: 0,
    },
  });

  // Carga las categorías para el select
  const { data: categories } = useApi<Category[]>(musicalInstrumentService.getCategories);

  const { refetch } = useApi(
    () => musicalInstrumentService.create(getValues()),
    {
      onSuccess: () => {
        successAlert('Instrumento creado correctamente.');
        setTimeout(() => navigate('/list-instruments'), 1000);
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
              <div className="text-5xl">Nuevo Instrumento</div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-4 space-y-6">

              <div className="grid grid-cols-2 gap-6">

                {/* Columna 1 */}
                <div className="flex flex-col space-y-4">

                  <div className="flex flex-col space-y-1.5">
                    <Label>Nombre:</Label>
                    <Input {...register('name', { required: true })} />
                    {errors.name && <span className="text-red-500 text-sm">Campo requerido</span>}
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label>Tipo:</Label>
                    <Input {...register('type', { required: true })} />
                    {errors.type && <span className="text-red-500 text-sm">Campo requerido</span>}
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label>Precio:</Label>
                    <Input type="number" step="0.01" {...register('price', { required: true, valueAsNumber: true })} />
                    {errors.price && <span className="text-red-500 text-sm">Campo requerido</span>}
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label>Descripción:</Label>
                    <Input {...register('description', { required: true })} />
                    {errors.description && <span className="text-red-500 text-sm">Campo requerido</span>}
                  </div>

                </div>

                {/* Columna 2 */}
                <div className="flex flex-col space-y-4">

                  <div className="flex flex-col space-y-1.5">
                    <Label>Color:</Label>
                    <Input {...register('color', { required: true })} />
                    {errors.color && <span className="text-red-500 text-sm">Campo requerido</span>}
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label>Tamaño:</Label>
                    <Input {...register('size', { required: true })} />
                    {errors.size && <span className="text-red-500 text-sm">Campo requerido</span>}
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label>Marca:</Label>
                    <Input {...register('brand', { required: true })} />
                    {errors.brand && <span className="text-red-500 text-sm">Campo requerido</span>}
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label>Modelo:</Label>
                    <Input {...register('model', { required: true })} />
                    {errors.model && <span className="text-red-500 text-sm">Campo requerido</span>}
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label>Categoría:</Label>
                    <Select onValueChange={(val) => setValue('categoryId', Number(val))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((cat) => (
                          <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.categoryId && <span className="text-red-500 text-sm">Campo requerido</span>}
                  </div>

                </div>
              </div>

              <div className="flex justify-center gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate('/list-instruments')}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-green-600 text-white">
                  Guardar
                </Button>
              </div>

            </form>
          </CardContent>

        </Card>
      </div>
    </div>
  );
}
