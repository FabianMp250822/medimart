'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase'; // Importa 'db' desde tu configuración de Firebase
import { collection, addDoc } from 'firebase/firestore';

export default function SaveServiceComponent() {
  const [jsonInput, setJsonInput] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSave = async () => {
    try {
      const data = JSON.parse(jsonInput);

      // Opcional: Validar la estructura de los datos aquí si es necesario

      const docRef = await addDoc(collection(db, 'especialidades'), data);
      setStatusMessage(`Servicio guardado con ID: ${docRef.id}`);
      // Limpiar el campo después de guardar exitosamente
      setJsonInput('');
    } catch (error) {
      if (error instanceof SyntaxError) {
        setStatusMessage('Error: JSON inválido. Por favor verifica el formato.');
      } else {
        setStatusMessage(`Error al guardar el servicio: ${error.message}`);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Guardar Servicio en Firebase</h2>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Pega el JSON del servicio aquí"
        rows={15}
        cols={80}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <button onClick={handleSave} style={{ padding: '10px 20px' }}>
        Guardar en Firebase
      </button>
      {statusMessage && (
        <p
          style={{
            marginTop: '10px',
            color: statusMessage.startsWith('Error') ? 'red' : 'green',
          }}
        >
          {statusMessage}
        </p>
      )}
    </div>
  );
}
