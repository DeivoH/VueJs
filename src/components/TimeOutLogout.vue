<template>
  <!-- Tu interfaz de usuario y contenido aquí -->
</template>

<script>
import { router } from '@/plugins/1.router';
import { onMounted, onUnmounted } from 'vue';

export default {
  setup() {

    // const sessionTimeout = 5000; // Tiempo de sesión en milisegundos (5 seg en este ejemplo)
    const sessionTimeout = 39600000; // Tiempo de sesión en milisegundos (11 horas en este ejemplo)
    let timeoutId;

    const logout = () => {
      // Aquí puedes implementar la lógica para cerrar la sesión del usuario
      // Por ejemplo, llamar a una acción de logout, limpiar el almacenamiento local, etc.
      // Ejemplo: this.$store.dispatch('logout');

      router.push("/posts");
      // console.log('Usuario deslogueado automáticamente debido a inactividad.');
    };

    const resetTimeout = () => {
      // console.log('accion hecha.');

      clearTimeout(timeoutId);
      timeoutId = setTimeout(logout, sessionTimeout);
    };

    const setupListeners = () => {
      ['click', 'mousemove', 'keypress'].forEach(event => {
        window.addEventListener(event, resetTimeout);
      });
    };

    onMounted(() => {
      setupListeners();
      resetTimeout();
    });

    onUnmounted(() => {
      ['click', 'mousemove', 'keypress'].forEach(event => {
        window.removeEventListener(event, resetTimeout);
      });
    });

    return {
      resetTimeout
    };
  }
};
</script>
