// ESTADO
let datosConfirmados = false;

// VALORES FIJOS
const salarioMinimo = 1750905;
const auxilioTransporteValor = 249095;

const saludPorcentaje = 0.04;
const pensionPorcentaje = 0.04;

// CONFIRMAR DATOS EMPLEADO
function confirmarDatosEmpleado() {

  let nombre =
    document.getElementById("nombreCompleto").value.trim();

  let edad =
    parseInt(document.getElementById("edad").value);

  let tipoDocumento =
    document.getElementById("tipoDocumento").value;

  let numeroDocumento =
    document.getElementById("numeroDocumento").value.trim();

  // VALIDAR CAMPOS VACÍOS
  if (
    nombre === "" ||
    isNaN(edad) ||
    tipoDocumento === "" ||
    numeroDocumento === ""
  ) {

    alert("Completa todos los datos.");
    return;
  }

  // VALIDAR NOMBRE
  if (nombre.length < 3 || nombre.length > 60) {

    alert(
      "El nombre debe tener entre 3 y 60 caracteres."
    );

    return;
  }

  // VALIDAR EDAD NEGATIVA
  if (edad < 0) {

    alert("La edad no puede ser negativa.");
    return;
  }
  

  // VALIDAR EDAD MAYOR A 100
  if (edad > 100) {

    alert("Edad no válida.");
    return;
  }

  // MENOR DE EDAD
  if (edad < 18) {

    alert(
      "No puedes trabajar, eres menor de edad."
    );

    return;
  }

  // BENEFICIARIO
  if (edad < 25) {

    alert(
      "Usuario beneficiario, no aplica cálculo."
    );

    return;
  }

  // VALIDAR DOCUMENTO
  if (isNaN(numeroDocumento)) {

    alert(
      "El número de documento debe contener solo números."
    );

    return;
  }

  // VALIDAR LONGITUD DOCUMENTO
  if (
    numeroDocumento.length < 10 ||
    numeroDocumento.length > 11
  ) {

    alert(
      "El documento debe tener entre 10 y 11 caracteres."
    );

    return;
  }

  // CONFIRMACIÓN
  datosConfirmados = true;

  alert("Datos confirmados correctamente.");

}

// CALCULAR NÓMINA
function calcularNomina() {

  // VALIDAR CONFIRMACIÓN
  if (!datosConfirmados) {

    alert(
      "Primero debes confirmar los datos."
    );

    return;
  }

  // DATOS
  let nombre =
    document.getElementById("nombreCompleto").value;

  let edad =
    parseInt(document.getElementById("edad").value);

  let salario =
    parseFloat(document.getElementById("salario").value);

  let comisiones =
    parseFloat(document.getElementById("comisiones").value);

  let horasExtra =
    parseFloat(document.getElementById("horasExtra").value);

  let riesgo =
    document.getElementById("riesgo").value;

  // VALIDAR CAMPOS VACÍOS
  if (
    isNaN(salario) ||
    isNaN(comisiones) ||
    isNaN(horasExtra)
  ) {

    alert(
      "Completa todos los datos laborales."
    );

    return;
  }

  // VALIDAR SALARIO NEGATIVO
  if (salario < 0) {

    alert(
      "El salario no puede ser negativo."
    );

    return;
  }

  // VALIDAR SALARIO MÁXIMO
  if (salario > 100000000) {

    alert(
      "Valor fuera del rango permitido."
    );

    return;
  }

  // VALIDAR COMISIONES NEGATIVAS
  if (comisiones < 0) {

    alert(
      "Las comisiones no pueden ser negativas."
    );

    return;
  }

  // VALIDAR COMISIONES MÁXIMAS
  if (comisiones > 50000000) {

    alert(
      "Comisiones fuera del rango permitido."
    );

    return;
  }

  // VALIDAR HORAS EXTRA NEGATIVAS
  if (horasExtra < 0) {

    alert(
      "Las horas extra no pueden ser negativas."
    );

    return;
  }

  // VALIDAR HORAS EXTRA MÁXIMAS
  if (horasExtra > 20000000) {

    alert(
      "Horas extra fuera del rango permitido."
    );

    return;
  }

  // PENSIONADO
  if (edad >= 60) {

    let pension =
      salario * pensionPorcentaje;

    alert(
      "Pago pensión: $" + pension
    );

    return;
  }

  // TOTAL DEVENGADO
  horasExtra = horasExtra * 20000;

  let totalDevengado =
    salario +
    comisiones +
    horasExtra;

  // IBC
  let ingresoBase =
    totalDevengado * 0.7;

  // AUXILIO TRANSPORTE
  let auxilioTransporte = 0;

  if (salario <= 2 * salarioMinimo) {

    auxilioTransporte =
      auxilioTransporteValor;
  }

  // SALUD
  let salud =
    ingresoBase * saludPorcentaje;

  // PENSIÓN
  let pension =
    ingresoBase * pensionPorcentaje;

  // FONDO SOLIDARIDAD
  let fondoSolidaridad = 0;

  if (ingresoBase >= 4 * salarioMinimo) {

    fondoSolidaridad =
      ingresoBase * 0.01;
  }

  // ARL
  let arl = 0;

  switch (riesgo) {

    case "1":
      arl = ingresoBase * 0.00522;
      break;

    case "2":
      arl = ingresoBase * 0.01044;
      break;

    case "3":
      arl = ingresoBase * 0.02436;
      break;

    case "4":
      arl = ingresoBase * 0.04350;
      break;

    case "5":
      arl = ingresoBase * 0.06960;
      break;
  }

  // DEDUCCIONES
  let deducciones =
    salud +
    pension +
    fondoSolidaridad +
    arl;

  // TOTAL
  let total =
    totalDevengado +
    auxilioTransporte -
    deducciones;

  // RESULTADOS
  document.getElementById(
    "resultadoNombre"
  ).innerText =
    "Nombre: " + nombre;

  document.getElementById(
    "resultadoDevengado"
  ).innerText =
    "Total Devengado: $" + totalDevengado;

  document.getElementById(
    "resultadoIBC"
  ).innerText =
    "IBC: $" + ingresoBase;

  document.getElementById(
    "resultadoDeducciones"
  ).innerText =
    "Deducciones: $" + deducciones;

  document.getElementById(
    "resultadoTotal"
  ).innerText =
    "Total a pagar: $" + total;

}