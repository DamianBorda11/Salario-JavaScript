// VARIABLES

let nombreCompleto = "";
let edad = 0;
let tipoDocumento = "";
let numeroDocumento = "";

let salario = 0;
let comisiones = 0;
let horasExtra = 0;
let riesgo = "";

// VALORES

const salarioMinimo = 1750905;
const transporte = 249095;

// PORCENTAJES

const saludPorcentaje = 0.04;
const pensionPorcentaje = 0.04;
    // CASO PENSIONADO

    let pension = salario * pensionPorcentaje;

    // CASO NORMAL (25-59)

    let totalDevengado = salario + comisiones + horasExtra;

    // IBC
    let ingresoBase = totalDevengado * 0.7;

    // Auxilio transporte
    let auxilioTransporte = 0;
    if (salario <= (2 * salarioMinimo)) {
        auxilioTransporte = transporte;
    }

    // Salud
    let salud = ingresoBase * saludPorcentaje;

    // Fondo solidaridad
    let fondoSolidaridad = 0;
    if (ingresoBase >= (4 * salarioMinimo)) {
        fondoSolidaridad = ingresoBase * 0.01;
    }

    // ARL
    let arl = 0;

    //condicionales
    if (edad <= 18) {
        alert("No puedes trabajar, eres menor de edad.");
    } else if (edad >= 18 && edad <= 25) {
        alert("No puedes seguir, eres beneficiario.");
    } else if (edad >= 26 && edad <= 59) {
        let salario = parseInt(prompt("Salario mensual:"));
    } else if (edad >= 60) {
        let salario = parseInt(prompt("Salario mensual:"));
        let pension = parseInt(prompt("Pensión:"));
    }