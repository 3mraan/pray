const citySelect = document.getElementById("city-select");
const cityName = document.getElementById("city-name");
const dateEl = document.getElementById("date");

function fetchPrayerTimes(city) {
  fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city.split(",")[0]}&country=${city.split(",")[1]}&method=5`)
    .then(res => res.json())
    .then(data => {
      const timings = data.data.timings;
      document.getElementById("fajr").textContent = timings.Fajr;
      document.getElementById("sunrise").textContent = timings.Sunrise;
      document.getElementById("dhuhr").textContent = timings.Dhuhr;
      document.getElementById("asr").textContent = timings.Asr;
      document.getElementById("maghrib").textContent = timings.Maghrib;
      document.getElementById("isha").textContent = timings.Isha;
      dateEl.textContent = new Date(data.data.date.readable).toLocaleDateString("ar-EG", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      cityName.textContent = citySelect.options[citySelect.selectedIndex].text;
    });
}

citySelect.addEventListener("change", () => {
  fetchPrayerTimes(citySelect.value);
});

// تحميل البيانات عند فتح الصفحة أول مرة
fetchPrayerTimes(citySelect.value);