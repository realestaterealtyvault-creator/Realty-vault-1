import re

PAGES = [
    'index.html',
    'about-us.html',
    'career.html',
    'commercial.html',
    'contact-us.html',
    'ghaziabad.html',
    'greater-noida.html',
    'gurugram.html',
    'noida.html',
    'residential.html'
]

CLEAN_FOOTER = """        <footer class="footer-section">
            <div class="container">
                <div class="footer-content pt-4 pb-4">
                    <div class="row">
                        <!-- Column 1: Brand & Social -->
                        <div class="col-xl-4 col-lg-4 mb-50">
                            <div class="footer-widget">
                                <div class="footer-logo">
                                    <a href="./"><img src="./assets/img/footer-logo-white.png" class="object-fit" width="160" height="auto" alt="Realty Vault logo"></a>
                                </div>
                                <div class="footer-text mb-20">
                                    <p style="color: #E3E7E4; font-size: 13.5px; line-height: 1.6; margin-top: 12px; margin-bottom: 18px; max-width: 320px;">
                                        Delhi NCR's premier real estate consultancy. Expert guidance for luxury residential and commercial properties across Noida, Greater Noida, and Gurugram.
                                    </p>
                                </div>
                                <div class="footer-social-icon">
                                    <span>Follow Us</span>
                                    <a href="https://www.facebook.com/61586046428900/" target="_blank" rel="noopener" title="Facebook">
                                        <img src="assets/img/icon/social/facebook.svg" alt="Facebook" style="width: 20px; height: 20px;">
                                    </a>
                                    <a href="https://www.instagram.com/realtyvault5/" target="_blank" rel="noopener" title="Instagram">
                                        <img src="assets/img/icon/social/insta.svg" alt="Instagram" style="width: 20px; height: 20px;">
                                    </a>
                                    <a href="https://www.linkedin.com/company/realty-vault5/" target="_blank" rel="noopener" title="LinkedIn">
                                        <img src="assets/img/icon/social/linkedin.svg" alt="LinkedIn" style="width: 20px; height: 20px;">
                                    </a>
                                    <a href="https://www.youtube.com/@RealtyVault" target="_blank" rel="noopener" title="YouTube"> 
                                        <img src="assets/img/icon/social/YouTube.svg" alt="YouTube" style="width: 20px; height: 20px;">
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- Column 2: Useful Links -->
                        <div class="col-xl-4 col-lg-4 col-md-6 mb-30">
                            <div class="footer-widget">
                                <div class="footer-widget-heading">
                                    <h3>Useful Links</h3>
                                </div>
                                <ul>
                                    <li><a href="./">Home</a></li>
                                    <li><a href="residential.html">Residential Properties</a></li>
                                    <li><a href="commercial.html">Commercial Properties</a></li>
                                    <li><a href="about-us.html">About Us</a></li>
                                    <li><a href="career.html">Career</a></li>
                                    <li><a href="contact-us.html">Contact Us</a></li>
                                </ul>
                            </div>
                        </div>

                        <!-- Column 3: Contact Us -->
                        <div class="col-xl-4 col-lg-4 col-md-6 mb-50">
                            <div class="footer-widget">
                                <div class="footer-widget-heading">
                                    <h3>Contact Us</h3>
                                </div>
                                <div class="footer-text">
                                    <p style="color: #E3E7E4; margin-bottom: 14px; font-size: 13.5px; line-height: 1.6;">
                                        <i class="bi bi-geo-alt-fill text-warning me-2"></i><strong>Office Address:</strong><br>
                                        First Floor, Office No 102, Regus Building, Sector 142, Noida, U.P. – 201304
                                    </p>

                                    <p style="color: #D4A62A; margin-top: 14px; margin-bottom: 6px; font-size: 12.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Contact Numbers:</p>
                                    <div class="footer-calls">
                                        <a href="tel:+919818996699" class="footer-call-link" title="Call Direct">
                                            <i class="bi bi-phone-fill text-warning"></i>
                                            <span class="footer-call-text">+91 98189 96699</span>
                                        </a>
                                        <a href="tel:+917065884555" class="footer-call-link" title="Call Helpline">
                                            <i class="bi bi-telephone-fill text-warning"></i>
                                            <span class="footer-call-text">+91 70658 84555</span>
                                        </a>
                                    </div>

                                    <p style="color: #D4A62A; margin-top: 14px; margin-bottom: 6px; font-size: 12.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Email Us:</p>
                                    <a href="mailto:realestaterealtyvault@gmail.com" class="footer-mail-link" title="Email Realty Vault">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style="width: 18px; height: 18px; fill: #D4A62A; margin-right: 9px; flex-shrink: 0;">
                                            <g data-name="7-Email-Arrow up">
                                                <path d="M29 4H3a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h13v-2H3a1 1 0 0 1-1-1V7.23l13.42 9.58a1 1 0 0 0 1.16 0L30 7.23V17h2V7a3 3 0 0 0-3-3zM16 14.77 3.72 6h24.56z" />
                                                <path d="m24.29 18.29-4 4 1.41 1.41 2.3-2.29V29h2v-7.59l2.29 2.29 1.41-1.41-4-4a1 1 0 0 0-1.41 0z" />
                                            </g>
                                        </svg>
                                        <span class="footer-mail-text">realestaterealtyvault@gmail.com</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer Lower / Copyright -->
            <div class="footer-lower">
                <div class="container text-center">
                    <p style="color: #94A3B8; margin: 0; font-size: 13px;">&copy; 2026 Realty Vault Consulting Pvt. Ltd. All rights reserved. | <a href="privacy-policy.html" style="color: #C6A15B; text-decoration: underline;">Privacy Policy</a></p>
                </div>
            </div>
        </footer>"""

footer_pattern = re.compile(r'<footer class="footer-section">.*?</footer>', re.DOTALL)
version_pattern = re.compile(r'premium-theme\.css(\?v=[^"\' >]+)?')

for page in PAGES:
    with open(page, 'r', encoding='utf-8') as f:
        c = f.read()

    # Bump version for fresh cache
    c = version_pattern.sub('premium-theme.css?v=8.0', c)

    # Replace footer block
    m = footer_pattern.search(c)
    if m:
        c = c[:m.start()] + CLEAN_FOOTER + c[m.end():]
        print(f"Updated footer in {page}")
    else:
        print(f"Warning: footer not matched in {page}")

    with open(page, 'w', encoding='utf-8', newline='') as f:
        f.write(c)

print("All 10 pages updated with clean luxury footer!")
