import React, {Fragment, useState} from 'react';
import {v4 as uuid} from 'uuid';
import PropTypes from 'prop-types';


const Form = ({crearCita}) => {

    //crear stare de citas
    const [cita, setActualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:'',

    });

    //Para los errores
    const [error, setActualizarError] = useState(false) ; //Bolean

    /*Nota: Funcion que se ejecuta cada vez que se escribe en un input */
    const handleActualizarState = e =>{
       
        setActualizarCita({
            ...cita,   //clnonar el arreglo
            [e.target.name]:e.target.value

        });
       // console.log(e.target.name);
    };

    //extraer los valores | destruturings
    const { mascota, propietario ,fecha ,hora ,sintomas } = cita;

    //Cuando el usuario presiona agregar cita
    const submitCita = e =>{
        e.preventDefault();
        
        console.log(mascota);

        // Validar 
            if(mascota.trim() ==='' || 
               propietario.trim() ==='' || 
               fecha.trim() ===''|| 
               hora.trim() ==='' || 
               sintomas.trim() ===''){
                setActualizarError(true);
                return;
                //Nota: Return devuelve true y deitene la accion
            }

        // Eliminar el mesaje previo | en caso de existir
        setActualizarError(false);

        // Asignar un ID
          /* 
              instalar paquete para generar id | 
              1 - npm i uuid  2 - npm i shortid
           */
            cita.id=uuid();
        // console.log(cita);
        
        //Crear una cita 
        
            crearCita(cita);
            //Funcion proveniente del padre

        //Reiniciar el form
            setActualizarCita({
                mascota:'',
                propietario:'',
                fecha:'',
                hora:'',
                sintomas:'',
        
            });
    }

     return ( 
         <Fragment>

            <h2>Crear Cita</h2>

            {error ? <p className='alerta-error'>Todos los campos son obligatorios
            </p> : null}
            
            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascotas</label>
                <input 
                      type="text"
                      name="mascota"
                      className="u-full-width"
                      placeholder="Nombre mascota"
                      onChange={handleActualizarState}
                      value={mascota}
                    />
                <label>Nombre del Dueño </label>
                <input 
                      type="text"
                      name="propietario"
                      className="u-full-width"
                      placeholder="Nombre del dueño de la mascota"
                      onChange={handleActualizarState}
                      value={propietario}
                   />
                <label>Fecha</label>
                <input 
                      type="date"
                      name="fecha"
                      className="u-full-width"
                      onChange={handleActualizarState}
                      value={fecha}
                    />
                <label>Hora</label>
                <input 
                      type="time"
                      name="hora"
                      className="u-full-width"
                      onChange={handleActualizarState}
                      value={hora}
                    />
                <label>Sintomas </label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={handleActualizarState}
                    value={sintomas}
                >
                    
                </textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >
                    Agregar Cita
                </button>
            </form>

         </Fragment>
     );
}
 /* PARA DOCUMENTAR */
  Form.propTypes = {
    crearCita: PropTypes.func.isRequired
  };

export default Form;

