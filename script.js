const apiKey = 'd9ee9bf6322973d321bb645aaaca1d5f'; // API Key Raja Ongkir
const apiUrl = 'https://api.rajaongkir.com/starter';

// Fungsi untuk mengambil data provinsi
async function loadProvinces() {
    try {
        const response = await fetch(`${apiUrl}/province`, {
            headers: {
                'key': apiKey
            }
        });
        const data = await response.json();
        const provinces = data.rajaongkir.results;
        const provinceSelect = document.getElementById('province');
        provinces.forEach(province => {
            const option = document.createElement('option');
            option.value = province.province_id;
            option.textContent = province.province;
            provinceSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching provinces:', error);
    }
}

// Fungsi untuk mengambil data kota berdasarkan provinsi
async function loadCities(provinceId) {
    try {
        const response = await fetch(`${apiUrl}/city?province=${provinceId}`, {
            headers: {
                'key': apiKey
            }
        });
        const data = await response.json();
        const cities = data.rajaongkir.results;
        const citySelect = document.getElementById('city');
        citySelect.innerHTML = '<option value="">Pilih Kota/Kabupaten</option>'; // Reset options
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city.city_id;
            option.textContent = city.city_name;
            citySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching cities:', error);
    }
}

// Event listener untuk perubahan provinsi
document.getElementById('province').addEventListener('change', (event) => {
    const provinceId = event.target.value;
    if (provinceId) {
        loadCities(provinceId);
    }
});

// Load provinsi saat halaman dimuat
window.addEventListener('DOMContentLoaded', loadProvinces);
