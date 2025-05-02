// JSON con las opciones para las categorías
const menudJson = {
    "menu": {
        "ActivoCirculante": [
            { "name": "Caja" },
            { "name": "Banco" },
            { "name": "Inventario(Mercancia)" },
            { "name": "Paquetes de llantas" }
        ],
        "ActivoNoCirculante": [
    { "name": "Terrenos" },
    { "name": "Edificios" },
    { "name": "Vehículos" },
    { "name": "Patentes" },
    { "name": "Marcas registradas" },
    { "name": "Depreciación acumulada - Edificios" },
    { "name": "Depreciación acumulada - Vehículos" }
]
,
        "IVA": [
            { "name": "IVA acreditable" },
            { "name": "IVA por acreditar" },
            { "name": "IVA por trasladar" },
            { "name": "IVA trasladado" }
        ],
        "Pasivo": [
            { "name": "Proveedores" },
            { "name": "Acreedores diversos" },
            { "name": "Sueldos por pagar" },
            { "name": "Impuestos por pagar" },
            { "name": "Documentos por pagar" },
            { "name": "Préstamos bancarios" },
            { "name": "Hipotecas por pagar" },
            { "name": "Obligaciones financieras" },
            { "name": "Provisiones para beneficios laborales" },
            { "name": "Pasivos diferidos" },
            { "name": "IVA por trasladar" }
        ],
        "Capital": [
            { "name": "Capital social" },
            { "name": "Aportaciones de los socios" },
            { "name": "Utilidades retenidas" },
            { "name": "Reservas legales" },
            { "name": "Reservas estatutarias" },
            { "name": "Superávit" },
            { "name": "Pérdidas acumuladas" },
            { "name": "Revalorización de activos" }
        ]
    }
};

// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function () {
    // Llenar el select de Cuenta con grupos
    llenarSelectConGrupos('category1', {
        "Activo Circulante": menudJson.menu.ActivoCirculante,
        "Activo No Circulante": menudJson.menu.ActivoNoCirculante,
        "IVA": menudJson.menu.IVA,
        "Pasivo": menudJson.menu.Pasivo,
        "Capital": menudJson.menu.Capital
    });
});

// Función para llenar un select con grupos de opciones
function llenarSelectConGrupos(idSelect, grupos) {
    const selectElement = document.getElementById(idSelect);

    // Limpia las opciones existentes si es necesario
    selectElement.innerHTML = '';

    // Agrega una opción predeterminada
    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Seleccione una categoría';
    defaultOption.value = '';
    defaultOption.selected = true;
    defaultOption.disabled = true;
    selectElement.appendChild(defaultOption);

    // Itera sobre los grupos y agrega las opciones
    for (const [nombreGrupo, opciones] of Object.entries(grupos)) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = nombreGrupo; // Etiqueta del grupo

        opciones.forEach(item => {
            const option = document.createElement('option');
            option.value = item.name; // Usa el nombre como valor
            option.textContent = item.name; // El texto visible será el nombre
            optgroup.appendChild(option);
        });

        selectElement.appendChild(optgroup);
    }
}

// Función para agregar una fila a la tabla
// Función para agregar una fila a la tabla
// Función para guardar los datos de la tabla en sessionStorage
function guardarDatos() {
    const filas = document.querySelectorAll("#cuerpoBalance tr");
    const datos = [];

    filas.forEach(fila => {
        const identificador = fila.children[0].textContent;
        const fecha = fila.children[1].textContent;
        const cuenta = fila.children[2].textContent;
        const debe = fila.children[3].textContent;
        const haber = fila.children[4].textContent;

        datos.push({ identificador, fecha, cuenta, debe, haber });
    });

    // Guardar los datos en sessionStorage
    sessionStorage.setItem("datosTabla", JSON.stringify(datos));
}

