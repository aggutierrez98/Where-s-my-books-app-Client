import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startBorrarLibro } from '../../actions/libros';
import { FormActualizarLibro } from './FormActualizarLibro';
import { abrirModal } from '../../actions/ui';
import { Modal } from '../Modal';
import { PrestarDevolverLibro } from './PrestarDevolverLibro';

export const LibroCard = ({ id: uid }) => {

    const dispatch = useDispatch();

    const { personas } = useSelector(state => state.persona);
    const { libros } = useSelector(state => state.libro);
    const { modalOpen, id } = useSelector(state => state.ui);

    const [libro, setLibro] = useState({});

    const { nombre, descripcion, persona_id } = libro;

    const [persona, setPersona] = useState({});

    const onBorrar = () => {
        dispatch(startBorrarLibro(uid))
    };

    useEffect(() => {

        const libroEncontrado = libros.find(lib => lib._id === uid);
        setLibro(libroEncontrado);

    }, [uid, libros])

    useEffect(() => {

        const personaEncontrada = personas.find(p => p._id === persona_id);
        setPersona(personaEncontrada);

    }, [persona_id, personas])

    const onModal = () => {
        dispatch(abrirModal(uid));
    }

    return (
        <tr>
            <td>{nombre}</td>
            <td>{descripcion}</td>
            <td>
                {
                    persona ? `${persona.nombre}` :  `No está prestado`                
                }
            </td>
            
                <PrestarDevolverLibro uid={uid} />
            <td>
            <button
                onClick={onBorrar}
                >
                <span className="tooltip">-
                <span class="tooltiptext">Borrar</span>
                </span>
                <ion-icon name="trash"></ion-icon>
                <span className="tooltip">-
                <span class="tooltiptext">Borrar</span>
                </span>

            </button>                
            </td>
            <td>

            <button onClick={onModal}>
                <span className="tooltip">-
                <span class="tooltiptext">Refrescar</span>
                </span>
                <ion-icon name="refresh-circle"></ion-icon>
                <span className="tooltip">-
                <span class="tooltiptext">Refrescar</span>
                </span>
                </button>
            {
                (modalOpen && uid === id) && (
                    <Modal component={FormActualizarLibro} id={uid} />
                    )
                    
                }
                </td>

        </tr>
    )
}
