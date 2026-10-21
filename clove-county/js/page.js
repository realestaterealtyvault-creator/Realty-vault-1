   document.addEventListener("DOMContentLoaded", function () {
        setTimeout(function () {
            var myModal = new bootstrap.Modal(document.getElementById('contactModal'));
            myModal.show();
        }, 2000); // 2 seconds
    });
    
    
      document.addEventListener("DOMContentLoaded", function () {
            document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
                link.addEventListener('click', function (e) {
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    if (!targetSection) return;

                    e.preventDefault();

                    const offcanvasEl = document.getElementById('mobileMenu');
                    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);

                    const scrollAction = () => {
                        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        history.replaceState(null, null, targetId); // Update URL hash manually
                    };

                    if (bsOffcanvas) {
                        bsOffcanvas.hide();
                        setTimeout(scrollAction, 300);
                    } else {
                        scrollAction();
                    }
                });
            });
        });






        $('.banner-carousel').owlCarousel({
            items: 1,
            autoplay: true,
            loop: true
        });

        $('.amenities-slider').owlCarousel({
            items: 1,
            margin: 30,
            loop: true,
            autoplay: true,
            autoplayTimeout: 2500,
            smartSpeed: 900,
            dots: false,
            nav: false,
        });

        $('.gallery-slider').owlCarousel({
            loop: true,
            margin: 15,
            autoplay: true,
            autoplayTimeout: 2500,
            smartSpeed: 800,
            center: true,
            dots: false,
            nav: true,
            navText: ['<', '>'],
            responsive: {
                0: { items: 1 },
                576: { items: 2 },
                992: { items: 3 }
            }
        });


        const enquiryBox = document.querySelector(".enquiry-box");
        const toggleIcon = document.querySelector(".toggle-form");
        const header = document.querySelector(".enquiry-header");

        // Manual toggle on header click
        header.onclick = () => {
            enquiryBox.classList.toggle("collapsed");
            toggleIcon.classList.toggle("fa-chevron-down");
            toggleIcon.classList.toggle("fa-chevron-up");
        };

        let lastScroll = window.scrollY;

        window.addEventListener("scroll", () => {
            let currentScroll = window.scrollY;

            // Scroll Down → Collapse form
            if (currentScroll > lastScroll) {
                enquiryBox.classList.add("collapsed");
                toggleIcon.classList.remove("fa-chevron-down");
                toggleIcon.classList.add("fa-chevron-up");
            }

            // Only when near top → Expand form
            if (currentScroll < 100) {
                enquiryBox.classList.remove("collapsed");
                toggleIcon.classList.remove("fa-chevron-up");
                toggleIcon.classList.add("fa-chevron-down");
            }

            lastScroll = currentScroll;
        });