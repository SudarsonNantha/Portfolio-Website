// AOS.init();

document.addEventListener('DOMContentLoaded', function (e) {

 // Inject sidebar.html
  fetch("sidebar.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("sidebar-container").innerHTML = data;

      // Only enable scroll tracking if on the homepage
      if (document.body.dataset.page === "index") {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".sidebar-link");

        function onScroll() {
          let currentSectionId = "";

          sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (
              window.pageYOffset >= sectionTop - 250 &&
              window.pageYOffset < sectionTop + sectionHeight - 150
            ) {
              currentSectionId = section.getAttribute("id");
            }
          });

          navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `index.html#${currentSectionId}` || link.getAttribute("href") === `#${currentSectionId}`) {
              link.classList.add("active");
            }
          });
        }

        window.addEventListener("scroll", onScroll);
        onScroll(); // trigger on load
      }
    });

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
  const progressBar = document.getElementById('scrollBar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    if (progressBar) {
      progressBar.style.width = scrollPercent + '%';
    }
  });

});