// Función para cargar los datos de sessionStorage y reconstruir la tabla
function cargarDatos() {
    const datos = JSON.parse(sessionStorage.getItem("datosTabla")) || [];

    datos.forEach(item => {
        const nuevaFila = document.createElement("tr");

        const celdaIdentificador = document.createElement("td");
        celdaIdentificador.textContent = item.identificador;

        const celdaFecha = document.createElement("td");
        celdaFecha.textContent = item.fecha;

        const celdaCuenta = document.createElement("td");
        celdaCuenta.textContent = item.cuenta;

        const celdaDebe = document.createElement("td");
        celdaDebe.textContent = item.debe;

        const celdaHaber = document.createElement("td");
        celdaHaber.textContent = item.haber;

        nuevaFila.appendChild(celdaIdentificador);
        nuevaFila.appendChild(celdaFecha);
        nuevaFila.appendChild(celdaCuenta);
        nuevaFila.appendChild(celdaDebe);
        nuevaFila.appendChild(celdaHaber);

        document.getElementById("cuerpoBalance").appendChild(nuevaFila);
    });

    // Actualizar los totales después de cargar los datos
    actualizarTotales();
}

// Función para agregar una fila a la tabla
function Agregar() {
    // Obtener los valores de los campos
    const cuenta = document.getElementById("category1").value;
    const debe = document.getElementById("debe").value;
    const haber = document.getElementById("haber").value;
    const fecha = document.getElementById("fecha").value;
    const identificador = document.getElementById("identificador").value;
    
    // Convertir los valores de Debe y Haber a números (si están vacíos, usar 0 para cálculos)
    const debeValor = parseFloat(debe) || 0;
    const haberValor = parseFloat(haber) || 0;

    // Crear objeto con los datos para sessionStorage
    const nuevoRegistro = {
        cuenta,
        debe: debeValor,
        haber: haberValor,
        fecha,
        identificador
    };

    // Obtener datos existentes o inicializar array
    let datosGuardados = JSON.parse(sessionStorage.getItem('datosContables')) || [];
    
    // Agregar nuevo registro
    datosGuardados.push(nuevoRegistro);
    
    // Guardar en sessionStorage
    sessionStorage.setItem('datosContables', JSON.stringify(datosGuardados));

    // Crear una nueva fila
    const nuevaFila = document.createElement("tr");

    // Crear las celdas de la fila
    const celdaIdentificador = document.createElement("td");
    celdaIdentificador.textContent = identificador || "";

    const celdaFecha = document.createElement("td");
    celdaFecha.textContent = fecha || "";

    const celdaCuenta = document.createElement("td");
    celdaCuenta.textContent = cuenta || "";

    const celdaDebe = document.createElement("td");
    celdaDebe.textContent = debe ? `$${debeValor.toFixed(2)}` : "";

    const celdaHaber = document.createElement("td");
    celdaHaber.textContent = haber ? `$${haberValor.toFixed(2)}` : "";

    // Agregar las celdas a la fila
    nuevaFila.appendChild(celdaIdentificador);
    nuevaFila.appendChild(celdaFecha);
    nuevaFila.appendChild(celdaCuenta);
    nuevaFila.appendChild(celdaDebe);
    nuevaFila.appendChild(celdaHaber);

    // Agregar la fila a la tabla
    const cuerpoBalance = document.getElementById("cuerpoBalance");
    cuerpoBalance.appendChild(nuevaFila);

    // Limpiar los campos después de agregar
    document.getElementById("category1").value = "";
    document.getElementById("debe").value = "";
    document.getElementById("haber").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("identificador").value = "";

    // Actualizar los totales
    actualizarTotales();
}

// Función para actualizar los totales
function actualizarTotales() {
    const filas = document.querySelectorAll("#cuerpoBalance tr");
    let totalDebe = 0;
    let totalHaber = 0;

    filas.forEach(fila => {
        const debeTexto = fila.children[3].textContent.replace("$", "");
        const haberTexto = fila.children[4].textContent.replace("$", "");
        const debe = debeTexto === "" ? 0 : parseFloat(debeTexto.replace(/,/g, ""));
        const haber = haberTexto === "" ? 0 : parseFloat(haberTexto.replace(/,/g, ""));

        totalDebe += debe;
        totalHaber += haber;
    });

    // Mostrar los totales en el pie de la tabla
    document.getElementById("totalActivo").textContent = `$${totalDebe.toFixed(2)}`;
    document.getElementById("totalPasivo").textContent = `$${totalHaber.toFixed(2)}`;
}

