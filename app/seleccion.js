// pages/seleccion.js
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { SedeContext } from '../context/SedeContext';
import { sedesData } from '../data/sedes';

const SeleccionSede = () => {
  const router = useRouter();
  const { setSedeId } = useContext(SedeContext);

  const sedes = Object.values(sedesData);

  const seleccionarSede = (sedeSeleccionada) => {
    setSedeId(sedeSeleccionada);
    router.push('/'); // Redirige a la página principal
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
