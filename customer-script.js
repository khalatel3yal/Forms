// ⚠️ IMPORTANT: Replace this URL with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxAJNF-2D3jz7KuWqec27Vqx-OvnRibO63Hx54r9ToMrj5-1zXgwLPYYQIdbWCJh82p/exec';

document.getElementById('customerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get submit button
    const submitBtn = this.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'جاري الإرسال... ⏳';
    submitBtn.style.opacity = '0.7';

    // Get form data
    const formData = new FormData(this);
    const data = {};

    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        if (data[key]) {
            // Handle multiple values (checkboxes)
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    }

    // Log data to console
    console.log('Customer Request Data:', data);

    try {
        // Send to Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Important for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        // Note: With 'no-cors' mode, we can't read the response
        // but the data will still be sent successfully
        console.log('Data sent to Google Sheets');

        // Store in localStorage as backup
        const requests = JSON.parse(localStorage.getItem('customerRequests') || '[]');
        requests.push({
            ...data,
            timestamp: new Date().toISOString(),
            id: Date.now()
        });
        localStorage.setItem('customerRequests', JSON.stringify(requests));

        // Hide form and show success message
        this.style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
        console.error('Error sending data:', error);

        // Show error message
        alert('حدث خطأ أثناء إرسال البيانات. سيتم حفظها محلياً وإعادة المحاولة لاحقاً.');

        // Store in localStorage as fallback
        const requests = JSON.parse(localStorage.getItem('customerRequests') || '[]');
        requests.push({
            ...data,
            timestamp: new Date().toISOString(),
            id: Date.now(),
            synced: false
        });
        localStorage.setItem('customerRequests', JSON.stringify(requests));

        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        submitBtn.style.opacity = '1';
    }
});


