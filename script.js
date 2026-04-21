// =======================
// VARIABLES
// =======================

let nombreCompleto = "";
let edad = 0;
let tipoDocumento = "";
let numeroDocumento = "";

// Siguiente paso
let salario = 0;
let comisiones = 0;
let horasextra = 0;
let riesgo = "";

// =======================
// VALORES
// =======================

const salarioMinimo = 1750905;
const transporte = 249095;
const salarioIntegral = 22761765;
const valorTributario = 52.37;

// =======================
// PORCENTAJES
// =======================

const saludPorcentaje = 0.04;
const pensionPorcentaje = 0.04;

// =======================
// FUNCIONES
// =======================

// 1. CARGAR DATOS USUARIO
function cargarDatosUsuario() {

    nombreCompleto = document.getElementById("nombre").value;
    edad = Number(document.getElementById("edad").value);
    tipoDocumento = document.getElementById("tipoDocumento").value;
    numeroDocumento = document.getElementById("numeroDocumento").value;

    // VALIDACIONES
    if (edad < 18) {
        alert("Menor de edad, no puede continuar");
        return;
    }

    if (edad < 25) {
        alert("Usuario beneficiario por cotizante");
        return;
    }

    if (edad >= 60) {
        alert("Solo se calculará pensión");
        return;
    }

    // Mostrar siguiente sección
    document.getElementById("seccionSalario").style.display = "block";
}


// 2. CARGAR DATOS SALARIALES
function cargarDatosSalario() {

    salario = Number(document.getElementById("salario").value);
    comisiones = Number(document.getElementById("comisiones").value);
    horasextra = Number(document.getElementById("horasextra").value);
    riesgo = document.getElementById("riesgo").value;

    calcularNomina();
}


// 3. CALCULAR NOMINA
function calcularNomina() {

    // TOTAL DEVENGADO
    let totalDevengado = salario + comisiones + horasextra;

    // IBC (70%)
    let ingresoBase = totalDevengado * 0.7;

    // AUXILIO TRANSPORTE
    let auxilioTransporte = 0;
    if (salario <= (2 * salarioMinimo)) {
        auxilioTransporte = transporte;
    }

    // SALUD Y PENSION
    let salud = ingresoBase * saludPorcentaje;
    let pension = ingresoBase * pensionPorcentaje;

    // FONDO SOLIDARIDAD
    let fondoSolidaridad = 0;
    if (ingresoBase >= (4 * salarioMinimo)) {
        fondoSolidaridad = ingresoBase * 0.01;
    }

    // ARL SEGÚN RIESGO
    let arl = 0;

    if (riesgo === "1") arl = ingresoBase * 0.00522;
    if (riesgo === "2") arl = ingresoBase * 0.01044;
    if (riesgo === "3") arl = ingresoBase * 0.02436;
    if (riesgo === "4") arl = ingresoBase * 0.0435;
    if (riesgo === "5") arl = ingresoBase * 0.0696;

    // DEDUCCIONES
    let deducciones = salud + pension + fondoSolidaridad + arl;

    // TOTAL FINAL
    let total = totalDevengado + auxilioTransporte - deducciones;

    // MOSTRAR RESULTADOS
    let resultadoTexto = `
        <p><strong>Nombre:</strong> ${nombreCompleto}</p>
        <p><strong>Salario:</strong> ${salario}</p>
        <p><strong>Ingreso Base (IBC):</strong> ${ingresoBase}</p>
        <p><strong>Auxilio Transporte:</strong> ${auxilioTransporte}</p>
        <p><strong>Salud:</strong> ${salud}</p>
        <p><strong>Pensión:</strong> ${pension}</p>
        <p><strong>Fondo Solidaridad:</strong> ${fondoSolidaridad}</p>
        <p><strong>ARL:</strong> ${arl}</p>
        <h3>Total a pagar: ${total}</h3>
    `;

    document.getElementById("resultado").innerHTML = resultadoTexto;
}