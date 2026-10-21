with open('assets/css/premium-theme.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Update logo wrap
target_logo = """.footer-widget .footer-logo-wrap,
.footer-widget .footer-logo-wrap > a,
.footer-widget .footer-logo,
.footer-widget .footer-logo > a {
  display: inline-flex !important;
  align-items: center !important;
  background: #FFFFFF !important;
  padding: 8px 18px !important;
  border-radius: 8px !important;
  border: 1px solid #C6A15B !important;
  margin-bottom: 20px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
}"""

repl_logo = """.footer-widget .footer-logo-wrap,
.footer-widget .footer-logo-wrap > a,
.footer-widget .footer-logo,
.footer-widget .footer-logo > a {
  display: inline-flex !important;
  align-items: center !important;
  background: transparent !important;
  background-color: transparent !important;
  padding: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  margin-bottom: 14px !important;
  box-shadow: none !important;
}"""

if target_logo in css:
    css = css.replace(target_logo, repl_logo, 1)
    print("Logo updated with LF.")
else:
    t_crlf = target_logo.replace('\n', '\r\n')
    r_crlf = repl_logo.replace('\n', '\r\n')
    if t_crlf in css:
        css = css.replace(t_crlf, r_crlf, 1)
        print("Logo updated with CRLF.")
    else:
        print("Error: target_logo not found!")

# 2. Update contact links (remove white boxes)
target_contact = """.footer-calls {
  display: flex !important;
  flex-direction: column !important;
  gap: 10px !important;
  margin-top: 10px !important;
  margin-bottom: 14px !important;
}

.footer-call-link,
.footer-mail-link,
.footer-mail-text,
.footer-call-text,
.footer-text a.footer-call-link,
.footer-text a.footer-mail-link,
.footer-widget .footer-text a[href^="tel:"],
.footer-widget .footer-text a[href^="mailto:"] {
  display: inline-flex !important;
  align-items: center !important;
  background: #FFFFFF !important;
  color: #000000 !important; /* Pure black text */
  -webkit-text-fill-color: #000000 !important;
  -webkit-background-clip: border-box !important;
  background-clip: border-box !important;
  font-family: var(--font-montserrat, "Montserrat", -apple-system, sans-serif) !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  letter-spacing: 0.2px !important;
  padding: 8px 16px !important;
  border-radius: 8px !important;
  border: 1.5px solid #C6A15B !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12) !important;
  text-decoration: none !important;
  margin-bottom: 8px !important;
  width: fit-content !important;
  max-width: 100% !important;
  white-space: nowrap !important;
  transition: all 0.25s ease !important;
}

.footer-mail-link span,
.footer-call-link span,
.footer-mail-text,
.footer-call-text {
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
  font-weight: 700 !important;
}

.footer-call-link:hover,
.footer-mail-link:hover,
.footer-widget .footer-text a[href^="tel:"]:hover,
.footer-widget .footer-text a[href^="mailto:"]:hover {
  background: #FDF6E2 !important; /* Subtle warm gold accent on hover */
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
  border-color: #D4A62A !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18) !important;
}

.footer-call-link i,
.footer-widget .footer-text a[href^="tel:"] i {
  color: #D4A62A !important;
  -webkit-text-fill-color: #D4A62A !important;
  font-size: 15px !important;
  margin-right: 9px !important;
  line-height: 1 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
}

.footer-mail-link svg,
.footer-widget .footer-text a[href^="mailto:"] svg {
  width: 18px !important;
  height: 18px !important;
  fill: #D4A62A !important;
  margin-right: 9px !important;
  display: inline-block !important;
  vertical-align: middle !important;
  flex-shrink: 0 !important;
}"""

repl_contact = """.footer-calls {
  display: flex !important;
  flex-direction: column !important;
  gap: 8px !important;
  margin-top: 6px !important;
  margin-bottom: 14px !important;
}

.footer-call-link,
.footer-mail-link,
.footer-mail-text,
.footer-call-text,
.footer-text a.footer-call-link,
.footer-text a.footer-mail-link,
.footer-widget .footer-text a[href^="tel:"],
.footer-widget .footer-text a[href^="mailto:"] {
  display: inline-flex !important;
  align-items: center !important;
  background: transparent !important;
  background-color: transparent !important;
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
  -webkit-background-clip: border-box !important;
  background-clip: border-box !important;
  font-family: var(--font-montserrat, "Montserrat", -apple-system, sans-serif) !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  letter-spacing: 0.3px !important;
  padding: 0 !important;
  border-radius: 0 !important;
  border: none !important;
  box-shadow: none !important;
  text-decoration: none !important;
  margin-bottom: 6px !important;
  width: fit-content !important;
  max-width: 100% !important;
  white-space: nowrap !important;
  transition: all 0.25s ease !important;
}

.footer-mail-link span,
.footer-call-link span,
.footer-mail-text,
.footer-call-text {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
  font-weight: 600 !important;
  transition: color 0.25s ease !important;
}

.footer-call-link:hover,
.footer-mail-link:hover,
.footer-widget .footer-text a[href^="tel:"]:hover,
.footer-widget .footer-text a[href^="mailto:"]:hover {
  background: transparent !important;
  background-color: transparent !important;
  color: #D4A62A !important;
  -webkit-text-fill-color: #D4A62A !important;
  border: none !important;
  transform: translateX(4px) !important;
  box-shadow: none !important;
}

.footer-call-link:hover span,
.footer-mail-link:hover span,
.footer-call-link:hover .footer-call-text,
.footer-mail-link:hover .footer-mail-text {
  color: #D4A62A !important;
  -webkit-text-fill-color: #D4A62A !important;
}

.footer-call-link i,
.footer-widget .footer-text a[href^="tel:"] i {
  color: #D4A62A !important;
  -webkit-text-fill-color: #D4A62A !important;
  font-size: 16px !important;
  margin-right: 10px !important;
  line-height: 1 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
  transition: transform 0.25s ease !important;
}

.footer-call-link:hover i {
  transform: scale(1.15) !important;
}

.footer-mail-link svg,
.footer-widget .footer-text a[href^="mailto:"] svg {
  width: 18px !important;
  height: 18px !important;
  fill: #D4A62A !important;
  margin-right: 10px !important;
  display: inline-block !important;
  vertical-align: middle !important;
  flex-shrink: 0 !important;
  transition: transform 0.25s ease !important;
}

.footer-mail-link:hover svg {
  transform: scale(1.15) !important;
}"""

if target_contact in css:
    css = css.replace(target_contact, repl_contact, 1)
    print("Contact block updated with LF.")
else:
    t_crlf = target_contact.replace('\n', '\r\n')
    r_crlf = repl_contact.replace('\n', '\r\n')
    if t_crlf in css:
        css = css.replace(t_crlf, r_crlf, 1)
        print("Contact block updated with CRLF.")
    else:
        print("Error: target_contact not found!")

with open('assets/css/premium-theme.css', 'w', encoding='utf-8', newline='') as f:
    f.write(css)

print("premium-theme.css successfully updated.")
