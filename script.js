// Auto-calculate logic
document.querySelectorAll('.qty').forEach(input => {
    input.addEventListener('input', () => {
        let grandTotal = 0;
        document.querySelectorAll('#cash-rows tr').forEach(row => {
            const qty = parseFloat(row.querySelector('.qty').value) || 0;
            const denom = parseFloat(row.getAttribute('data-denom'));
            const total = qty * denom;
            row.querySelector('.row-total').innerText = total.toFixed(2);
            grandTotal += total;
        });
        document.getElementById('grand-total').innerText = grandTotal.toFixed(2);
    });
});

// Capture and Share logic
async function shareForm() {
    const area = document.getElementById('capture-area');
    const canvas = await html2canvas(area);
    
    canvas.toBlob(async (blob) => {
        const file = new File([blob], 'report.png', { type: 'image/png' });
        
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    files: [file],
                    title: 'Financial Report',
                    text: 'Here is the filled form.'
                });
            } catch (error) {
                console.log('Sharing failed', error);
            }
        } else {
            alert("Your browser doesn't support direct file sharing. You can long-press the image to save it.");
            // Fallback: Open image in new tab
            const imgData = canvas.toDataURL("image/png");
            const w = window.open('about:blank');
            w.document.write("<img src='" + imgData + "' alt='from canvas'/>");
        }
    });
}