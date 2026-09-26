/**
 * NC CARGO SRL - Interactive Web Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      mobileNavDrawer.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileNavDrawer.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // 2. Sticky Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Active Nav Link on Scroll (Intersection Observer / Scroll Spy)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // 4. Quote Form Submission -> WhatsApp Direct Integration
  const quoteForm = document.getElementById('quoteForm');
  const formFeedback = document.getElementById('formFeedback');
  const WHATSAPP_PHONE = '5491162959986'; // Daiana Lopez - NC Cargo

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = document.getElementById('formNombre').value.trim();
      const telefono = document.getElementById('formTelefono').value.trim();
      const email = document.getElementById('formEmail').value.trim() || 'No especificado';
      const servicio = document.getElementById('formServicio').value;
      const mensaje = document.getElementById('formMensaje').value.trim();

      if (!nombre || !telefono || !mensaje) {
        if (formFeedback) {
          formFeedback.className = 'form-feedback error';
          formFeedback.textContent = 'Por favor complete todos los campos obligatorios.';
        }
        return;
      }

      // Format WhatsApp text message
      const messageText = 
`*SOLICITUD DE PRESUPUESTO - NC CARGO SRL*
👤 *Nombre:* ${nombre}
📞 *Teléfono:* ${telefono}
✉️ *Email:* ${email}
🚚 *Servicio:* ${servicio}
📝 *Detalle de la carga / Consulta:*
${mensaje}

_Enviado desde el sitio web oficial nccargo.com_`;

      const encodedMessage = encodeURIComponent(messageText);
      const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

      if (formFeedback) {
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Redirigiendo a WhatsApp para enviar tu consulta...';
      }

      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        if (formFeedback) {
          formFeedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> ¡Listo! Se abrió la conversación de WhatsApp con tu mensaje.';
        }
        quoteForm.reset();
      }, 700);
    });
  }

  // 5. Gallery Lightbox Modal
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxOverlay = document.getElementById('lightboxOverlay');

  function openLightbox(src, caption) {
    if (!lightboxModal) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const fullSrc = card.getAttribute('data-full');
      const caption = card.getAttribute('data-caption');
      openLightbox(fullSrc, caption);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });
});
