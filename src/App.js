import React, {Fragment, useState, useEffect} from 'react';
import Form from './components/form';
import Date from './components/date';

const App = () => {

//Verificiar citas en local storage
let citasIniciales = JSON.parse(localStorage.getItem('citas'));
//NOta: local storage solo almacena string
if(!citasIniciales){
  citasIniciales=[];
}


// Arreglo de citas | principal
const [citas, setGuardarCitas] = useState (citasIniciales);

/* Usar useEffect para realizar ciertas operaciones cuando el 
  state Cambia*/
  useEffect(()=>{
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else{
      localStorage.setItem('citas',JSON.stringify([]));
    }
    
    // console.log('Documentos listo o algo paso con la cita');
  }, [citas,citasIniciales]);

  /* 
     Nota: 1 useEffect Siempres es ua arrow function
           2 para que se use una sola vez se agrega [] vacio
           3 se ejecuta cuando esta listo el componente o cuando ocurra una accion en el statre
  */ 

//funcion que tome las citas actuales y agregue las nuevas
const crearCita = cita =>{
  //console.log(cita);

  //Siempre se una copia del state
  setGuardarCitas([...citas, cita]);
}

/* Nota 1: En los prop no se necesita, 
agregar el parentesis porque react 
los detecta como funciones
   
   Nota 2: Los datos fluyen del padre al hijo por los props
*/

//FUNCION QUE ELIMINA UNA CITA PR SU ID
const eliminarCita = id => {
  const nuevasCitas = citas.filter(cita => cita.id !==id);

  setGuardarCitas(nuevasCitas);

}


//Mensaje condicional
const titulo = citas.length === 0 ? 'No hay citas': 'Administra tu cita';

 return ( 
   <Fragment>
    
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className='one-half column'>
            <Form 
                crearCita={crearCita}
            
            />
          </div>
          <div className='one-half column'>

             <h2>{titulo}</h2>
            
                {citas.map(cita => (
                    <Date 
                    key={cita.id}
                    cita={cita}

                    eliminarCita={eliminarCita}
                    />
                ))}
          </div>
        </div>  
      </div>  

  </Fragment>

  );
}
 
export default App;




                

