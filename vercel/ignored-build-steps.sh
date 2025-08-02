#!/bin/bash

# Ignorar el paso de compilación si se está compilando la configuración de Genkit
if [[ "$@" == "pnpm run genkit:build" || "$@" == "npm run genkit:build" || "$@" == "yarn genkit:build" ]]; then
  echo "Ignoring Genkit build step"
  exit 0
fi

# Proceder con otros pasos de compilación
exit 1
