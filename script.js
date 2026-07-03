// ضع رابط Google Apps Script Web App هنا
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwEs59kHb5oMnBOD-pS_HlPuG-dlncvVGcvg0KtzvhDhRhTVaLcZ0zjxJkzrudgHF_XFQ/exec';

document.getElementById('applicationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = e.target.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'جاري الإرسال...';

    const formData = new FormData(e.target);
    const data = {};

    // جمع البيانات العادية
    for (let [key, value] of formData.entries()) {
        if (key === 'preferredAge' || key === 'availability') {
            if (!data[key]) data[key] = [];
            data[key].push(value);
        } else {
            data[key] = value;
        }
    }

    // تحويل المصفوفات لنصوص
    if (data.preferredAge) data.preferredAge = data.preferredAge.join(', ');
    if (data.availability) data.availability = data.availability.join(', ');

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if (response.ok) {
            document.querySelector('.form-section').style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
        } else {
            throw new Error('فشل الإرسال');
        }
    } catch (error) {
        alert('عذراً، حدث خطأ في الإرسال. حاولي مرة تانية.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'إرسال الطلب 💝';
    }
});