// Cargar los datos al iniciar la página
document.addEventListener('DOMContentLoaded', function () {
    // Cargar datos en la tabla principal
    const datosGuardados = JSON.parse(sessionStorage.getItem('datosContables')) || [];
    
    datosGuardados.forEach(registro => {
        const nuevaFila = document.createElement("tr");
        
        nuevaFila.innerHTML = `
            <td>${registro.identificador || ""}</td>
            <td>${registro.fecha || ""}</td>
            <td>${registro.cuenta || ""}</td>
            <td>${registro.debe ? `$${registro.debe.toFixed(2)}` : ""}</td>
            <td>${registro.haber ? `$${registro.haber.toFixed(2)}` : ""}</td>
        `;
        
        document.getElementById("cuerpoBalance").appendChild(nuevaFila);
    });

    // Actualizar totales
    actualizarTotales();
});

// Cargar los datos al iniciar la página
document.addEventListener('DOMContentLoaded', function () {
    cargarDatos();
});

document.addEventListener('DOMContentLoaded', function() {
    // Obtener datos de sessionStorage
    const datosGuardados = sessionStorage.getItem('datosContables');
    if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        generarCuadrosCuentas(datos);
    }
});

function generarCuadrosCuentas(datos) {
    const contenedor = document.getElementById('cuentas-container');
    contenedor.innerHTML = '';

    const cuentas = {};

    datos.forEach(item => {
        if (!cuentas[item.cuenta]) {
            cuentas[item.cuenta] = {
                debe: 0,
                haber: 0,
                movimientos: []
            };
        }

        if (item.debe) {
            cuentas[item.cuenta].movimientos.push({
                id: item.identificador,
                tipo: 'debe',
                valor: item.debe
            });
            cuentas[item.cuenta].debe += item.debe;
        }

        if (item.haber) {
            cuentas[item.cuenta].movimientos.push({
                id: item.identificador,
                tipo: 'haber',
                valor: item.haber
            });
            cuentas[item.cuenta].haber += item.haber;
        }
    });

    for (const [nombreCuenta, datosCuenta] of Object.entries(cuentas)) {
        const totalDebe = datosCuenta.debe;
        const totalHaber = datosCuenta.haber;
        
        let sd = totalDebe > totalHaber ? totalDebe - totalHaber : 0;
        let sa = totalHaber > totalDebe ? totalHaber - totalDebe : 0;

        const tabla = document.createElement('table');
        tabla.className = 'ledger-table';

        tabla.innerHTML = `
            <thead>
                <tr>
                    <th colspan="4" class="table-title">${nombreCuenta}</th>
                </tr>
            </thead>
            <tbody>
                ${datosCuenta.movimientos.map(mov => `
                    <tr>
                        ${mov.tipo === 'debe' ? 
                            `<td>${mov.id}</td>
                             <td>$${mov.valor.toFixed(2)}</td>
                             <td></td>
                             <td></td>` : 
                            `<td></td>
                             <td></td>
                             <td>$${mov.valor.toFixed(2)}</td>
                             <td>${mov.id}</td>`}
                    </tr>
                `).join('')}
                <tr class="ledger-divider"><td colspan="4"></td></tr>
                <tr>
                    <td>md</td>
                    <td>$${totalDebe.toFixed(2)}</td>
                    <td>$${totalHaber.toFixed(2)}</td>
                    <td>ma</td>
                </tr>
                <tr>
                    <td>sd</td>
                    <td>${sd > 0 ? `$${sd.toFixed(2)}` : ''}</td>
                    <td>${sa > 0 ? `$${sa.toFixed(2)}` : ''}</td>
                    <td>sa</td>
                </tr>
            </tbody>
        `;

        contenedor.appendChild(tabla);
    }
}

