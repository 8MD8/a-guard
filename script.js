let isEnglish = true;

function login() {
    // Placeholder for login functionality
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (username && password) {
        document.getElementById("login-page").style.display = "none";
        document.getElementById("welcome-page").style.display = "block";
        document.getElementById("greeting-message").textContent = isEnglish ? "Welcome!" : "مرحبًا!";
    }
}

function startApp() {
    document.getElementById("welcome-page").style.display = "none";
    document.getElementById("health-questions").style.display = "block";
}

function checkWeather() {
    const healthStatus = document.getElementById("health-status").value;
    document.getElementById("health-questions").style.display = "none";
    document.getElementById("weather-info").style.display = "block";

    fetchWeatherData(healthStatus);
}

function fetchWeatherData(healthStatus) {
    // Example of OpenWeatherMap API - Replace 'YOUR_API_KEY' with your actual API key
    const apiKey = "67fd00e5a397180ef15507943e72ec8f"; // ضع مفتاح API الخاص بك هنا

// دالة لتحقق من موقع المستخدم الحالي
navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // استخدم الموقع الحالي لجلب بيانات الطقس
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=ar`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // استخدم البيانات هنا لإظهار حالة الطقس
            const weatherCondition = data.weather[0].description;
            const temp = data.main.temp;

            // مثال على نصائح الطقس حسب الحالة
            if (weatherCondition.includes("clear")) {
                document.getElementById("advice").textContent = "الطقس جيد، يمكنك الخروج ولا تنسَ البخاخة!";
            } else {
                document.getElementById("advice").textContent = "الطقس غير مناسب، ارتدِ الكمامة وتجنب الخروج إذا استطعت.";
            }

            document.getElementById("weather").textContent = `الطقس الحالي: ${weatherCondition}, درجة الحرارة: ${temp}°C`;
        })
        .catch(error => console.error("حدث خطأ في جلب بيانات الطقس:", error));
});

}

function changeLanguage() {
    isEnglish = !isEnglish;
    document.body.dir = isEnglish ? "ltr" : "rtl";

    // Update texts
    document.getElementById("username").placeholder = isEnglish ? "Username" : "اسم المستخدم";
    document.getElementById("password").placeholder = isEnglish ? "Password" : "كلمة المرور";
    document.querySelector("button").textContent = isEnglish ? "Login" : "تسجيل الدخول";
}
