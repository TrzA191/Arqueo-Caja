// Clave para el Local Storage
const STORAGE_KEY = 'arqueoCajaData';

// Función para guardar los datos en Local Storage
function saveToLocalStorage() {
    const data = {
        coins: [],
        bills: [],
        totals: {
            coins: document.getElementById('coins-total').textContent,
            bills: document.getElementById('bills-total').textContent,
            grand: document.getElementById('grand-total').textContent
        },
        showResult: document.getElementById('result-box').style.display === 'block'
    };

    // Recopilar datos de monedas
    document.querySelectorAll('#coins-container .denomination-item').forEach(item => {
        const denomination = item.querySelector('.coin-denomination').value;
        const quantity = item.querySelector('.coin-quantity').value;
        data.coins.push({ denomination, quantity });
    });

    // Recopilar datos de billetes
    document.querySelectorAll('#bills-container .denomination-item').forEach(item => {
        const denomination = item.querySelector('.bill-denomination').value;
        const quantity = item.querySelector('.bill-quantity').value;
        data.bills.push({ denomination, quantity });
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Función para cargar datos desde Local Storage
function loadFromLocalStorage() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return;

    const data = JSON.parse(savedData);

    // Limpiar contenedores
    document.getElementById('coins-container').innerHTML = '';
    document.getElementById('bills-container').innerHTML = '';

    // Cargar monedas
    data.coins.forEach(coin => {
        const container = document.getElementById('coins-container');
        const newItem = document.createElement('div');
        newItem.className = 'denomination-item';
        newItem.innerHTML = `
            <div class="row align-items-center">
                <div class="col-6">
                    <label class="form-label">Denominación</label>
                    <select class="form-select coin-denomination">
                        <option value="0.05" ${coin.denomination === '0.05' ? 'selected' : ''}>$0.05</option>
                        <option value="0.10" ${coin.denomination === '0.10' ? 'selected' : ''}>$0.10</option>
                        <option value="0.25" ${coin.denomination === '0.25' ? 'selected' : ''}>$0.25</option>
                        <option value="0.50" ${coin.denomination === '0.50' ? 'selected' : ''}>$0.50</option>
                        <option value="1" ${coin.denomination === '1' ? 'selected' : ''}>$1</option>
                        <option value="2" ${coin.denomination === '2' ? 'selected' : ''}>$2</option>
                        <option value="5" ${coin.denomination === '5' ? 'selected' : ''}>$5</option>
                        <option value="10" ${coin.denomination === '10' ? 'selected' : ''}>$10</option>
                    </select>
                </div>
                <div class="col-4">
                    <label class="form-label">Cantidad</label>
                    <input type="number" class="form-control coin-quantity" value="${coin.quantity}" min="0">
                </div>
                <div class="col-2 d-flex align-items-end">
                    <button class="btn btn-sm btn-danger btn-remove" onclick="removeDenomination(this, 'coins')">×</button>
                </div>
            </div>
        `;
        container.appendChild(newItem);
    });

    // Cargar billetes
    data.bills.forEach(bill => {
        const container = document.getElementById('bills-container');
        const newItem = document.createElement('div');
        newItem.className = 'denomination-item';
        newItem.innerHTML = `
            <div class="row align-items-center">
                <div class="col-6">
                    <label class="form-label">Denominación</label>
                    <select class="form-select bill-denomination">
                        <option value="20" ${bill.denomination === '20' ? 'selected' : ''}>$20</option>
                        <option value="50" ${bill.denomination === '50' ? 'selected' : ''}>$50</option>
                        <option value="100" ${bill.denomination === '100' ? 'selected' : ''}>$100</option>
                        <option value="200" ${bill.denomination === '200' ? 'selected' : ''}>$200</option>
                        <option value="500" ${bill.denomination === '500' ? 'selected' : ''}>$500</option>
                        <option value="1000" ${bill.denomination === '1000' ? 'selected' : ''}>$1000</option>
                    </select>
                </div>
                <div class="col-4">
                    <label class="form-label">Cantidad</label>
                    <input type="number" class="form-control bill-quantity" value="${bill.quantity}" min="0">
                </div>
                <div class="col-2 d-flex align-items-end">
                    <button class="btn btn-sm btn-danger btn-remove" onclick="removeDenomination(this, 'bills')">×</button>
                </div>
            </div>
        `;
        container.appendChild(newItem);
    });

    // Restaurar totales
    document.getElementById('coins-total').textContent = data.totals.coins || '0.00';
    document.getElementById('bills-total').textContent = data.totals.bills || '0.00';
    document.getElementById('grand-total').textContent = data.totals.grand || '0.00';
    
    // Restaurar resultados si estaban visibles
    if (data.showResult) {
        document.getElementById('final-coins-total').textContent = data.totals.coins || '0.00';
        document.getElementById('final-bills-total').textContent = data.totals.bills || '0.00';
        document.getElementById('grand-total').textContent = data.totals.grand || '0.00';
        document.getElementById('result-box').style.display = 'block';
    }
}

// Función para agregar nueva denominación (modificada para guardar en Local Storage)
function addDenomination(type) {
    const container = document.getElementById(`${type}-container`);
    const newItem = document.createElement('div');
    newItem.className = 'denomination-item';
    
    if (type === 'coins') {
        newItem.innerHTML = `
            <div class="row align-items-center">
                <div class="col-6">
                    <label class="form-label">Denominación</label>
                    <select class="form-select coin-denomination">
                        <option value="0.05">$0.05</option>
                        <option value="0.10">$0.10</option>
                        <option value="0.25">$0.25</option>
                        <option value="0.50">$0.50</option>
                        <option value="1" selected>$1</option>
                        <option value="2">$2</option>
                        <option value="5">$5</option>
                        <option value="10">$10</option>
                    </select>
                </div>
                <div class="col-4">
                    <label class="form-label">Cantidad</label>
                    <input type="number" class="form-control coin-quantity" value="0" min="0">
                </div>
                <div class="col-2 d-flex align-items-end">
                    <button class="btn btn-sm btn-danger btn-remove" onclick="removeDenomination(this, '${type}')">×</button>
                </div>
            </div>
        `;
    } else {
        newItem.innerHTML = `
            <div class="row align-items-center">
                <div class="col-6">
                    <label class="form-label">Denominación</label>
                    <select class="form-select bill-denomination">
                        <option value="20" selected>$20</option>
                        <option value="50">$50</option>
                        <option value="100">$100</option>
                        <option value="200">$200</option>
                        <option value="500">$500</option>
                        <option value="1000">$1000</option>
                    </select>
                </div>
                <div class="col-4">
                    <label class="form-label">Cantidad</label>
                    <input type="number" class="form-control bill-quantity" value="0" min="0">
                </div>
                <div class="col-2 d-flex align-items-end">
                    <button class="btn btn-sm btn-danger btn-remove" onclick="removeDenomination(this, '${type}')">×</button>
                </div>
            </div>
        `;
    }
    
    container.appendChild(newItem);
    addEventListenersToNewItem(newItem, type);
    saveToLocalStorage(); // Guardar después de agregar
}

// Función para actualizar los totales (modificada para guardar en Local Storage)
function updateTotals() {
    // Calcular total de monedas
    let coinsTotal = 0;
    document.querySelectorAll('.coin-denomination').forEach((select, index) => {
        const quantity = document.querySelectorAll('.coin-quantity')[index].value;
        const value = parseFloat(select.value);
        coinsTotal += value * quantity;
    });
    document.getElementById('coins-total').textContent = coinsTotal.toFixed(2);

    // Calcular total de billetes
    let billsTotal = 0;
    document.querySelectorAll('.bill-denomination').forEach((select, index) => {
        const quantity = document.querySelectorAll('.bill-quantity')[index].value;
        const value = parseFloat(select.value);
        billsTotal += value * quantity;
    });
    document.getElementById('bills-total').textContent = billsTotal.toFixed(2);

    saveToLocalStorage(); // Guardar después de actualizar
}

// Función para calcular el total general (modificada para guardar en Local Storage)
function calculateTotal() {
    updateTotals();
    
    const coinsTotal = parseFloat(document.getElementById('coins-total').textContent);
    const billsTotal = parseFloat(document.getElementById('bills-total').textContent);
    const grandTotal = coinsTotal + billsTotal;
    
    document.getElementById('final-coins-total').textContent = coinsTotal.toFixed(2);
    document.getElementById('final-bills-total').textContent = billsTotal.toFixed(2);
    document.getElementById('grand-total').textContent = grandTotal.toFixed(2);
    
    document.getElementById('result-box').style.display = 'block';
    
    saveToLocalStorage(); // Guardar después de calcular
}

// Función para eliminar una denominación (modificada para guardar en Local Storage)
function removeDenomination(button, type) {
    const container = document.getElementById(`${type}-container`);
    if (container.children.length > 1) {
        button.closest('.denomination-item').remove();
        updateTotals();
    } else {
        alert(`Debe haber al menos una ${type === 'coins' ? 'moneda' : 'billete'}`);
    }
}

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
    
    // Asegurar que haya al menos una fila en cada sección si no hay datos guardados
    if (document.querySelectorAll('#coins-container .denomination-item').length === 0) {
        addDenomination('coins');
    }
    if (document.querySelectorAll('#bills-container .denomination-item').length === 0) {
        addDenomination('bills');
    }

    // Agregar event listeners
    document.querySelectorAll('.coin-denomination, .bill-denomination').forEach(select => {
        select.addEventListener('change', updateTotals);
    });
    
    document.querySelectorAll('.coin-quantity, .bill-quantity').forEach(input => {
        input.addEventListener('change', updateTotals);
    });
});


function clearStorage() {
    if (confirm('¿Estás seguro que deseas borrar todos los datos del arqueo de caja?')) {
        // Eliminar datos
        localStorage.removeItem(STORAGE_KEY);
        
        // Limpiar la interfaz
        document.getElementById('coins-container').innerHTML = '';
        document.getElementById('bills-container').innerHTML = '';
        
        // Restablecer valores
        document.getElementById('coins-total').textContent = '0.00';
        document.getElementById('bills-total').textContent = '0.00';
        document.getElementById('grand-total').textContent = '0.00';
        document.getElementById('result-box').style.display = 'none';
        
        // Volver a agregar filas vacías
        addDenomination('coins');
        addDenomination('bills');
        
        alert('Datos borrados correctamente.');
    }
}

function clearLocalStorage() {
    localStorage.removeItem('savedData');
    location.reload(); // recarga la página para reflejar el borrado
}
