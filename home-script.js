// Handle card clicks
document.getElementById('beKhalaCard').addEventListener('click', function () {
    // Add click animation
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        // Navigate to the form page
        window.location.href = 'khala-form.html';
    }, 200);
});

document.getElementById('needKhalaCard').addEventListener('click', function () {
    // Add click animation
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        // Navigate to the customer form page
        window.location.href = 'customer-form.html';
    }, 200);
});

// Add keyboard navigation support
document.querySelectorAll('.card').forEach(card => {
    card.setAttribute('tabindex', '0');

    card.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});
