document.addEventListener('DOMContentLoaded', () => {
  const cursorOuter = document.createElement('div');
  cursorOuter.className = 'cursor-outer';
  
  const cursorInner = document.createElement('div');
  cursorInner.className = 'cursor-inner';
  
  document.body.appendChild(cursorOuter);
  document.body.appendChild(cursorInner);
  
  let mouseX = 0;
  let mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    

    cursorInner.style.left = mouseX + 'px';
    cursorInner.style.top = mouseY + 'px';
  });
  
  
  const animateCursor = () => {
    const currentX = parseFloat(getComputedStyle(cursorOuter).left) || mouseX;
    const currentY = parseFloat(getComputedStyle(cursorOuter).top) || mouseY;
    
    const dx = mouseX - currentX;
    const dy = mouseY - currentY;
    
    const newX = currentX + dx * 0.2;
    const newY = currentY + dy * 0.2;
    
    cursorOuter.style.left = newX + 'px';
    cursorOuter.style.top = newY + 'px';
    
    requestAnimationFrame(animateCursor);
  };
  
  
  animateCursor();
  
  
  const interactiveElements = document.querySelectorAll('a, button, .menu-card, .btn, .btn-outline');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOuter.classList.add('cursor-hover');
      cursorInner.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
      cursorOuter.classList.remove('cursor-hover');
      cursorInner.classList.remove('cursor-hover');
    });
  });
  
  
  document.addEventListener('mousedown', () => {
    cursorOuter.classList.add('cursor-click');
    cursorInner.classList.add('cursor-click');
  });
  
  document.addEventListener('mouseup', () => {
    cursorOuter.classList.remove('cursor-click');
    cursorInner.classList.remove('cursor-click');
  });
});