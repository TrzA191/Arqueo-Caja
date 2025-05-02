// Función para agregar nueva denominación
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
                    <input type="number" class="form-control coin-quantity" value="0" min="0" onchange="updateTotals()">
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
                    <input type="number" class="form-control bill-quantity" value="0" min="0" onchange="updateTotals()">
                </div>
                <div class="col-2 d-flex align-items-end">
                    <button class="btn btn-sm btn-danger btn-remove" onclick="removeDenomination(this, '${type}')">×</button>
                </div>
            </div>
        `;
    }
    
    container.appendChild(newItem);
    // Agregar event listeners a los nuevos elementos
    addEventListenersToNewItem(newItem, type);
}

// Función para agregar event listeners a nuevos elementos
function addEventListenersToNewItem(item, type) {
    const select = item.querySelector(`.${type}-denomination`);
    const input = item.querySelector(`.${type}-quantity`);
    
    select.addEventListener('change', updateTotals);
    input.addEventListener('change', updateTotals);
}

// Función para eliminar una denominación
function removeDenomination(button, type) {
    const container = document.getElementById(`${type}-container`);
    if (container.children.length > 1) {
        button.closest('.denomination-item').remove();
        updateTotals();
    } else {
        alert(`Debe haber al menos una ${type === 'coins' ? 'moneda' : 'billete'}`);
    }
}

// Función para actualizar los totales
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
}

// Función para calcular el total general
function calculateTotal() {
    updateTotals(); // Asegurarse de que los subtotales estén actualizados
    
    const coinsTotal = parseFloat(document.getElementById('coins-total').textContent);
    const billsTotal = parseFloat(document.getElementById('bills-total').textContent);
    const grandTotal = coinsTotal + billsTotal;
    
    document.getElementById('final-coins-total').textContent = coinsTotal.toFixed(2);
    document.getElementById('final-bills-total').textContent = billsTotal.toFixed(2);
    document.getElementById('grand-total').textContent = grandTotal.toFixed(2);
    
    // Mostrar el cuadro de resultados
    document.getElementById('result-box').style.display = 'block';
}

// Agregar event listeners iniciales
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.coin-denomination, .bill-denomination').forEach(select => {
        select.addEventListener('change', updateTotals);
    });
    
    document.querySelectorAll('.coin-quantity, .bill-quantity').forEach(input => {
        input.addEventListener('change', updateTotals);
    });
});