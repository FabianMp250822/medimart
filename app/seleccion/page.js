import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { SedeContext } from '../../context/SedeContext';

const SeleccionSede = () => {
  const router = useRouter();
  const { setSede } = useContext(SedeContext);

  const sedes = [
    { id: 'sede1', nombre: 'Sede 1', imagen: 'https://picsum.photos/200' },
    { id: 'sede2', nombre: 'Sede 2', imagen: 'https://picsum.photos/201' },
    { id: 'sede3', nombre: 'Sede 3', imagen: 'https://picsum.photos/202' },
    { id: 'sede4', nombre: 'Sede 4', imagen: 'https://picsum.photos/203' },
  ];

  const seleccionarSede = (sedeSeleccionada) => {
    setSede(sedeSeleccionada);
    router.push('/home'); // Aquí es donde les redirigimos al Home
  };

  return (
    <div className="seleccion-sede">
      <h1>Seleccione su sede</h1>
      <div className="sedes">
        {sedes.map((sede) => (
          <div key={sede.id} className="sede" onClick={() => seleccionarSede(sede.id)}>
            <img src={sede.imagen} alt={sede.nombre} />
            <p>{sede.nombre}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .seleccion-sede {
          text-align: center;
          padding: 50px;
        }
        .sedes {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
        }
        .sede {
          cursor: pointer;
          width: 200px;
        }
        .sede img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
        .sede p {
          margin-top: 10px;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
};

export default SeleccionSede;
