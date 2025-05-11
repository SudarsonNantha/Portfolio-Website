// AOS.init();
document.addEventListener('DOMContentLoaded', function () {

  // 1. Load the sidebar
  fetch('sidebar.html')
    .then(response => {
      if (!response.ok) throw new Error('Sidebar not found');
      return response.text();
    })
    .then(html => {
      document.getElementById('sidebar-container').innerHTML = html;
    })
    .catch(err => console.error('Sidebar load error:', err));

  // 2. Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true,
      duration: 800,
      easing: 'ease-in-out',
    });
  } else {
    console.warn('AOS not loaded');
  }


 // 3. Scroll Progress Bar
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });

    // Scroll progress bar
    const scrollBar = document.getElementById('scrollBar');
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollBar.style.width = scrolled + '%';
  });


  // Only activate on index.html
  if (document.body.dataset.page !== 'index') return;

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar-link');

  function activateLink() {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 60;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', activateLink);

});

const swiper = new Swiper('.swiper-container', {
  loop: true,
  spaceBetween: 20,
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
});

fetch('sidebar.html?' + new Date().getTime()) // cache-busting
  .then(response => {
    if (!response.ok) throw new Error('Sidebar not found');
    return response.text();
  })
  .then(html => {
    document.getElementById('sidebar-container').innerHTML = html;
  })
  .catch(err => console.error('Sidebar load error:', err));

}
