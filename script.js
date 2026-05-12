// ESTADO
let datosConfirmados = false;

// VALORES FIJOS
const salarioMinimo = 1750905;
const auxilioTransporteValor = 249095;

const saludPorcentaje = 0.04;
const pensionPorcentaje = 0.04;

// CONFIRMAR DATOS EMPLEADO
function confirmarDatosEmpleado() {

  let nombre = document.getElementById("nombreCompleto").value.trim();

  let edad = parseInt(
    document.getElementById("edad").value
  );

  let tipoDocumento =
    document.getElementById("tipoDocumento").value;

  let numeroDocumento =
    document.getElementById("numeroDocumento").value.trim();

  // VALIDAR CAMPOS
  if (
    nombre === "" ||
    isNaN(edad) ||
    tipoDocumento === "" ||
    numeroDocumento === ""
  ) {

    alert("Completa todos los datos.");
    return;
  }

  // VALIDAR EDAD
  if (edad < 18) {

    alert("No puedes trabajar, eres menor de edad.");
    return;
  }

  if (edad < 25) {

    alert("Usuario beneficiario.");
    return;
  }

  if (edad < 60) {

    alert("Usuario activo.");
    return;
  }
  if (edad >= 60) {

    alert("Usuario pensionado.");
    return;
  }

  // CONFIRMAR
  datosConfirmados = true;

  alert("Datos confirmados correctamente.");

}

// CALCULAR NÓMINA
function calcularNomina() {

  // VALIDAR CONFIRMACIÓN
  if (!datosConfirmados) {

    alert("Primero debes confirmar los datos.");
    return;
  }

  // DATOS
  let nombre =
    document.getElementById("nombreCompleto").value;

  let edad = parseInt(
    document.getElementById("edad").value
  );

  let salario = parseFloat(
    document.getElementById("salario").value
  );

  let comisiones = parseFloat(
    document.getElementById("comisiones").value
  );

  let horasExtra = parseFloat(
    document.getElementById("horasExtra").value
  );

  let riesgo =
    document.getElementById("riesgo").value;

  // VALIDAR NÚMEROS
  if (
    isNaN(salario) ||
    isNaN(comisiones) ||
    isNaN(horasExtra)
  ) {

    alert("Ingresa valores válidos.");
    return;
  }

  // PENSIONADO
  if (edad >= 60) {

    let pension = salario * pensionPorcentaje;

    alert("Pago pensión: $" + pension);

    return;
  }

  // TOTAL DEVENGADO
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