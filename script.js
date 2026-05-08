// GANTI DENGAN URL DEPLOYMENT GOOGLE APPS SCRIPT ANDA
const API_URL = "https://script.google.com/macros/s/AKfycbxt9hVBv2CxmxOTrC9-2Da3GfnxcyeWPZ9b9C4pTIQ064bGBfBr007rCT7Avb7FqSx83w/exec";

async function fetchServices() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        document.getElementById('loading').style.display = 'none';
        displayServices(data);
    } catch (e) {
        document.getElementById('loading').innerText = "Gagal memuat data. Periksa koneksi atau URL API.";
    }
}

function displayServices(data) {
    const container = document.getElementById('service-container');
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <input type="checkbox" class="cb" value="${item.harga}" id="${item.layanan}" onchange="updateTotal()">
            <label for="${item.layanan}">${item.layanan}</label>
            <span>Rp ${item.harga.toLocaleString('id-ID')}</span>
        `;
        container.appendChild(div);
    });
}

function updateTotal() {
    let total = 0;
    document.querySelectorAll('.cb:checked').forEach(cb => {
        total += parseInt(cb.value);
    });
    document.getElementById('total-amount').innerText = "Rp " + total.toLocaleString('id-ID');
}

fetchServices();
