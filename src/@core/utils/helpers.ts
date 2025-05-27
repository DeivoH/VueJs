// 👉 IsEmpty
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined || value === '')
    return true

  return !!(Array.isArray(value) && value.length === 0)
}

// 👉 IsNullOrUndefined
export const isNullOrUndefined = (value: unknown): value is undefined | null => {
  return value === null || value === undefined
}

// 👉 IsEmptyArray
export const isEmptyArray = (arr: unknown): boolean => {
  return Array.isArray(arr) && arr.length === 0
}

// 👉 IsObject
export const isObject = (obj: unknown): obj is Record<string, unknown> =>
  obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)

// 👉 IsToday
export const isToday = (date: Date) => {
  const today = new Date()

  return (
    date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getFullYear() === today.getFullYear()
  )
}



export const openPdfBase64 = (pdfBase64: string) => {
  // Crear una nueva ventana
  const newWindow = window.open('', '_blank');

  // Verificar si la ventana emergente fue bloqueada por el navegador
  if (newWindow) {
    // Crear un documento HTML en la ventana emergente
    const html = `
      <html>
        <head>
          <title>PDF Viewer</title>
        </head>
        <body>
          <embed width="100%" height="100%" src="data:application/pdf;base64,${pdfBase64}" type="application/pdf">
        </body>
      </html>
    `;

    // Escribir el contenido HTML en la ventana emergente
    newWindow.document.write(html);
  } else {
    // Mostrar un mensaje de error si la ventana emergente fue bloqueada
    alert('La ventana emergente fue bloqueada por el navegador. Asegúrate de permitir ventanas emergentes.');
  }
}




export const downloadFile = (fileJson: string) => {
  if (fileJson) {
    // Crea un elemento <a> (enlace) para la descarga
    const link = document.createElement('a');
    link.href = fileJson; // Establece la URL del archivo
    link.target = "_blank"; // Establece la URL del archivo

    // Extrae el nombre del archivo del enlace
    const fileName = fileJson.split('/').pop();

    // Asigna el nombre del archivo al atributo "download" del enlace
    if (fileName) {
      link.setAttribute('download', fileName);
    }

    // Simula un clic en el enlace para iniciar la descarga
    link.click();
  }
}


export const colorStatus = (id: number | null = null) => {
  let color = "secondary";
  switch (id) {
    case 1:
    case 4:
    case 5:
    case 7:
      color = "error";
      break;
    case 2:
    case 3:
    case 6:
      color = "success";
      break;
    default:
      break;
  }
  return color;
};

export const formatUrlForm = (url: string, action: string, id?: null | number) => {
  if (id) {
    return `/${url}/${action}/${id}`
  }
  return `/${url}/${action}`
}




export const randomNumberInRange = (rangoMinimo: number = 0, rangoMaximo: number = 99999999) => {  

  return Math.floor(Math.random() * (rangoMaximo - rangoMinimo + 1)) + rangoMinimo;
 
}
