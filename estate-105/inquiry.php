<?php
/**
 * Realty Vault - Estate 105 Enquiry & Lead Processor
 * Destination: realestaterealtyvault@gmail.com
 */

header('Content-Type: application/json; charset=utf-8');

// Target recipient email
$to_email = "realestaterealtyvault@gmail.com";
$subject = "New Estate 105 Enquiry - Realty Vault";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize input fields
    $name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : (isset($_POST['qname']) ? strip_tags(trim($_POST['qname'])) : 'Not Provided');
    $phone = isset($_POST['phone']) ? strip_tags(trim($_POST['phone'])) : (isset($_POST['mobile']) ? strip_tags(trim($_POST['mobile'])) : (isset($_POST['qphone']) ? strip_tags(trim($_POST['qphone'])) : 'Not Provided'));
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : (isset($_POST['qemail']) ? filter_var(trim($_POST['qemail']), FILTER_SANITIZE_EMAIL) : 'Not Provided');
    $property_type = isset($_POST['property_type']) ? strip_tags(trim($_POST['property_type'])) : (isset($_POST['project']) ? strip_tags(trim($_POST['project'])) : 'Estate 105 Consultation');
    $message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : 'No additional notes provided';
    $source_url = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : 'Direct / Website';
    $timestamp = date("Y-m-d H:i:s");

    // Email Body Construction
    $email_content = "
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
                <h2>Realty Vault - Estate 105 Lead Enquiry</h2>
                <p style='margin: 5px 0 0; font-size: 13px; color: #E3E7E4;'>A new consultation request has been submitted</p>
            </div>
            <div class='content'>
                <div class='field-row'><span class='field-label'>Full Name:</span> <span class='field-value'>{$name}</span></div>
                <div class='field-row'><span class='field-label'>Phone Number:</span> <span class='field-value'><a href='tel:{$phone}'>{$phone}</a></span></div>
                <div class='field-row'><span class='field-label'>Email:</span> <span class='field-value'>{$email}</span></div>
                <div class='field-row'><span class='field-label'>Property Interest:</span> <span class='field-value'>{$property_type}</span></div>
                <div class='field-row'><span class='field-label'>Message / Query:</span> <span class='field-value'>{$message}</span></div>
                <div class='field-row'><span class='field-label'>Page Source:</span> <span class='field-value'>{$source_url}</span></div>
                <div class='field-row'><span class='field-label'>Received At:</span> <span class='field-value'>{$timestamp}</span></div>
            </div>
            <div class='footer'>
                This inquiry was automatically delivered to <strong>realestaterealtyvault@gmail.com</strong> from Realty Vault.
            </div>
        </div>
    </body>
    </html>
    ";

    // Headers
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: Realty Vault Leads <realestaterealtyvault@gmail.com>\r\n";
    if ($email !== 'Not Provided' && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $headers .= "Reply-To: {$email}\r\n";
    }

    // Send Mail
    $mail_sent = @mail($to_email, $subject, $email_content, $headers);

    // Also log to a leads file locally as backup
    $log_entry = "[{$timestamp}] Name: {$name} | Phone: {$phone} | Email: {$email} | Type: {$property_type}\n";
    @file_put_contents(__DIR__ . '/leads_log.txt', $log_entry, FILE_APPEND);

    // Response
    echo json_encode([
        "status" => "success",
        "message" => "Your inquiry has been successfully sent to realestaterealtyvault@gmail.com. We will contact you shortly.",
        "mail_sent" => $mail_sent
    ]);
    exit;
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
    exit;
}
?>
