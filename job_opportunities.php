<?php
/**
 * Realty Vault - Career / Job Opportunities Application Processor
 * Destination: realestaterealtyvault@gmail.com
 */

header('Content-Type: text/html; charset=utf-8');

$to_email = "realestaterealtyvault@gmail.com";
$subject = "New Job Application - Realty Vault Careers";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : 'Not Provided';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : 'Not Provided';
    $phone = isset($_POST['phone']) ? strip_tags(trim($_POST['phone'])) : 'Not Provided';
    $place = isset($_POST['place']) ? strip_tags(trim($_POST['place'])) : 'Not Specified';
    $designation = isset($_POST['designation']) ? strip_tags(trim($_POST['designation'])) : 'Not Specified';
    $timestamp = date("Y-m-d H:i:s");

    // Handle File Upload (Resume)
    $has_attachment = false;
    $attachment_name = '';
    $attachment_data = '';

    if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
        $file_tmp = $_FILES['resume']['tmp_name'];
        $file_name = basename($_FILES['resume']['name']);
        $file_size = $_FILES['resume']['size'];
        $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

        if ($file_ext === 'pdf' && $file_size <= 10 * 1024 * 1024) { // Max 10MB PDF
            $has_attachment = true;
            $attachment_name = $file_name;
            $attachment_data = chunk_split(base64_encode(file_get_contents($file_tmp)));

            // Save resume to uploads folder as backup
            $upload_dir = __DIR__ . '/uploads/resumes/';
            if (!is_dir($upload_dir)) {
                @mkdir($upload_dir, 0777, true);
            }
            @move_uploaded_file($file_tmp, $upload_dir . time() . '_' . $file_name);
        }
    }

    // HTML Email Body
    $html_body = "
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 20px auto; border: 1px solid #E3E7E4; border-radius: 8px; overflow: hidden; }
            .header { background-color: #073B3A; color: #FFFFFF; padding: 20px; text-align: center; }
            .header h2 { margin: 0; color: #D4A62A; }
            .content { padding: 25px; background: #FFFFFF; }
            .field-row { margin-bottom: 15px; border-bottom: 1px solid #F0F2F0; padding-bottom: 8px; }
            .field-label { font-weight: bold; color: #006B64; display: inline-block; width: 140px; }
            .field-value { color: #202927; }
            .footer { background: #F7F5EF; padding: 12px; font-size: 12px; text-align: center; color: #596561; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Realty Vault - Career Application</h2>
                <p style='margin: 5px 0 0; font-size: 13px; color: #E3E7E4;'>A candidate has applied for a position</p>
            </div>
            <div class='content'>
                <div class='field-row'><span class='field-label'>Full Name:</span> <span class='field-value'>{$name}</span></div>
                <div class='field-row'><span class='field-label'>Phone Number:</span> <span class='field-value'><a href='tel:{$phone}'>{$phone}</a></span></div>
                <div class='field-row'><span class='field-label'>Email:</span> <span class='field-value'>{$email}</span></div>
                <div class='field-row'><span class='field-label'>Location / Place:</span> <span class='field-value'>{$place}</span></div>
                <div class='field-row'><span class='field-label'>Position Applied:</span> <span class='field-value'>{$designation}</span></div>
                <div class='field-row'><span class='field-label'>Resume:</span> <span class='field-value'>" . ($has_attachment ? $attachment_name : "None") . "</span></div>
                <div class='field-row'><span class='field-label'>Received At:</span> <span class='field-value'>{$timestamp}</span></div>
            </div>
            <div class='footer'>
                Application delivered to <strong>realestaterealtyvault@gmail.com</strong>
            </div>
        </div>
    </body>
    </html>
    ";

    // Email Headers & Multipart handling
    $boundary = md5(time());
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "From: Realty Vault Careers <realestaterealtyvault@gmail.com>\r\n";
    if ($email !== 'Not Provided' && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $headers .= "Reply-To: {$email}\r\n";
    }

    if ($has_attachment) {
        $headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n\r\n";
        $email_content = "--{$boundary}\r\n";
        $email_content .= "Content-Type: text/html; charset=UTF-8\r\n";
        $email_content .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
        $email_content .= $html_body . "\r\n\r\n";
        $email_content .= "--{$boundary}\r\n";
        $email_content .= "Content-Type: application/pdf; name=\"{$attachment_name}\"\r\n";
        $email_content .= "Content-Transfer-Encoding: base64\r\n";
        $email_content .= "Content-Disposition: attachment; filename=\"{$attachment_name}\"\r\n\r\n";
        $email_content .= $attachment_data . "\r\n\r\n";
        $email_content .= "--{$boundary}--";
    } else {
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $email_content = $html_body;
    }

    @mail($to_email, $subject, $email_content, $headers);

    // Confirmation page to user
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Application Received - Realty Vault</title>
        <link href="assets/css/bootstrap.min.css" rel="stylesheet">
        <link href="assets/css/premium-theme.css?v=5.6" rel="stylesheet">
        <style>
            body { background: #073B3A; color: #FFF; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: 'Montserrat', sans-serif; }
            .card-box { background: #FFFFFF; color: #202927; padding: 40px; border-radius: 12px; max-width: 500px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
            .check-icon { font-size: 55px; color: #006B64; margin-bottom: 15px; }
            .btn-home { background: #D4A62A; color: #073B3A; font-weight: 700; padding: 12px 28px; border-radius: 25px; text-decoration: none; display: inline-block; margin-top: 20px; }
            .btn-home:hover { background: #C6A15B; color: #073B3A; }
        </style>
    </head>
    <body>
        <div class="card-box">
            <div class="check-icon">&#10004;</div>
            <h2 style="color: #073B3A; font-weight: 700;">Application Received!</h2>
            <p style="color: #596561; margin-top: 10px;">Thank you, <strong><?php echo htmlspecialchars($name); ?></strong>. Your job application for <strong><?php echo htmlspecialchars($designation); ?></strong> has been successfully submitted to <strong>realestaterealtyvault@gmail.com</strong>.</p>
            <p style="font-size: 14px; color: #7B8884;">Our HR and talent acquisition team will review your credentials and contact you shortly.</p>
            <a href="index.html" class="btn-home">Back to Home</a>
        </div>
    </body>
    </html>
    <?php
    exit;
} else {
    header("Location: career.html");
    exit;
}
?>
