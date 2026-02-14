/**
 * Valentine's Day Website - Interactions & Animations
 */

(function() {
  'use strict';

  const HEART_CHARS = ['♥', '♡', '♥', '♡'];
  const DECO_IMAGES = [
    'assets/c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_082012095a7be38d4d90bc8f2c17134d_images_image-ca91239a-59e7-4ac3-8ffa-5d67c9846ced.png',
    'assets/c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_082012095a7be38d4d90bc8f2c17134d_images_image-a9aea122-f87d-478c-a4ad-a91a955abebc.png',
    'assets/c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_082012095a7be38d4d90bc8f2c17134d_images_image-104f4572-2fb4-4d80-a4ab-b10bc1cb3e39.png',
    'assets/c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_082012095a7be38d4d90bc8f2c17134d_images_image-73f7e63e-586c-4295-b7f9-2087abf3394c.png',
    'assets/c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_082012095a7be38d4d90bc8f2c17134d_images_image-4693e5e0-4446-4a4d-9ec9-13436ee0a175.png',
    'assets/c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_082012095a7be38d4d90bc8f2c17134d_images_image-1d13bea0-8297-4bd3-bc4b-a2343dd33cf0.png'
  ];

  // ===== FLOATING HEARTS BACKGROUND =====
  function initFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    if (!container) return;

    for (let i = 0; i < 10; i++) {
      const heart = document.createElement('span');
      heart.textContent = HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)];
      heart.style.left = (Math.random() * 100) + '%';
      heart.style.animationDelay = (Math.random() * 8) + 's';
      heart.style.animationDuration = (10 + Math.random() * 4) + 's';
      container.appendChild(heart);
    }
  }

  // ===== SCROLL REVEAL =====
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    function checkReveal() {
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight * 0.85;

      reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < triggerPoint) {
          el.classList.add('visible');
        }
      });
    }

    window.addEventListener('scroll', checkReveal);
    window.addEventListener('resize', checkReveal);
    checkReveal();
  }

  // ===== CTA BUTTON - SPAWN HEARTS ON CLICK & OPEN POPUP =====
  function initCtaButton() {
    const btn = document.getElementById('ctaBtn');
    const popup = document.getElementById('loveCardPopup');
    const closeBtn = document.getElementById('closePopup');
    const saveBtn = document.getElementById('saveNote');
    const noteArea = document.getElementById('specialNote');

    if (!btn || !popup) return;

    btn.addEventListener('click', function(e) {
      const rect = btn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Burst hearts
      for (let i = 0; i < 8; i++) {
        setTimeout(() => spawnHeart(x, y), i * 60);
      }

      // Open popup after a short delay
      setTimeout(() => {
        popup.classList.add('active');
        noteArea.focus();
      }, 600);
    });

    closeBtn.addEventListener('click', () => {
      popup.classList.remove('active');
    });

    // Close on overlay click
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.remove('active');
      }
    });

    saveBtn.addEventListener('click', () => {
      const note = noteArea.value.trim();
      if (note) {
        const card = document.querySelector('.love-card');
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Add closing animation
        card.style.animation = 'sealAndFly 2s ease-in-out forwards';
        
        // MASSIVE colorful heart explosion covering entire screen
        setTimeout(() => {
          for (let i = 0; i < 150; i++) {
            setTimeout(() => spawnColorfulHeart(centerX, centerY), i * 15);
          }
        }, 800);

        setTimeout(() => {
          popup.classList.remove('active');
          card.style.animation = '';
          noteArea.value = '';
        }, 3500);
      } else {
        noteArea.placeholder = "Please write something sweet first...";
        noteArea.classList.add('shake');
        setTimeout(() => noteArea.classList.remove('shake'), 500);
      }
    });
  }

  function spawnHeart(x, y) {
    const heart = document.createElement('span');
    heart.textContent = HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)];
    heart.className = 'burst-heart';

    const tx = (Math.random() - 0.5) * 120;
    const ty = -60 - Math.random() * 80;

    heart.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      font-size: 24px;
      color: #722f37;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.9;
      animation: burstHeart 1.2s ease-out forwards;
      --tx: ${tx}px;
      --ty: ${ty}px;
    `;

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
  }

  function spawnColorfulHeart(x, y) {
    const heart = document.createElement('span');
    heart.textContent = '♥';
    heart.className = 'burst-heart';

    const colors = ['#ff1744', '#f50057', '#d500f9', '#651fff', '#2979ff', '#00b0ff', '#00e5ff', '#1de9b6', '#00e676', '#76ff03', '#c6ff00', '#ffea00', '#ffc400', '#ff9100', '#ff3d00', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff5722'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 300 + Math.random() * 600; // Much larger distance
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const rotation = Math.random() * 1080 - 540;
    const scale = 1 + Math.random() * 1.5;

    heart.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      font-size: ${25 + Math.random() * 35}px;
      color: ${color};
      pointer-events: none;
      z-index: 10000;
      opacity: 1;
      animation: colorfulBurst 3s ease-out forwards;
      --tx: ${tx}px;
      --ty: ${ty}px;
      --rotation: ${rotation}deg;
      --scale: ${scale};
      text-shadow: 0 0 15px ${color}, 0 0 30px ${color}, 0 0 45px ${color};
    `;

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
  }

  // Global click handler for heart bursts
  document.addEventListener('click', function(e) {
    // Skip if clicking on popup overlay or inside love card
    if (e.target.closest('.popup-overlay') || e.target.closest('.love-card')) {
      return;
    }
    
    const x = e.clientX;
    const y = e.clientY;
    
    // Larger colorful burst on every click
    for (let i = 0; i < 12; i++) {
      setTimeout(() => spawnClickHeart(x, y), i * 30);
    }
  });

  function spawnClickHeart(x, y) {
    const heart = document.createElement('span');
    heart.textContent = '♥';
    heart.className = 'burst-heart';

    const colors = ['#ff1744', '#f50057', '#d500f9', '#651fff', '#2979ff', '#00b0ff', '#00e5ff', '#1de9b6', '#00e676', '#76ff03', '#c6ff00', '#ffea00', '#ffc400', '#ff9100', '#ff3d00', '#e91e63', '#9c27b0', '#673ab7'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 150;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const rotation = Math.random() * 720 - 360;
    const scale = 1 + Math.random() * 0.8;

    heart.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      font-size: ${30 + Math.random() * 25}px;
      color: ${color};
      pointer-events: none;
      z-index: 9999;
      opacity: 1;
      animation: clickBurst 1.5s ease-out forwards;
      --tx: ${tx}px;
      --ty: ${ty}px;
      --rotation: ${rotation}deg;
      --scale: ${scale};
      text-shadow: 0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color};
    `;

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
  }

  // Add burst animation style
  const burstStyle = document.createElement('style');
  burstStyle.textContent = `
    @keyframes burstHeart {
      0% { transform: scale(0) translate(0, 0); opacity: 0.9; }
      100% { transform: scale(1.2) translate(var(--tx), var(--ty)); opacity: 0; }
    }
    
    @keyframes clickBurst {
      0% { 
        transform: scale(0) translate(0, 0) rotate(0deg); 
        opacity: 1; 
      }
      100% { 
        transform: scale(var(--scale)) translate(var(--tx), var(--ty)) rotate(var(--rotation)); 
        opacity: 0; 
      }
    }
    
    @keyframes colorfulBurst {
      0% { 
        transform: scale(0) translate(0, 0) rotate(0deg); 
        opacity: 1; 
      }
      100% { 
        transform: scale(var(--scale)) translate(var(--tx), var(--ty)) rotate(var(--rotation)); 
        opacity: 0; 
      }
    }
    
    @keyframes sealAndFly {
      0% { 
        transform: translateY(0) scale(1) rotateY(0deg);
        opacity: 1;
      }
      30% {
        transform: translateY(0) scale(0.95) rotateY(0deg);
      }
      50% {
        transform: translateY(-20px) scale(0.9) rotateY(10deg);
      }
      100% { 
        transform: translateY(-800px) scale(0.3) rotateY(180deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(burstStyle);

  // ===== DECO STRIP - POPULATE WITH IMAGES =====
  function initDecoStrip() {
    const strip = document.getElementById('decoStrip');
    if (!strip) return;

    const loveMessages = [
      "Every moment with you feels like a beautiful dream come true 💕",
      "Your smile lights up my world in ways words can't describe ✨",
      "In your arms, I've found my forever home 🏠💖",
      "You are the reason my heart beats with joy every single day 💓",
      "Together with you, every day is a new adventure filled with love 🌟",
      "Your love is the most precious gift I've ever received 🎁💝"
    ];

    let currentActiveImg = null;

    DECO_IMAGES.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.loading = 'lazy';
      img.dataset.message = loveMessages[i];
      img.style.cursor = 'pointer';
      
      img.addEventListener('click', function(e) {
        const container = document.getElementById('loveMessageContainer');
        
        // If clicking the same image, close the message
        if (currentActiveImg === this) {
          hideLoveMessage();
          currentActiveImg = null;
          return;
        }
        
        // If a different image is clicked, show new message
        currentActiveImg = this;
        showLoveMessage(this.dataset.message, e.clientX, e.clientY);
        
        // Heart burst on image click
        for (let j = 0; j < 15; j++) {
          setTimeout(() => spawnClickHeart(e.clientX, e.clientY), j * 25);
        }
      });
      
      strip.appendChild(img);
    });

    // Close message when clicking on the message container
    const container = document.getElementById('loveMessageContainer');
    if (container) {
      container.addEventListener('click', function() {
        hideLoveMessage();
        currentActiveImg = null;
      });
    }
  }

  function showLoveMessage(message, x, y) {
    const container = document.getElementById('loveMessageContainer');
    const messageEl = document.getElementById('loveMessage');
    
    if (!container || !messageEl) return;
    
    // Set message and position
    messageEl.textContent = message;
    container.style.display = 'flex';
    
    // Remove any existing animation classes
    messageEl.classList.remove('message-enter', 'message-exit');
    
    // Trigger entrance animation
    setTimeout(() => {
      messageEl.classList.add('message-enter');
    }, 10);
  }

  function hideLoveMessage() {
    const container = document.getElementById('loveMessageContainer');
    const messageEl = document.getElementById('loveMessage');
    
    if (!container || !messageEl) return;
    
    messageEl.classList.remove('message-enter');
    messageEl.classList.add('message-exit');
    
    setTimeout(() => {
      container.style.display = 'none';
      messageEl.classList.remove('message-exit');
    }, 600);
  }

  // ===== INIT =====
  function init() {
    initFloatingHearts();
    initScrollReveal();
    initCtaButton();
    initDecoStrip();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
