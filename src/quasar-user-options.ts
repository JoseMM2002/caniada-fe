import "quasar/dist/quasar.css";
import iconSet from "quasar/icon-set/ionicons-v4.js";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import "@quasar/extras/ionicons-v4/ionicons-v4.css";

import { Notify } from 'quasar';

const quasarUserOptions = {
  config: {},
  plugins: {Notify}, // Aquí, Notify es un objeto de configuración para el complemento Notify
  iconSet: iconSet,
  dark: true,
};


export default quasarUserOptions;