function generarBalanzaComprobacion(datos) {
    const tablaBalanza = document.getElementById('tabla-balanza');
    tablaBalanza.innerHTML = '';

    // Agrupar por cuenta (similar a la función del Libro Mayor)
    const cuentas = {};

    datos.forEach(item => {
        if (!cuentas[item.cuenta]) {
            cuentas[item.cuenta] = {
                debe: 0,
                haber: 0
            };
        }

        if (item.debe) {
            cuentas[item.cuenta].debe += item.debe;
        }

        if (item.haber) {
            cuentas[item.cuenta].haber += item.haber;
        }
    });

    // Generar filas para la balanza
    for (const [nombreCuenta, datosCuenta] of Object.entries(cuentas)) {
        const totalDebe = datosCuenta.debe;
        const totalHaber = datosCuenta.haber;
        
        // Calcular saldos
        const saldoDebe = totalDebe > totalHaber ? totalDebe - totalHaber : 0;
        const saldoHaber = totalHaber > totalDebe ? totalHaber - totalDebe : 0;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${nombreCuenta}</td>
            <td>$${totalDebe.toFixed(2)}</td>
            <td>$${totalHaber.toFixed(2)}</td>
            <td>${saldoDebe > 0 ? `$${saldoDebe.toFixed(2)}` : ''}</td>
            <td>${saldoHaber > 0 ? `$${saldoHaber.toFixed(2)}` : ''}</td>
        `;
        
        tablaBalanza.appendChild(fila);
    }

    // Agregar totales
    const totales = Object.values(cuentas).reduce((acc, cuenta) => {
        acc.totalDebe += cuenta.debe;
        acc.totalHaber += cuenta.haber;
        acc.totalSaldoDebe += cuenta.debe > cuenta.haber ? cuenta.debe - cuenta.haber : 0;
        acc.totalSaldoHaber += cuenta.haber > cuenta.debe ? cuenta.haber - cuenta.debe : 0;
        return acc;
    }, { totalDebe: 0, totalHaber: 0, totalSaldoDebe: 0, totalSaldoHaber: 0 });

    const filaTotales = document.createElement('tr');
    filaTotales.className = 'table-active';
    filaTotales.innerHTML = `
        <td><strong>TOTALES</strong></td>
        <td><strong>$${totales.totalDebe.toFixed(2)}</strong></td>
        <td><strong>$${totales.totalHaber.toFixed(2)}</strong></td>
        <td><strong>$${totales.totalSaldoDebe.toFixed(2)}</strong></td>
        <td><strong>$${totales.totalSaldoHaber.toFixed(2)}</strong></td>
    `;
    
    tablaBalanza.appendChild(filaTotales);
}

document.addEventListener('DOMContentLoaded', function() {
    // Obtener datos de sessionStorage
    const datosGuardados = JSON.parse(sessionStorage.getItem('datosContables')) || [];
    
    // Generar la balanza de comprobación
    generarBalanzaComprobacion(datosGuardados);
});

function resetearDatos() {
    sessionStorage.removeItem('datosContables');
    // Opcional: recargar la página
    location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
    // Función para calcular la suma desde "Caja" hasta "Papeleria" en la columna 2
    const calcularSumaActivoCirculante = () => {
        let suma = 0;

        // Selección de filas específicas en la tabla
        const filas = document.querySelectorAll(".table tbody tr");
        const nombresCuentas = [
            "Caja",
            "Inventarios",
            "Mat. empaque",
            "Rentas.pag x ant",
            "IVA acreditado",
            "IVA por acreditar",
            "Clientes",
            "Banco",
            "Papeleria"
        ];

        filas.forEach(fila => {
            const celdaNombre = fila.querySelector("td:first-child"); // Primera columna con los nombres
            if (celdaNombre && nombresCuentas.includes(celdaNombre.textContent.trim())) {
                const columnaValor = fila.querySelector("td:nth-child(3)"); // Columna 2 (índice 3)
                if (columnaValor) {
                    const valor = parseFloat(columnaValor.textContent.replace(/[$,]/g, "")) || 0;
                    suma += valor;
                }
            }
        });

        // Actualizamos la fila "Suma activo circulante"
        const totalFila = document.querySelector(".table tbody .total td:nth-child(4)");
        if (totalFila) {
            totalFila.textContent = `$${suma.toLocaleString()}.00`;
        }
    };

    // Llamada a la función al cargar la página
    calcularSumaActivoCirculante();
});

function generarBalanceGeneral() {
    // Obtener datos de la balanza de comprobación
    const datosBalanza = JSON.parse(sessionStorage.getItem('datosContables')) || [];

    // Procesar los datos para obtener saldos
    const saldos = {};
    datosBalanza.forEach(item => {
        if (!saldos[item.cuenta]) {
            saldos[item.cuenta] = { debe: 0, haber: 0 };
        }
        if (item.debe) saldos[item.cuenta].debe += item.debe;
        if (item.haber) saldos[item.cuenta].haber += item.haber;
    });

    // Mapeo de cuentas específico para casos especiales
    const mapeoEspecial = {
        "IVA por accediar": "IVA por acreditar" // Corrige el typo
    };

    // Actualizar todas las cuentas del balance
    document.querySelectorAll('[data-cuenta]').forEach(row => {
        const cuentaBalance = row.getAttribute('data-cuenta');
        const valorCells = row.querySelectorAll('.valor');

        // Buscar la cuenta en los saldos (incluyendo mapeo especial)
        let cuentaKey = cuentaBalance;
        if (mapeoEspecial[cuentaBalance]) {
            cuentaKey = mapeoEspecial[cuentaBalance];
        }

        if (saldos[cuentaKey]) {
            const esActivo = row.closest('#activo-circulante, #activo-no-circulante');
            const esPasivo = row.closest('#pasivo-capital');

            valorCells.forEach(cell => {
                // Determinar si es columna de debe (primera columna con clase valor)
                const esDebe = cell === valorCells[0] && valorCells.length > 1;

                let saldo = 0;
                if (esActivo) {
                    saldo = saldos[cuentaKey].debe - saldos[cuentaKey].haber;
                } else if (esPasivo) {
                    saldo = saldos[cuentaKey].haber - saldos[cuentaKey].debe;
                }

                // Mostrar saldo aunque sea cero o negativo
                cell.textContent = `$${saldo.toFixed(2)}`;
            });
        }
    });

    // Calcular sumas y totales
    calcularSumasBalanceGeneral();

    // Actualizar fecha
    const fechaElement = document.getElementById('fecha-balance');
    if (fechaElement) {
        const hoy = new Date();
        fechaElement.textContent = hoy.toLocaleDateString('es-ES', {
            day: '2-digit', month: 'long', year: 'numeric'
        });
    }
}

function calcularSumasBalanceGeneral() {
    // Suma Activo Circulante
    let sumaCirculante = 0;
    document.querySelectorAll('#activo-circulante tr[data-cuenta] td.valor').forEach(td => {
        if (td.textContent) {
            sumaCirculante += parseFloat(td.textContent.replace(/[^0-9.-]/g, ''));
        }
    });
    document.querySelector('.suma-circulante').textContent = `$${sumaCirculante.toFixed(2)}`;

    // Suma Activo No Circulante
    let sumaNoCirculante = 0;
    document.querySelectorAll('#activo-no-circulante tr[data-cuenta] td.valor').forEach(td => {
        if (td.textContent) {
            sumaNoCirculante += parseFloat(td.textContent.replace(/[^0-9.-]/g, ''));
        }
    });
    document.querySelector('.suma-no-circulante').textContent = `$${sumaNoCirculante.toFixed(2)}`;

    // Total Activos
    const totalActivos = sumaCirculante + sumaNoCirculante;
    document.querySelector('.total-activos').textContent = `$${totalActivos.toFixed(2)}`;

    // Suma Pasivo
    let sumaPasivo = 0;
    document.querySelectorAll('#pasivo-capital tr[data-cuenta] td.valor').forEach(td => {
        if (td.textContent && !td.closest('.total')) {
            sumaPasivo += parseFloat(td.textContent.replace(/[^0-9.-]/g, ''));
        }
    });
    document.querySelector('.suma-pasivo').textContent = `$${sumaPasivo.toFixed(2)}`;

    // Total Pasivo + Capital
    document.querySelector('.total-pasivo-capital').textContent = `$${totalActivos.toFixed(2)}`;
}

// Ejecutar al cargar la página del balance general
document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector("body.balance-general")) {
        generarBalanceGeneral();
    }
});
