import { useState, useRef } from "react";
import Modal from "@/components/Modal"; // Asegúrate de tener tu componente Modal
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase"; // Asegúrate de que tu configuración de Firebase incluya Storage
import { db } from "@/lib/firebase"; // Importa la instancia de la base de datos desde tu archivo de configuración
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment, setDoc, query, where, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
export default function PostularmeModal({ show, onClose, oferta }) {
    // Información Personal
    const [nombresApellidos, setNombresApellidos] = useState("");
    const [tipoDocumento, setTipoDocumento] = useState("Cédula de Ciudadanía");
    const [numeroDocumento, setNumeroDocumento] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [lugarNacimiento, setLugarNacimiento] = useState("");
    const [genero, setGenero] = useState("Masculino");
    const [estadoCivil, setEstadoCivil] = useState("Soltero");
    const [direccionResidencia, setDireccionResidencia] = useState("");
    const [telefonoFijo, setTelefonoFijo] = useState("");
    const [telefonoCelular, setTelefonoCelular] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [referencias, setReferencias] = useState([]);
    const [tempNombreRef, setTempNombreRef] = useState("");
const [tempTelefonoRef, setTempTelefonoRef] = useState("");
const [tempRelacionRef, setTempRelacionRef] = useState("");
    // Información Académica
    const [tituloMedico, setTituloMedico] = useState("");
    const [universidad, setUniversidad] = useState("");
    const [fechaGrado, setFechaGrado] = useState("");
    const [paisTitulo, setPaisTitulo] = useState("");
    const [tituloConvalidado, setTituloConvalidado] = useState("No");
    const [numeroResolucion, setNumeroResolucion] = useState("");
    const [especializacion, setEspecializacion] = useState("");
    const [universidadEspecializacion, setUniversidadEspecializacion] = useState("");
    const [fechaInicioEspecializacion, setFechaInicioEspecializacion] = useState("");
    const [fechaFinEspecializacion, setFechaFinEspecializacion] = useState("");
    const [otraInfoAcademica, setOtraInfoAcademica] = useState("");

    // Experiencia Laboral
    const [experiencias, setExperiencias] = useState([]);
    // Campos temporales para agregar una nueva experiencia
    const [tempEntidad, setTempEntidad] = useState("");
    const [tempCargo, setTempCargo] = useState("");
    const [tempFechaInicio, setTempFechaInicio] = useState("");
    const [tempFechaFin, setTempFechaFin] = useState("");
    const [tempFunciones, setTempFunciones] = useState("");

    // Certificaciones y Habilidades
    const [certificaciones, setCertificaciones] = useState([]);
    const [tempNombreCertificacion, setTempNombreCertificacion] = useState("");
    const [tempEntidadCertificadora, setTempEntidadCertificadora] = useState("");
    const [tempFechaExpedicion, setTempFechaExpedicion] = useState("");

    const [tieneTarjetaProfesional, setTieneTarjetaProfesional] = useState("No");
    const [numeroTarjetaProfesional, setNumeroTarjetaProfesional] = useState("");
    const [cursosAdicionales, setCursosAdicionales] = useState("");
    const [idiomas, setIdiomas] = useState("");
    const [habilidadesInformaticas, setHabilidadesInformaticas] = useState("");
    const [tieneRethus, setTieneRethus] = useState("No"); // Valor inicial "No"
    // Información Adicional
    const [tieneDiscapacidad, setTieneDiscapacidad] = useState("No");
    const [perteneceMinoria, setPerteneceMinoria] = useState("No");
    const [aspiracionSalarial, setAspiracionSalarial] = useState("");
    const [disponibilidadViajar, setDisponibilidadViajar] = useState("No");
    const [referenciasPersonales, setReferenciasPersonales] = useState("");

    // Estados para la subida de archivos
    const [cvFile, setCvFile] = useState(null);
    const [certificadosFiles, setCertificadosFiles] = useState([]);

    // Referencias a los inputs de archivos
    const cvFileInput = useRef(null);
    const certificadosFileInput = useRef(null);

    // Funciones para manejar la subida de archivos
    const handleCvFileChange = (e) => {
        if (e.target.files[0]) {
            setCvFile(e.target.files[0]);
        }
    };

    const handleCertificadosFileChange = (e) => {
        if (e.target.files) {
            setCertificadosFiles([...certificadosFiles, ...e.target.files]);
        }
    };
    const handleAgregarExperiencia = () => {
        setExperiencias([
            ...experiencias,
            {
                entidad: tempEntidad,
                cargo: tempCargo,
                fechaInicio: tempFechaInicio,
                fechaFin: tempFechaFin,
                funciones: tempFunciones,
            },
        ]);
        // Limpiar campos temporales
        setTempEntidad("");
        setTempCargo("");
        setTempFechaInicio("");
        setTempFechaFin("");
        setTempFunciones("");
    };
    const handleAgregarCertificacion = () => {
        setCertificaciones([
            ...certificaciones,
            {
                nombre: tempNombreCertificacion,
                entidad: tempEntidadCertificadora,
                fechaExpedicion: tempFechaExpedicion,
            },
        ]);
        // Limpiar campos temporales
        setTempNombreCertificacion("");
        setTempEntidadCertificadora("");
        setTempFechaExpedicion("");
    };
    const handleEliminarExperiencia = (index) => {
        setExperiencias(experiencias.filter((_, i) => i !== index));
    };

    const handleEliminarCertificacion = (index) => {
        setCertificaciones(certificaciones.filter((_, i) => i !== index));
    };
    const handleAgregarReferencia = () => {
        setReferencias([
          ...referencias,
          {
            nombre: tempNombreRef,
            telefono: tempTelefonoRef,
            relacion: tempRelacionRef,
            // ... otros campos
          },
        ]);
        // Limpiar campos temporales
        setTempNombreRef("");
        setTempTelefonoRef("");
        setTempRelacionRef("");
        // ... limpiar otros campos
      };
      const handleEliminarReferencia = (index) => {
        setReferencias(referencias.filter((_, i) => i !== index));
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        const postulacionId = uuidv4();
      
        // Subir CV
        let cvUrl = "";
        if (cvFile) {
          const cvRef = ref(storage, `postulaciones/${postulacionId}/cv/${cvFile.name}`);
          const cvSnapshot = await uploadBytes(cvRef, cvFile);
          cvUrl = await getDownloadURL(cvSnapshot.ref);
        }
      
        // Subir Certificados
        let certificadosUrls = [];
        if (certificadosFiles.length > 0) {
          for (const file of certificadosFiles) {
            const certRef = ref(storage, `postulaciones/${postulacionId}/certificados/${file.name}`);
            const certSnapshot = await uploadBytes(certRef, file);
            const certUrl = await getDownloadURL(certSnapshot.ref);
            certificadosUrls.push(certUrl);
          }
        }
      
        const postulacion = {
          id: postulacionId,
          ofertaId: oferta.id,
          ofertaTitulo: oferta.titulo,
          fechaPostulacion: serverTimestamp(),
          estado: "pendiente",
          informacionPersonal: {
            nombresApellidos,
            tipoDocumento,
            numeroDocumento,
            fechaNacimiento,
            lugarNacimiento,
            genero,
            estadoCivil,
            direccionResidencia,
            telefonoFijo,
            telefonoCelular,
            correoElectronico,
          },
          informacionAcademica: {
            tituloMedico,
            universidad,
            fechaGrado,
            paisTitulo,
            tituloConvalidado,
            numeroResolucion,
            especializacion,
            universidadEspecializacion,
            fechaInicioEspecializacion,
            fechaFinEspecializacion,
            otraInfoAcademica,
          },
          experienciaLaboral: experiencias,
          certificacionesYHabilidades: {
            certificaciones,
            tieneTarjetaProfesional,
            numeroTarjetaProfesional,
            cursosAdicionales,
            idiomas,
            habilidadesInformaticas
          },
          informacionAdicional: {
            tieneDiscapacidad,
            perteneceMinoria,
            aspiracionSalarial,
            disponibilidadViajar,
            referencias,
            tieneRethus
          },
          archivos: {
            cvUrl,
            certificadosUrls,
          },
        };
      
        try {
          // Verificar si el correo ya existe en la oferta (si la oferta existe)
          if (oferta.titulo !== 'Sin Oferta') {
            const postulacionesRef = collection(db, "postulaciones");
            const q = query(postulacionesRef, where("ofertaId", "==", oferta.id), where("informacionPersonal.correoElectronico", "==", correoElectronico));
            const querySnapshot = await getDocs(q);
      
            if (!querySnapshot.empty) {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ya te has postulado a esta oferta con este correo electrónico.',
                confirmButtonText: 'Aceptar'
              });
              return; 
            }
          } else {
            // Caso 2: Sin Oferta -> Verificar por correoElectronico y ofertaTitulo
            const postulacionesRef = collection(db, "postulaciones");
            const q = query(postulacionesRef, where("ofertaTitulo", "==", "Sin Oferta"), where("informacionPersonal.correoElectronico", "==", correoElectronico));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ya te has envio tu Curriculun a la clinica.',
                    confirmButtonText: 'Aceptar'
                });
                return;
            }
        }
          
      
          // Guardar en Firestore
          await setDoc(doc(collection(db, "postulaciones"), postulacionId), postulacion);
      
          // Actualizar el contador de postulaciones en la oferta (si existe)
          if (oferta.titulo !== 'Sin Oferta') { 
            const ofertaRef = doc(db, "ofertasEmpleos", oferta.id);
            await updateDoc(ofertaRef, {
              postulaciones: increment(1)
            });
          }
      
          console.log("Postulación enviada con éxito");
      
          // Enviar el correo de confirmación
          const response = await fetch('https://us-central1-clinica-de-la-costa.cloudfunctions.net/enviarCorreoPostulacion', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postulacion: postulacion }),
          });
      
          if (response.ok) {
            console.log("Correo de confirmación enviado con éxito");
          } else {
            console.error("Error al enviar el correo de confirmación");
          }
      
          // Mostrar mensaje de éxito con SweetAlert2
          Swal.fire({
            icon: 'success',
            title: '¡Postulación enviada!',
            text: 'Tu postulación se ha enviado correctamente. Pronto nos pondremos en contacto contigo.',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            // Limpiar el formulario
            setNombresApellidos("");
            setTipoDocumento("Cédula de Ciudadanía");
            setNumeroDocumento("");
            // ... (resto de los campos del formulario)
      
            // Limpiar los inputs de archivos
            cvFileInput.current.value = null;
            certificadosFileInput.current.value = null;
      
            onClose(); // Cerrar el modal
          });
      
        } catch (error) {
          console.error("Error al enviar la postulación:", error);
          // Mostrar mensaje de error con SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al enviar la postulación. Por favor, inténtalo de nuevo más tarde.',
            confirmButtonText: 'Aceptar'
          });
        }
      };
    return (
        <Modal show={show} onClose={onClose}>
            <div className="postularme-modal" > 
                <h2 className="modal-title">Postularme a {oferta.titulo}</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <h3 className="section-title">Información Personal</h3>
                            <div className="form-group">
                                <label htmlFor="nombresApellidos">Nombres y Apellidos:</label>
                                <input
                                    type="text"
                                    id="nombresApellidos"
                                    className="form-control"
                                    value={nombresApellidos}
                                    onChange={(e) => setNombresApellidos(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tipoDocumento">Tipo de Documento:</label>
                                <select
                                    id="tipoDocumento"
                                    className="form-control"
                                    value={tipoDocumento}
                                    onChange={(e) => setTipoDocumento(e.target.value)}
                                    required
                                >
                                    <option>Cédula de Ciudadanía</option>
                                    <option>Cédula de Extranjería</option>
                                    <option>Pasaporte</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="numeroDocumento">Número de Documento:</label>
                                <input
                                    type="text"
                                    id="numeroDocumento"
                                    className="form-control"
                                    value={numeroDocumento}
                                    onChange={(e) => setNumeroDocumento(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                                <input
                                    type="date"
                                    id="fechaNacimiento"
                                    className="form-control"
                                    value={fechaNacimiento}
                                    onChange={(e) => setFechaNacimiento(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lugarNacimiento">Lugar de Nacimiento:</label>
                                <input
                                    type="text"
                                    id="lugarNacimiento"
                                    className="form-control"
                                    value={lugarNacimiento}
                                    onChange={(e) => setLugarNacimiento(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="genero">Género:</label>
                                <select
                                    id="genero"
                                    className="form-control"
                                    value={genero}
                                    onChange={(e) => setGenero(e.target.value)}
                                    required
                                >
                                    <option>Masculino</option>
                                    <option>Femenino</option>
                                    <option>Otro</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="estadoCivil">Estado Civil:</label>
                                <select
                                    id="estadoCivil"
                                    className="form-control"
                                    value={estadoCivil}
                                    onChange={(e) => setEstadoCivil(e.target.value)}
                                >
                                    <option>Soltero</option>
                                    <option>Casado</option>
                                    <option>Unión Libre</option>
                                    <option>Viudo</option>
                                    <option>Divorciado</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="direccionResidencia">Dirección de Residencia:</label>
                                <input
                                    type="text"
                                    id="direccionResidencia"
                                    className="form-control"
                                    value={direccionResidencia}
                                    onChange={(e) => setDireccionResidencia(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="telefonoFijo">Teléfono Fijo:</label>
                                <input
                                    type="text"
                                    id="telefonoFijo"
                                    className="form-control"
                                    value={telefonoFijo}
                                    onChange={(e) => setTelefonoFijo(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="telefonoCelular">Teléfono Celular:</label>
                                <input
                                    type="text"
                                    id="telefonoCelular"
                                    className="form-control"
                                    value={telefonoCelular}
                                    onChange={(e) => setTelefonoCelular(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="correoElectronico">Correo Electrónico:</label>
                                <input
                                    type="email"
                                    id="correoElectronico"
                                    className="form-control"
                                    value={correoElectronico}
                                    onChange={(e) => setCorreoElectronico(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                            <label htmlFor="tipoDocumento">Seleccione Tarjeta o Resolución:</label>
  <label htmlFor="tipoDocumento">Tipo de Documento:</label>
  <select
    id="tipoDocumento"
    className="form-control"
    value={tipoDocumento}
    onChange={(e) => {
      setTipoDocumento(e.target.value);
      setNumeroDocumento(""); // Limpiar el número al cambiar el tipo de documento
    }}
  >
    <option value="tarjeta">Tarjeta Profesional</option>
    <option value="resolucion">Resolución</option>
  </select>
</div>
<div className="form-group">
  <label htmlFor="numeroDocumento">Número de {tipoDocumento === "tarjeta" ? "Tarjeta Profesional" : "Resolución"}:</label>
  <input
    type="text"
    id="numeroDocumento"
    className="form-control"
    value={numeroDocumento}
    onChange={(e) => setNumeroDocumento(e.target.value)}
    disabled={tipoDocumento === ""} // Deshabilitar si no se ha seleccionado un tipo de documento
  />
</div>
<div className="form-group">
  <label htmlFor="tieneRethus">¿Tiene RETHUS?</label>
  <select
    id="tieneRethus"
    className="form-control"
    value={tieneRethus}
    onChange={(e) => setTieneRethus(e.target.value)}
  >
    <option>Sí</option>
    <option>No</option>
  </select>
</div>
                        </div>
                        <div className="col-md-6">
                            <h3 className="section-title">Información Académica</h3>
                            <div className="form-group">
                                <label htmlFor="tituloMedico">Título Obtenido:</label>
                                <input
                                    type="text"
                                    id="tituloMedico"
                                    className="form-control"
                                    value={tituloMedico}
                                    onChange={(e) => setTituloMedico(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="universidad">Universidad:</label>
                                <input
                                    type="text"
                                    id="universidad"
                                    className="form-control"
                                    value={universidad}
                                    onChange={(e) => setUniversidad(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="fechaGrado">Fecha de Grado:</label>
                                <input
                                    type="date"
                                    id="fechaGrado"
                                    className="form-control"
                                    value={fechaGrado}
                                    onChange={(e) => setFechaGrado(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
  <label htmlFor="paisTitulo">País donde Obtuvo el Título:</label>
  <input
    type="text"
    id="paisTitulo"
    className="form-control"
    value={paisTitulo}
    onChange={(e) => setPaisTitulo(e.target.value)}
    required
  />
</div>
                            <div className="form-group">
                                <label htmlFor="tituloConvalidado">¿Título Convalidado en Colombia?</label>
                                <select
                                    id="tituloConvalidado"
                                    className="form-control"
                                    value={tituloConvalidado}
                                    onChange={(e) => setTituloConvalidado(e.target.value)}
                                    required
                                >
                                    <option>Sí</option>
                                    <option>No</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="numeroResolucion">Número de Resolución de Convalidación (si aplica):</label>
                                <input
                                    type="text"
                                    id="numeroResolucion"
                                    className="form-control"
                                    value={numeroResolucion}
                                    onChange={(e) => setNumeroResolucion(e.target.value)}
                                />
                           </div>
                            <div className="form-group">
                                <label htmlFor="especializacion">Especialización:</label>
                                <input
                                    type="text"
                                    id="especializacion"
                                    className="form-control"
                                    value={especializacion}
                                    onChange={(e) => setEspecializacion(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="universidadEspecializacion">Universidad donde Realizó la Especialización:</label>
                                <input
                                    type="text"
                                    id="universidadEspecializacion"
                                    className="form-control"
                                    value={universidadEspecializacion}
                                    onChange={(e) => setUniversidadEspecializacion(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="fechaInicioEspecializacion">Fecha de Inicio de la Especialización:</label>
                                <input
                                    type="date"
                                    id="fechaInicioEspecializacion"
                                    className="form-control"
                                    value={fechaInicioEspecializacion}
                                    onChange={(e) => setFechaInicioEspecializacion(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="fechaFinEspecializacion">Fecha de Finalización de la Especialización:</label>
                                <input
                                    type="date"
                                    id="fechaFinEspecializacion"
                                    className="form-control"
                                    value={fechaFinEspecializacion}
                                    onChange={(e) => setFechaFinEspecializacion(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="otraInfoAcademica">Otra Información Académica Relevante:</label>
                                <textarea
                                    id="otraInfoAcademica"
                                    className="form-control"
                                    value={otraInfoAcademica}
                                    onChange={(e) => setOtraInfoAcademica(e.target.value)}
                                />
                            </div>
                            <h3 className="section-title">Experiencia Laboral</h3>
                            <div className="form-group">
                                <label htmlFor="tempEntidad">Entidad:</label>
                                <input
                                    type="text"
                                    id="tempEntidad"
                                    className="form-control"
                                    value={tempEntidad}
                                    onChange={(e) => setTempEntidad(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tempCargo">Cargo:</label>
                                <input
                                    type="text"
                                    id="tempCargo"
                                    className="form-control"
                                    value={tempCargo}
                                    onChange={(e) => setTempCargo(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tempFechaInicio">Fecha de Inicio:</label>
                                <input
                                    type="date"
                                    id="tempFechaInicio"
                                    className="form-control"
                                    value={tempFechaInicio}
                                    onChange={(e) => setTempFechaInicio(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tempFechaFin">Fecha de Finalización:</label>
                                <input
                                    type="date"
                                    id="tempFechaFin"
                                    className="form-control"
                                    value={tempFechaFin}
                                    onChange={(e) => setTempFechaFin(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tempFunciones">Funciones Desempeñadas:</label>
                                <textarea
                                    id="tempFunciones"
                                    className="form-control"
                                    value={tempFunciones}
                                    onChange={(e) => setTempFunciones(e.target.value)}
                                />
                            </div>
                            <button type="button" className="btn btn-secondary" onClick={handleAgregarExperiencia}>
                                Agregar Experiencia
                            </button>
                            {experiencias.map((exp, index) => (
                                <div key={index} className="experiencia-item">
                                    <p>
                                        <strong>Entidad:</strong> {exp.entidad} - <strong>Cargo:</strong> {exp.cargo}
                                    </p>
                                    <p>
                                        <strong>Desde:</strong> {exp.fechaInicio} - <strong>Hasta:</strong> {exp.fechaFin}
                                    </p>
                                    <p>
                                        <strong>Funciones:</strong> {exp.funciones}
                                    </p>
                                    <button type="button" className="btn btn-danger" onClick={() => handleEliminarExperiencia(index)}>
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <h3 className="section-title">Certificaciones y Habilidades</h3>
                            <div className="form-group">
                                <label htmlFor="tempNombreCertificacion">Nombre de la Certificación:</label>
                                <input
                                    type="text"
                                    id="tempNombreCertificacion"
                                    className="form-control"
                                    value={tempNombreCertificacion}
                                    onChange={(e) => setTempNombreCertificacion(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tempEntidadCertificadora">Entidad Certificadora:</label>
                                <input
                                    type="text"
                                    id="tempEntidadCertificadora"
                                    className="form-control"
                                    value={tempEntidadCertificadora}
                                    onChange={(e) => setTempEntidadCertificadora(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tempFechaExpedicion">Fecha de Expedición:</label>
                                <input
                                    type="date"
                                    id="tempFechaExpedicion"
                                    className="form-control"
                                    value={tempFechaExpedicion}
                                    onChange={(e) => setTempFechaExpedicion(e.target.value)}
                                />
                            </div>
                            <button type="button" className="btn btn-secondary" onClick={handleAgregarCertificacion}>
                                Agregar Certificación
                            </button>
                            {certificaciones.map((cert, index) => (
                                <div key={index} className="certificacion-item">
                                    <p>
                                        <strong>Nombre:</strong> {cert.nombre} - <strong>Entidad:</strong> {cert.entidad}
                                    </p>
                                    <p>
                                        <strong>Fecha de Expedición:</strong> {cert.fechaExpedicion}
                                    </p>
                                    <button type="button" className="btn btn-danger" onClick={() => handleEliminarCertificacion(index)}>
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                            <div className="form-group">
                                <label htmlFor="cursosAdicionales">Cursos Adicionales:</label>
                                <textarea
                                    id="cursosAdicionales"
                                    className="form-control"
                                    value={cursosAdicionales}
                                    onChange={(e) => setCursosAdicionales(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="idiomas">Idiomas:</label>
                                <input type="text"
                                    id="idiomas"
                                    className="form-control"
                                    value={idiomas}
                                    onChange={(e) => setIdiomas(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="habilidadesInformaticas">Habilidades Informáticas:</label>
                                <input type="text"
                                    id="habilidadesInformaticas"
                                    className="form-control"
                                    value={habilidadesInformaticas}
                                    onChange={(e) => setHabilidadesInformaticas(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h3 className="section-title">Información Adicional</h3>
                            <div className="form-group">
                                <label htmlFor="tieneDiscapacidad">¿Tiene alguna discapacidad?</label>
                                <select
                                    id="tieneDiscapacidad"
                                    className="form-control"
                                    value={tieneDiscapacidad}
                                    onChange={(e) => setTieneDiscapacidad(e.target.value)}
                                >
                                    <option>Sí</option>
                                    <option>No</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="perteneceMinoria">¿Pertenece a alguna minoría étnica?</label>
                                <select
                                    id="perteneceMinoria"
                                    className="form-control"
                                    value={perteneceMinoria}
                                    onChange={(e) => setPerteneceMinoria(e.target.value)}
                                >
                                    <option>Sí</option>
                                    <option>No</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="aspiracionSalarial">Aspiración Salarial:</label>
                                <input
                                    type="number"
                                    id="aspiracionSalarial"
                                    className="form-control"
                                    value={aspiracionSalarial}
                                    onChange={(e) => setAspiracionSalarial(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="disponibilidadViajar">Disponibilidad para Viajar:</label>
                                <select
                                    id="disponibilidadViajar"
                                    className="form-control"
                                    value={disponibilidadViajar}
                                    onChange={(e) => setDisponibilidadViajar(e.target.value)}
                                >
                                    <option>Sí</option>
                                    <option>No</option>
                                </select>
                            </div>
                            <div className="form-group">
  <label htmlFor="referenciasPersonales">Referencias Personales:</label>
  {/* Campos para una nueva referencia */}
  <div className="form-group">
    <label htmlFor="tempNombreRef">Nombre:</label>
    <input
      type="text"
      id="tempNombreRef"
      className="form-control"
      value={tempNombreRef}
      onChange={(e) => setTempNombreRef(e.target.value)}
    />
  </div>
  <div className="form-group">
    <label htmlFor="tempTelefonoRef">Teléfono:</label>
    <input
      type="text"
      id="tempTelefonoRef"
      className="form-control"
      value={tempTelefonoRef}
      onChange={(e) => setTempTelefonoRef(e.target.value)}
    />
  </div>
  <div className="form-group">
    <label htmlFor="tempRelacionRef">Relación:</label>
    <input
      type="text"
      id="tempRelacionRef"
      className="form-control"
      value={tempRelacionRef}
      onChange={(e) => setTempRelacionRef(e.target.value)}
    />
  </div>

  <button type="button" className="btn btn-secondary" onClick={handleAgregarReferencia}>
    Agregar Referencia
  </button>

  {/* Mostrar las referencias agregadas */}
  {referencias.map((ref, index) => (
    <div key={index} className="referencia-item">
      <p>
        <strong>Nombre:</strong> {ref.nombre} - <strong>Teléfono:</strong> {ref.telefono}
      </p>
      <p>
        <strong>Relación:</strong> {ref.relacion}
      </p>
      
      <button type="button" className="btn btn-danger" onClick={() => handleEliminarReferencia(index)}>
        Eliminar
      </button>
    </div>
  ))}
</div>

                            <div className="form-group">
                                <label htmlFor="cvFile">Subir CV (PDF, DOC, DOCX):</label>
                                <input
                                    type="file"
                                    id="cvFile"
                                    className="form-control-file"
                                    ref={cvFileInput}
                                    onChange={handleCvFileChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="certificadosFiles">Subir Certificados (PDF, DOC, DOCX, ZIP):</label>
                                <input
                                    type="file"
                                    id="certificadosFiles"
                                    className="form-control-file"
                                    ref={certificadosFileInput}
                                    onChange={handleCertificadosFileChange}
                                    multiple
                                />
                            </div>

                        </div>
                    </div>
                    <div className="instrucciones">
                <p><strong>¡Importante!</strong></p>
                <ul>
                    <li>Asegúrate de que tu currículum esté actualizado e incluya una fotografía reciente.</li>
                    <li>Las certificaciones obligatorias para esta postulación deben estar vigentes.</li>
                </ul>
            </div> 
                    <div className="text-center mt-3">
                        <button type="submit" className="btn btn-primary">
                            Enviar Postulación
                        </button>
                    </div>
                </form>
            </div>
            <style jsx>{`
          .postularme-modal {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  max-width: 90%; 
  width: 100%;
  max-height: 90vh; 
  overflow-y: auto;
  padding: 20px;
  position: fixed; /* Para posicionar el modal relativo a la ventana */
  top: 100px;   /* Ajusta este valor para controlar la distancia desde la parte superior */
  left: 50%;
  transform: translateX(-50%); /* Centra horizontalmente */
  z-index: 1050; /* Asegura que el modal esté por encima de otros elementos */
}

@media (min-width: 768px) {
  .postularme-modal {
    max-width: 800px; /* Ancho máximo en pantallas más grandes */
  }
}

.modal-title {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 20px;
  position: relative; /* Para posicionar el botón de cerrar */
}

.modal-title .close-button { /* Estilos para el botón de cerrar */
  position: absolute;
  top: -10px; /* Ajusta la posición vertical */
 
   right: -20px; /* Ajusta este valor para que se extienda hacia la derecha */
  padding: 10px 20px; /* Agrega un padding para que el botón sea más grande */
  background-color: #dc3545; /* Color de fondo rojo */
  color: white; /* Color del texto blanco */
  border-radius: 50%;
}

.section-title {
  color: #007bff;
  font-size: 1.25rem;
  margin-top: 30px;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: 600;
}

.form-control, .form-control-file {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  color: #495057;
}

.form-control:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

textarea.form-control {
  min-height: 120px;
  resize: vertical;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
}

.experiencia-item, .certificacion-item {
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}

.experiencia-item p, .certificacion-item p {
  margin: 0 0 5px;
}

.experiencia-item strong, .certificacion-item strong {
  color: #007bff;
}
            `}</style>
        </Modal>
    );
}