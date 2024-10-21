// components/SedeSelectorModal.js

import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Asegúrate de apuntar al elemento correcto en tu aplicación

function SedeSelectorModal({ isOpen, sedes, onSedeSelect }) {
  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Selecciona una Sede"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      className="bg-white rounded-lg p-8 max-w-4xl mx-auto my-8 outline-none relative"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
        Selecciona una Sede
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {sedes.map((sede) => (
          <div
            key={sede.id}
            className="cursor-pointer text-center transform transition duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => onSedeSelect(sede.name)}
          >
            <img
              src={sede.image}
              alt={sede.name}
              className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto object-cover"
            />
            <h3 className="mt-6 text-xl font-bold text-gray-700">
              {sede.name}
            </h3>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default SedeSelectorModal;
