import { createFetch } from '@vueuse/core';
import { destr } from 'destr';
const { toast } = useToast();

export const useApi = createFetch({
  baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  fetchOptions: {
    headers: {
      Accept: 'application/json',
    },
  },
  options: {
    refetch: true,

    async onFetchError(ctx: any) {
      try {
        if (typeof ctx.data === 'string') {
          ctx.data = JSON.parse(ctx.data)
        }

        toast("Error", "Error en la petición", "danger");

      } catch (err) {
        toast("Error", "Error procesando la respuesta del servidor", "danger");
      }

      return ctx;
    },


    async beforeFetch({ options }) {

      const accessToken = useCookie("accessToken").value;

      if (accessToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }

      if (options.body instanceof FormData) {
        // No establezcas el encabezado Content-Type si son FormData
        delete options.headers["Content-Type"];
      }
      return { options };
    },
    afterFetch(ctx) {
      const { data, response } = ctx

      let parsedData = null
      try {
        parsedData = destr(data)
      }
      catch (error) {
        console.error(error)
      }

      if (parsedData && parsedData.message) {
        if (parsedData.code != 200) {
          toast("Error", parsedData.message, "danger");
        } else {
          toast("Exito", parsedData.message, "success");
        }
      }

      return { data: parsedData, response }
    },
  },
})
