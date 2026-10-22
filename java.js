// 1. Menú desplegable para celulares
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
}

// Cierra el menú móvil al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
});

// 2. Efecto de seguimiento de cursor en tarjetas (Glassmorphism Spotlight)
const cards = document.querySelectorAll('.service-card');
cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// 3. Scroll Reveal con Intersection Observer
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(el => revealObserver.observe(el));

// 4. Integración con WhatsApp y mensajes prellenados personalizados
function contactWhatsApp(serviceName) {
    const phoneNumber = "573108186325";
    const message = `Hola Prisma Studio, estoy interesado en el servicio de ${serviceName}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// 5. Navbar dinámico al hacer scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(5, 5, 5, 0.9)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.15)';
    } else {
        navbar.style.background = 'rgba(5, 5, 5, 0.75)';
        navbar.style.borderBottom = '1px solid var(--border-glass)';
    }
});

// 6. Contador de Visitas Simulado/Local
function updateVisitorCounter() {
    let visits = localStorage.getItem('prisma_visit_count');
    if (!visits) {
        visits = 1271;
    } else {
        visits = parseInt(visits) + 1;
    }
    localStorage.setItem('prisma_visit_count', visits);
    
    const counterElement = document.getElementById('visit-count');
    if (counterElement) {
        counterElement.textContent = Number(visits).toLocaleString('es-CO');
    }
}

document.addEventListener('DOMContentLoaded', updateVisitorCounter);