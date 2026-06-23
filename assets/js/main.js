/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close')

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
  })
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
  })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
  const navMenu = document.getElementById('nav-menu')
  navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SWIPER PROJECTS & CERTIFICATES ===============*/
let swiperProjects, swiperCertificates;

function initSwipers() {
  swiperProjects = new Swiper("#projects-swiper", {
    loop: true,
    spaceBetween: 24,
    navigation: {
      nextEl: "#projects-swiper .swiper-button-next",
      prevEl: "#projects-swiper .swiper-button-prev",
    },
    pagination: {
      el: "#projects-swiper .swiper-pagination",
    },
    observer: true,
    observeParents: true,
    breakpoints: {
      1200: {
        slidesPerView: 2,
        spaceBetween: -56,
      },
    },
  });

  swiperCertificates = new Swiper("#certificates-swiper", {
    loop: true,
    spaceBetween: 24,
    navigation: {
      nextEl: "#certificates-swiper .swiper-button-next",
      prevEl: "#certificates-swiper .swiper-button-prev",
    },
    pagination: {
      el: "#certificates-swiper .swiper-pagination",
    },
    observer: true,
    observeParents: true,
    breakpoints: {
      1200: {
        slidesPerView: 2,
        spaceBetween: -56,
      },
    },
  });
}

initSwipers();

/*=============== PROJECTS & CERTIFICATES TABS ===============*/
const tabBtns = document.querySelectorAll('.projects__tab-btn');
const projectsSwiperEl = document.getElementById('projects-swiper');
const certificatesSwiperEl = document.getElementById('certificates-swiper');

// ✅ Visibility tab Projects/Certificates dikontrol murni lewat class
//    "swiper-active" (sudah diatur di styles.css). Kita TIDAK menyentuh
//    style.display lagi, supaya Swiper selalu menghitung ukuran &
//    posisi slide dengan benar (Swiper akan kacau jika diinisialisasi
//    atau diukur saat container-nya display: none).
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');

    // Update active class pada tombol
    tabBtns.forEach(b => b.classList.remove('active-tab'));
    btn.classList.add('active-tab');

    if (tab === 'projects') {
      // Tampilkan Projects, sembunyikan Certificates
      projectsSwiperEl.classList.add('swiper-active');
      certificatesSwiperEl.classList.remove('swiper-active');
    } else {
      // Tampilkan Certificates, sembunyikan Projects
      certificatesSwiperEl.classList.add('swiper-active');
      projectsSwiperEl.classList.remove('swiper-active');
    }

    // Recalculate ukuran & posisi slide setelah toggle
    if (swiperProjects) swiperProjects.update();
    if (swiperCertificates) swiperCertificates.update();
  });
});

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
  contactName = document.getElementById('contact-name'),
  contactEmail = document.getElementById('contact-email'),
  contactProject = document.getElementById('contact-project'),
  contactMessage = document.getElementById('contact-message')

const sendEmail = (e) => {
  e.preventDefault()

  if (contactName.value === '' || contactEmail.value === '' || contactProject.value === '') {
    contactMessage.classList.remove('color-blue')
    contactMessage.classList.add('color-red')
    contactMessage.textContent = 'Write all the input fields 📩'
  } else {
    emailjs.sendForm('service_vhrhsyk', 'template_ctg80i2', '#contact-form', 'iMnpZrW1weFY_oOcT')
      .then(() => {
        contactMessage.classList.add('color-blue')
        contactMessage.textContent = 'Message sent ✅'
        setTimeout(() => {
          contactMessage.textContent = ''
        }, 5000)
      }, (error) => {
        alert('OOPS! SOMETHING HAS FAILED...', error)
      })

    contactName.value = ''
    contactEmail.value = ''
    contactProject.value = ''
  }
}
contactForm.addEventListener('submit', sendEmail)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  const scrollDown = window.scrollY

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute('id'),
      sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add('active-link')
    } else {
      sectionsClass.classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)

/*=============== MODAL PROJECTS (WORKS ON BOTH TABS) ===============*/
const modal = document.getElementById('modal'),
  modalClose = document.getElementById('modal-close'),
  modalImg = document.getElementById('modal-img'),
  modalTitle = document.getElementById('modal-title'),
  modalDescription = document.getElementById('modal-description'),
  modalViewBtn = document.getElementById('modal-view-btn'),
  projectsSection = document.getElementById('projects');

const openModal = (imgSrc, title, description, link) => {
  modalImg.src = imgSrc;
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modalViewBtn.href = link;
  modal.classList.add('show-modal');

  if (swiperProjects && swiperProjects.detachEvents) {
    swiperProjects.detachEvents();
  }
  if (swiperCertificates && swiperCertificates.detachEvents) {
    swiperCertificates.detachEvents();
  }
};

const closeModal = () => {
  modal.classList.remove('show-modal');

  if (swiperProjects && swiperProjects.attachEvents) {
    swiperProjects.attachEvents();
  }
  if (swiperCertificates && swiperCertificates.attachEvents) {
    swiperCertificates.attachEvents();
  }
};

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show-modal')) {
    closeModal();
  }
});

// Event delegation untuk tombol Detail & gambar di seluruh #projects
projectsSection.addEventListener('click', (e) => {
  const target = e.target.closest('.projects__detail-btn, .projects__img');
  if (!target) return;

  e.stopPropagation();
  e.preventDefault();

  const content = target.closest('.projects__content');
  if (!content) return;

  const imgSrc = content.querySelector('.projects__img').src;
  const title = content.querySelector('.projects__title').textContent;
  const description = content.getAttribute('data-desc');
  const link = content.querySelector('.projects__view-btn').href;

  openModal(imgSrc, title, description, link);
});

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up')
  this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
    : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
  const header = document.getElementById('header')
  this.scrollY >= 50 ? header.classList.add('bg-header')
    : header.classList.remove('bg-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
})

sr.reveal('.home__data, .testimonial__container, .footer__container')
sr.reveal('.home__info div', { delay: 600, origin: 'bottom', interval: 100 })
sr.reveal('.skills__content:nth-child(1), .contact__content:nth-child(1)', { origin: 'left' })
sr.reveal('.skills__content:nth-child(2), .contact__content:nth-child(2)', { origin: 'right' })
sr.reveal('.qualification__content, .services__card', { interval: 100 })