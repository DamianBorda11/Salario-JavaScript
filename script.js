// =======================
// VARIABLES
// =======================

let nombreCompleto = "";
let edad = 0;
let tipoDocumento = "";
let numeroDocumento = "";

let salario = 0;
let comisiones = 0;
let horasextra = 0;
let riesgo = "";

// =======================
// VALORES
// =======================

const salarioMinimo = 1750905;
const transporte = 249095;

// =======================
// PORCENTAJES
// =======================

const saludPorcentaje = 0.04;
const pensionPorcentaje = 0.04;

    // =====================
    // CASO PENSIONADO
    // =====================

        let pension = salario * pensionPorcentaje;

    // =====================
    // CASO NORMAL (25-59)
    // =====================

    let totalDevengado = salario + comisiones + horasextra;

    // IBC
    let ingresoBase = totalDevengado * 0.7;

    // Auxilio transporte
    let auxilioTransporte = 0;
    if (salario <= (2 * salarioMinimo)) {
        auxilioTransporte = transporte;
    }

    // Salud y pensión
    let salud = ingresoBase * saludPorcentaje;
    let pension = ingresoBase * pensionPorcentaje;

    // Fondo solidaridad
    let fondoSolidaridad = 0;
    if (ingresoBase >= (4 * salarioMinimo)) {
        fondoSolidaridad = ingresoBase * 0.01;
    }

    // ARL
    let arl = 0;