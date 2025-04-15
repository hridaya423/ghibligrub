const setupPageTransitions = () => {
  document.body.classList.add('fade-in');
  
  
  const internalLinks = document.querySelectorAll('a[href^="index"], a[href^="menu"], a[href^="about"]');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.currentTarget.href;
      
      
      document.body.classList.remove('fade-in');
      document.body.classList.add('fade-out');
      
      
      setTimeout(() => {
        window.location.href = target;
      }, 500);
    });
  });
};


const enhanceMenuCards = () => {
  const menuCards = document.querySelectorAll('.menu-card');
  
  menuCards.forEach(card => {
    
    const glowEffect = document.createElement('div');
    glowEffect.className = 'glow-effect';
    card.appendChild(glowEffect);
    
    
    const randomRotation = (Math.random() - 0.5) * 3;
    card.style.transform = `rotate(${randomRotation}deg)`;
    
    
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'rotate(0deg) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `rotate(${randomRotation}deg)`;
    });
  });
};




document.addEventListener('DOMContentLoaded', () => {
  setupPageTransitions();
  
  
  if (document.querySelector('.menu-grid')) {
    enhanceMenuCards();
  }
  
  
  const glassHeader = document.querySelector('header.glass');
  if (glassHeader) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const opacity = Math.min(0.8, 0.6 + (scrollPosition / 500));
      glassHeader.style.backgroundColor = `rgba(255, 244, 234, ${opacity})`;
    });
  }
  
  
  addNotificationStyles();

  document.querySelectorAll('nav h1').forEach(logo => {
    const chars = logo.textContent.split('');
    logo.innerHTML = chars.map((c,i) => `<span class="logo-char" style="animation-delay:${i*0.1}s">${c}</span>`).join('');
    
    logo.addEventListener('mouseenter', () => {
      logo.querySelectorAll('.logo-char').forEach((span,i) => {
        span.style.animation = `bounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${i*0.05}s forwards`;
      });
    });
    
    logo.addEventListener('mouseleave', () => {
      logo.querySelectorAll('.logo-char').forEach(span => {
        span.style.animation = 'float 3s infinite';
        void span.offsetWidth;
      });
    });
  });
});