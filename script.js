// 1. GANTI URL INI DENGAN URL APPS SCRIPT ANDA
const API_URL = "https://script.google.com/macros/s/AKfycbweH_nP9RjKxHPP2nOSOyl73EwPPU0-rXKVbFtf3B7vc499WTUH6iEuPzLSiAFfJ1J6oQ/exec";
const WA_NUMBER = "6282314822991"; // Nomor WA bengkel (awali dengan 62)

let serviceData = [];

async function fetchServices() {
    try {
        const response = await fetch(API_URL);
        serviceData = await response.json();
        document.getElementById('loading').style.display = 'none';
        displayServices(serviceData);
    } catch (e) {
        document.getElementById('loading').innerText = "Koneksi Gagal.";
    }
}

function displayServices(data) {
    const container = document.getElementById('service-container');
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <input type="checkbox" class="cb" value="${item.harga}" data-name="${item.layanan}" id="${item.layanan}" onchange="updateTotal()">
            <label for="${item.layanan}">${item.layanan}</label>
            <span>Rp ${item.harga.toLocaleString('id-ID')}</span>
        `;
        container.appendChild(div);
    });
}

function updateTotal() {
    let total = 0;
    const name = document.getElementById('customer-name').value || "Pelanggan";
    const plate = document.getElementById('plate-number').value || "-";
    
    document.querySelectorAll('.cb:checked').forEach(cb => {
        total += parseInt(cb.value);
    });

    document.getElementById('display-name').innerText = name;
    document.getElementById('display-plate').innerText = "Plat: " + plate;
    document.getElementById('total-amount').innerText = "Rp " + total.toLocaleString('id-ID');
}

// Fitur Kirim WhatsApp
document.getElementById('wa-btn').onclick = () => {
    const name = document.getElementById('customer-name').value;
    const plate = document.getElementById('plate-number').value;
    let selected = [];
    let total = 0;

    document.querySelectorAll('.cb:checked').forEach(cb => {
        selected.push(`- ${cb.getAttribute('data-name')} (Rp ${parseInt(cb.value).toLocaleString('id-ID')})`);
        total += parseInt(cb.value);
    });

    if (selected.length === 0) return alert("Pilih minimal satu layanan!");

    const text = `Halo Admin, saya ingin konfirmasi servis:%0A%0ANama: ${name}%0APlat: ${plate}%0A%0ALayanan:%0A${selected.join('%0A')}%0A%0A*Total Estimasi: Rp ${total.toLocaleString('id-ID')}*`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank');
};

document.getElementById('customer-name').addEventListener('input', updateTotal);
document.getElementById('plate-number').addEventListener('input', updateTotal);

fetchServices();
