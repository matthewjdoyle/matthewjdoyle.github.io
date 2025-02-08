document.addEventListener('DOMContentLoaded', function() {
    // Initialize Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes to sections
    const animations = ['slide-up', 'slide-left', 'slide-right', 'scale'];
    let animationIndex = 0;

    document.querySelectorAll('section:not(.no-animate)').forEach((section, index) => {
        // Remove any existing animation classes
        section.classList.remove('visible');
        
        // Add fade-in class
        section.classList.add('fade-in');
        
        // Add shadow effect
        section.classList.add('shadow');
        
        // Alternate between different animation styles
        section.classList.add(animations[animationIndex]);
        animationIndex = (animationIndex + 1) % animations.length;

        // Observe the section
        observer.observe(section);
    });
}); 