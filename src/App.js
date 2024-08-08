import './App.css';

import { useRef } from "react";

function App() {

  const monedaEntRef = useRef();

  const monedaSalRef = useRef();

  const tipoEntrada = useRef();

  const tipoSalida = useRef();

  const llamaApiCambio = async () => {

    try {

      const respuesta = await fetch(`https://v6.exchangerate-api.com/v6/6aea8d5bc4a0517728dbcb31/latest/${tipoEntrada.current.value}`);

      const datos = await respuesta.json();

      return datos.conversion_rates[tipoSalida.current.value];

    } catch (error) {
      console.error("Error al acceder a la API: ", error);

    }

  };

  const calcular = async () => {

    const resultadoCambioNuevo = await llamaApiCambio();

    const valorEntrada = parseFloat(monedaEntRef.current.value);

    const valorSalida = (valorEntrada * resultadoCambioNuevo).toFixed(2);

    monedaSalRef.current.innerHTML = `El valor de ${valorEntrada} ${tipoEntrada.current.value} es de ${valorSalida} ${tipoSalida.current.value}`; 

  }

  return <div>
    <h1>Conversor de monedas</h1>

    <div className='centrarElementos fondoBlanco'>
      <label for="tipoEntrada">Moneda de origen</label>
      <select className='selector' id="tipoEntrada" ref={tipoEntrada}>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="JPY">JPY</option>
        <option value="MXN">MXN</option>
      </select><br />

      <input className='input' type='number' ref={monedaEntRef}></input><br />

      <button className='botonCambiar' onClick={calcular}>Cambiar</button><br />

      <label for="tipoSalida">Moneda de cambio</label>
      <select className='selector' id="tipoSalida" ref={tipoSalida}>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="JPY">JPY</option>
        <option value="MXN">MXN</option>
      </select>
    </div>

    <div className='centrarElementos resultado' ref={monedaSalRef}></div>
   
  </div>

}

export default App;
