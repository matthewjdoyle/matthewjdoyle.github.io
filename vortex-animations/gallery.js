document.addEventListener('DOMContentLoaded', function() {
    // Check if page is embedded
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('embedded') === 'true') {
        document.body.classList.add('embedded');
    }

    const modal = document.getElementById('animation-modal');
    const modalImg = modal.querySelector('img');
    const modalTitle = modal.querySelector('h3');
    const modalDesc = modal.querySelector('p');
    const closeBtn = modal.querySelector('.close-modal');

    // Open modal
    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const galleryItem = this.closest('.gallery-item');
            const img = galleryItem.querySelector('img');
            const title = galleryItem.querySelector('h3').textContent;
            const desc = galleryItem.querySelector('p').textContent;

            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}); 