const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.hero-content h1, .hero-content p, .hero-stats, .btn-discover, .food-card, .testimonial-card')
    .forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
