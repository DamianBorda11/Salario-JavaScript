function calcularNomina() {

  // DATOS USUARIO
  let nombre = document.getElementById("nombreCompleto").value;
  let edad = parseInt(document.getElementById("edad").value);
  let salario = parseFloat(document.getElementById("salario").value);
  let horasExtra = parseFloat(document.getElementById("horasExtra").value);
  let comisiones = 0;
  let riesgo = "1";

  // VALORES
  const salarioMinimo = 1750905;
  const transporte = 249095;

  const saludPorcentaje = 0.04;
  const pensionPorcentaje = 0.04;

  // VALIDACIÓN 
  if (edad < 18) {
    alert("No puedes trabajar, eres menor de edad.");
    return;
  }

  if (edad < 25) {
    alert("Eres beneficiario, no continúas.");
    return;
  }

  if (edad >= 25 && edad < 60) {
    alert("Eres beneficiario, continúas.");
    comisiones = salario * 0.1;
    horasExtra = horasExtra * 20000;
  }

  if (edad >= 60) {
    let pension = salario * pensionPorcentaje;
    alert("Pago de pensión: " + pension);
    return;
  }

  // CÁLCULOS
  let totalDevengado = salario + comisiones + horasExtra;

  let ingresoBase = totalDevengado * 0.7;

  let auxilioTransporte = 0;
  if (salario <= 2 * salarioMinimo) {
    auxilioTransporte = transporte;
  }

  let salud = ingresoBase * saludPorcentaje;
  let pension = ingresoBase * pensionPorcentaje;

  let fondoSolidaridad = 0;
  if (ingresoBase >= 4 * salarioMinimo) {
    fondoSolidaridad = ingresoBase * 0.01;
  }

  let arlPorcentaje = 0.00522;
  let arl = ingresoBase * arlPorcentaje;

  let deducciones = salud + pension + fondoSolidaridad + arl;

  let total = totalDevengado + auxilioTransporte - deducciones;

}