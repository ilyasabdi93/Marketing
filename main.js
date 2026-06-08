// Main application entry point
document.addEventListener('DOMContentLoaded', () => {
  // Hide loading after everything is ready
  setTimeout(() => {
    if (!localStorage.getItem('user')) {
      document.getElementById('loading').classList.add('hidden');
    }
  }, 2000);
  
  // Product 3D preview placeholders
  document.querySelectorAll('.product-3d').forEach((el) => {
    const modelType = el.dataset.model;
    
    // Create mini Three.js scene for each product card
    const width = el.clientWidth;
    const height = 300;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    
    // Lighting
    const ambient = new THREE.AmbientLight(0x222244, 0.5);
    scene.add(ambient);
    
    const light = new THREE.DirectionalLight(0x00ff88, 0.8);
    light.position.set(2, 3, 4);
    scene.add(light);
    
    const light2 = new THREE.DirectionalLight(0x4488ff, 0.3);
    light2.position.set(-2, -1, -3);
    scene.add(light2);
    
    // Create model based on type
    let model;
    switch(modelType) {
      case 'shirt':
        model = createShirt(0x00ff88);
        break;
      case 'pants':
        model = createPants(0x4488ff);
        break;
      case 'hoodie':
        model = createHoodie(0xff4488);
        break;
      default:
        model = createShirt(0x00ff88);
    }
    
    model.scale.set(0.8, 0.8, 0.8);
    scene.add(model);
    
    camera.position.z = 2.5;
    camera.position.y = 0.3;
    
    function animateProduct() {
      requestAnimationFrame(animateProduct);
      model.rotation.y += 0.01;
      model.position.y = Math.sin(Date.now() * 0.002) * 0.05;
      renderer.render(scene, camera);
    }
    
    animateProduct();
  });
  
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
  });
});

// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');
  });
});