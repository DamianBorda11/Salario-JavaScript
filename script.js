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

// CONTROL DE FLUJO
let puedeCalcular = false;

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

// =======================
// FORMATO DINERO
// =======================

function formatoCOP(numero) {
    return Math.round(numero).toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
    });
}

// =======================
// FUNCIONES
// =======================

// 1. DATOS USUARIO
function cargarDatosUsuario() {

    nombreCompleto = document.getElementById("nombre").value.trim();
    let edadInput = document.getElementById("edad").value;
    tipoDocumento = document.getElementById("tipoDocumento").value;
    numeroDocumento = document.getElementById("numeroDocumento").value.trim();

    // VALIDACIÓN CAMPOS VACÍOS
    if (nombreCompleto === "" || edadInput === "" || tipoDocumento === "" || numeroDocumento === "") {
        alert("Por favor complete todos los datos del usuario");
        puedeCalcular = false;
        return;
    }

    edad = Number(edadInput);

    // MENOR DE EDAD
    if (edad < 18) {
        document.getElementById("resultado").innerHTML =
            "<p>Menor de edad, no puede calcular prestaciones</p>";
        document.getElementById("seccionSalario").style.display = "none";
        puedeCalcular = false;
        return;
    }

    // BENEFICIARIO
    if (edad < 25) {
        document.getElementById("resultado").innerHTML =
            "<p>Usuario beneficiario por cotizante. No realiza aportes.</p>";
        document.getElementById("seccionSalario").style.display = "none";
        puedeCalcular = false;
        return;
    }

    // ADULTO MAYOR (PENSIONADO)
    if (edad >= 60) {
        document.getElementById("resultado").innerHTML =
            "<p>Ingrese su mesada pensional para calcular</p>";

        document.getElementById("seccionSalario").style.display = "block";
        puedeCalcular = true;
        return;
    }

    // CASO NORMAL (25-59)
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("seccionSalario").style.display = "block";
    puedeCalcular = true;
}


// 2. DATOS SALARIALES
function cargarDatosSalario() {

    // BLOQUEO SI NO PUEDE CALCULAR
    if (!puedeCalcular) {
        alert("No puede realizar el cálculo con los datos actuales");
        return;
    }

    let salarioInput = document.getElementById("salario").value;
    let comisionesInput = document.getElementById("comisiones").value;
    let horasextraInput = document.getElementById("horasextra").value;
    let riesgoInput = document.getElementById("riesgo").value;

    // VALIDACIÓN CAMPOS VACÍOS
    if (salarioInput === "" || comisionesInput === "" || horasextraInput === "" || riesgoInput === "") {
        alert("Por favor complete todos los datos salariales");
        return;
    }

    salario = Number(salarioInput);
    comisiones = Number(comisionesInput);
    horasextra = Number(horasextraInput);
    riesgo = riesgoInput;

    calcularNomina();
}


// 3. CALCULAR NÓMINA
function calcularNomina() {

    // =====================
    // CASO PENSIONADO
    // =====================
    if (edad >= 60) {

        let pension = salario * pensionPorcentaje;

        document.getElementById("resultado").innerHTML = `
            <h3>Resultado Pensionado</h3>
            <p>Mesada: ${formatoCOP(salario)}</p>
            <p>Aporte a pensión: ${formatoCOP(pension)}</p>
            <h3>Total: ${formatoCOP(salario - pension)}</h3>
        `;

        return;
    }

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

    if (riesgo === "1") arl = ingresoBase * 0.00522;
    if (riesgo === "2") arl = ingresoBase * 0.01044;
    if (riesgo === "3") arl = ingresoBase * 0.02436;
    if (riesgo === "4") arl = ingresoBase * 0.0435;
    if (riesgo === "5") arl = ingresoBase * 0.0696;

    // Deducciones
    let deducciones = salud + pension + fondoSolidaridad + arl;

    // Total final
    let total = totalDevengado + auxilioTransporte - deducciones;

    // RESULTADO
    document.getElementById("resultado").innerHTML = `
        <h3>Resultado</h3>
        <p><strong>Nombre:</strong> ${nombreCompleto}</p>

        <p>Salario: ${formatoCOP(salario)}</p>
        <p>Comisiones: ${formatoCOP(comisiones)}</p>
        <p>Horas extra: ${formatoCOP(horasextra)}</p>

        <p><strong>Ingreso Base (IBC):</strong> ${formatoCOP(ingresoBase)}</p>

        <p>Auxilio transporte: ${formatoCOP(auxilioTransporte)}</p>

        <p>Salud: ${formatoCOP(salud)}</p>
        <p>Pensión: ${formatoCOP(pension)}</p>
        <p>Fondo solidaridad: ${formatoCOP(fondoSolidaridad)}</p>
        <p>ARL: ${formatoCOP(arl)}</p>

        <h3>Total a pagar: ${formatoCOP(total)}</h3>
    `;
}