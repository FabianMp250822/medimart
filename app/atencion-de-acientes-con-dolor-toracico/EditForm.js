'use client';

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Asegúrate de importar correctamente Firebase Auth
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function AuthenticatedEditForm({ data, setData, handleImageUpload, handleSaveChanges }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [localData, setLocalData] = useState(data);

    // Usamos useEffect para mostrar el modal de autenticación al montar el componente
    useEffect(() => {
        if (!isAuthenticated) {
            showAuthenticationModal();
        }
    }, [isAuthenticated]);

    const showAuthenticationModal = async () => {
        const { value: formValues } = await MySwal.fire({
            title: "Iniciar Sesión",
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="Correo Electrónico" type="email" />
                <input id="swal-input2" class="swal2-input" placeholder="Contraseña" type="password" />
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Iniciar Sesión',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const email = document.getElementById("swal-input1").value;
                const password = document.getElementById("swal-input2").value;
                if (!email || !password) {
                    Swal.showValidationMessage("Por favor completa todos los campos");
                }
                return { email, password };
            },
            // Ajustamos el ancho del modal
            customClass: {
                popup: 'swal-wide',
            },
        });

        if (formValues) {
            const { email, password } = formValues;
            try {
                await signInWithEmailAndPassword(auth, email, password);
                Swal.fire("¡Autenticado!", "Acceso concedido.", "success");
                setIsAuthenticated(true);
            } catch (error) {
                Swal.fire("Error", "Credenciales inválidas. Intenta de nuevo.", "error");
            }
        } else {
            // Si el usuario cancela, cerramos el modal de edición
            MySwal.close();
        }
    };

    const handleInputChange = (field, value) => {
        setLocalData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
        setData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleNestedInputChange = (parentField, childField, value) => {
        setLocalData((prevData) => ({
            ...prevData,
            [parentField]: {
                ...prevData[parentField],
                [childField]: value,
            },
        }));
        setData((prevData) => ({
            ...prevData,
            [parentField]: {
                ...prevData[parentField],
                [childField]: value,
            },
        }));
    };

    const handleAccordionChange = (index, field, value) => {
        const newAccordion = [...localData.accordion];
        newAccordion[index][field] = value;
        setLocalData({ ...localData, accordion: newAccordion });
        setData({ ...localData, accordion: newAccordion });
    };

    const handleAccordionContentChange = (index, subIndex, field, value) => {
        const newAccordion = [...localData.accordion];
        newAccordion[index].content[subIndex][field] = value;
        setLocalData({ ...localData, accordion: newAccordion });
        setData({ ...localData, accordion: newAccordion });
    };

    // Si no está autenticado, no renderizamos nada (el modal de autenticación ya se está mostrando)
    if (!isAuthenticated) {
        return null;
    }

    // Renderizamos el formulario de edición
    return (
        <div className="container-fluid">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Editar Contenido</h5>
                </div>
                <div className="card-body">
                    {/* Campos del formulario */}
                    <div className="mb-4">
                        <label htmlFor="title" className="form-label">
                            <strong>Título Principal</strong>
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={localData.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            className="form-control"
                        />
                    </div>

                    {/* Imagen del Banner */}
                    <div className="mb-4">
                        <label htmlFor="bannerImage" className="form-label">
                            <strong>Imagen del Banner</strong>
                        </label>
                        <input
                            id="bannerImage"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "banner")}
                            className="form-control"
                        />
                    </div>

                    {/* Descripción */}
                    <div className="mb-4">
                        <label htmlFor="descriptionTitle" className="form-label">
                            <strong>Título de la Descripción</strong>
                        </label>
                        <input
                            id="descriptionTitle"
                            type="text"
                            value={localData.description.title}
                            onChange={(e) => handleNestedInputChange("description", "title", e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="descriptionContent" className="form-label">
                            <strong>Contenido de la Descripción</strong>
                        </label>
                        <textarea
                            id="descriptionContent"
                            value={localData.description.content}
                            onChange={(e) =>
                                handleNestedInputChange("description", "content", e.target.value)
                            }
                            rows={4}
                            className="form-control"
                        />
                    </div>

                    {/* Imagen de Contenido */}
                    <div className="mb-4">
                        <label htmlFor="contentImage" className="form-label">
                            <strong>Imagen de Contenido</strong>
                        </label>
                        <input
                            id="contentImage"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "content_image")}
                            className="form-control"
                        />
                    </div>

                    {/* Acordeón */}
                    <div className="mb-4">
                        <label className="form-label">
                            <strong>Acordeón</strong>
                        </label>
                        {localData.accordion.map((item, index) => (
                            <div key={index} className="card mb-3 shadow-sm">
                                <div className="card-header bg-secondary text-white">
                                    <input
                                        type="text"
                                        value={item.title}
                                        onChange={(e) =>
                                            handleAccordionChange(index, "title", e.target.value)
                                        }
                                        placeholder={`Título Sección ${index + 1}`}
                                        className="form-control border-0 bg-secondary text-white"
                                    />
                                </div>
                                <div className="card-body">
                                    {item.content.map((subItem, subIndex) => (
                                        <div key={subIndex} className="mb-3">
                                            <label htmlFor={`subItem-${index}-${subIndex}`} className="form-label">
                                                Título Contenido {subIndex + 1}
                                            </label>
                                            <input
                                                id={`subItem-${index}-${subIndex}`}
                                                type="text"
                                                value={subItem.title}
                                                onChange={(e) =>
                                                    handleAccordionContentChange(
                                                        index,
                                                        subIndex,
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                className="form-control"
                                            />
                                            <label
                                                htmlFor={`subItemDescription-${index}-${subIndex}`}
                                                className="form-label mt-2"
                                            >
                                                Descripción Contenido {subIndex + 1}
                                            </label>
                                            <textarea
                                                id={`subItemDescription-${index}-${subIndex}`}
                                                value={subItem.description}
                                                onChange={(e) =>
                                                    handleAccordionContentChange(
                                                        index,
                                                        subIndex,
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                rows={2}
                                                className="form-control"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="card-footer text-end">
                    <button
                        className="btn btn-success me-2"
                        onClick={() => handleSaveChanges()}
                    >
                        Guardar Cambios
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => {
                            MySwal.close(); // Cierra el modal
                        }}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthenticatedEditForm;
