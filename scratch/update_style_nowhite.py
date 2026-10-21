with open('assets/css/style.css', 'r', encoding='utf-8') as f:
    content = f.read()

target = """     .footer-text a {
        font-size: 14px;
        font-weight: 700;
        color: #000000 !important;
        -webkit-text-fill-color: #000000 !important;
        background: #FFFFFF !important;
        -webkit-background-clip: border-box !important;
        background-clip: border-box !important;
    }"""

repl = """     .footer-text a {
        font-size: 15px;
        font-weight: 600;
        color: #FFFFFF !important;
        -webkit-text-fill-color: #FFFFFF !important;
        background: transparent !important;
        background-color: transparent !important;
        -webkit-background-clip: border-box !important;
        background-clip: border-box !important;
        border: none !important;
        box-shadow: none !important;
        text-decoration: none !important;
    }"""

if target in content:
    content = content.replace(target, repl, 1)
    print("Found and replaced style.css with LF.")
else:
    t_crlf = target.replace('\n', '\r\n')
    r_crlf = repl.replace('\n', '\r\n')
    if t_crlf in content:
        content = content.replace(t_crlf, r_crlf, 1)
        print("Found and replaced style.css with CRLF.")
    else:
        print("Error: target not found in style.css!")

with open('assets/css/style.css', 'w', encoding='utf-8', newline='') as f:
    f.write(content)
print("Updated style.css successfully.")
