<?php
// Set headers for CORS and JSON response
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit;
}

// Get parameters from either URL-encoded POST or JSON
$content_type = isset($_SERVER["CONTENT_TYPE"]) ? $_SERVER["CONTENT_TYPE"] : '';
if (strpos($content_type, "application/json") !== false) {
    $json = file_get_contents("php://input");
    $data = json_decode($json, true);
} else {
    $data = $_POST;
}

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid payload"]);
    exit;
}

// Extract and sanitize inputs
$name = isset($data["name"]) ? strip_tags(trim($data["name"])) : "";
$email = isset($data["email"]) ? filter_var(trim($data["email"]), FILTER_SANITIZE_EMAIL) : "";
$company = isset($data["company"]) ? strip_tags(trim($data["company"])) : "";
$challenge = isset($data["challenge"]) ? strip_tags(trim($data["challenge"])) : "";
$budget = isset($data["budget"]) ? strip_tags(trim($data["budget"])) : "";
$timeline = isset($data["timeline"]) ? strip_tags(trim($data["timeline"])) : "";

// Validate required fields
if (empty($name) || empty($email) || empty($company)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Name, email, and company are required."]);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Please enter a valid email address."]);
    exit;
}

// Block disposable / temporary email domains
$disallowed_domains = ['mailinator.com', 'yopmail.com', 'tempmail.com', 'dispostable.com', 'trashmail.com', 'guerrillamail.com', 'mailinator2.com'];
$email_parts = explode('@', $email);
$domain = end($email_parts);
$domain_lower = strtolower($domain);

foreach ($disallowed_domains as $disallowed) {
    if (strpos($domain_lower, $disallowed) !== false) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Disposable or temporary emails are not allowed. Please use a work email."]);
        exit;
    }
}

// ==========================================
// SMTP CONFIGURATION
// ==========================================
$smtp_config = [
    'host'     => 'mail.keymouseit.com',
    'port'     => 465,
    'username' => 'hello@keymouseit.com',
    'password' => 'k[rG(dNTF2h8', // Configured SMTP password
    'from'     => 'hello@keymouseit.com'
];

$to_admin = "globalsales.kmit@gmail.com";

// ==========================================
// EMAIL GENERATION
// ==========================================
$admin_subject = "New KeyMouse IT Lead: " . $name . " (" . $company . ")";
$admin_headers = [
    "MIME-Version" => "1.0",
    "Content-Type" => "text/html; charset=UTF-8",
    "From"         => "KeyMouse IT <" . $smtp_config['from'] . ">",
    "Reply-To"     => $name . " <" . $email . ">",
    "Subject"      => $admin_subject
];

$admin_body = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; padding: 40px 20px; margin: 0; }
    .card { background: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.02); max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; }
    .header { text-align: center; margin-bottom: 28px; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px; }
    .logo { font-size: 24px; font-weight: 800; color: #0b0f19; letter-spacing: -0.02em; text-decoration: none; }
    .logo-blue { color: #2563eb; }
    .badge-admin { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; background-color: #ef4444; color: #ffffff; padding: 4px 10px; border-radius: 99px; margin-top: 8px; }
    h2 { margin-top: 0; color: #0f172a; font-size: 20px; font-weight: 700; letter-spacing: -0.01em; }
    .info-grid { background-color: #f8fafc; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 24px; }
    .info-row { margin-bottom: 14px; font-size: 15px; }
    .info-row:last-child { margin-bottom: 0; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; display: inline-block; width: 90px; }
    .value { color: #0f172a; font-weight: 500; }
    .value-link { color: #2563eb; text-decoration: none; font-weight: 600; }
    .badge-blue { background-color: #dbeafe; color: #1e40af; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 99px; }
    .badge-amber { background-color: #fef3c7; color: #92400e; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 99px; }
    .challenge-card { border-left: 4px solid #2563eb; background-color: #f1f5f9; padding: 20px; border-radius: 0 12px 12px 0; font-style: italic; line-height: 1.6; color: #334155; font-size: 14.5px; }
    .footer { text-align: center; margin-top: 32px; font-size: 12px; color: #94a3b8; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <a href="https://keymouseit.com" style="text-decoration: none;">
        <img src="https://design.keymouseit.com/assets/logo.svg" alt="KeyMouse IT" width="220" height="auto" style="display: block; margin: 0 auto; border: 0; outline: none; max-width: 100%; width: 220px;" />
      </a>
      <span class="badge-admin" style="margin-top: 12px;">New Lead Alert</span>
    </div>
    <h2>New Project Inquiry</h2>
    <div class="info-grid">
      <div class="info-row"><span class="label">Name:</span> <span class="value">' . htmlspecialchars($name) . '</span></div>
      <div class="info-row"><span class="label">Email:</span> <a href="mailto:' . htmlspecialchars($email) . '" class="value-link">' . htmlspecialchars($email) . '</a></div>
      <div class="info-row"><span class="label">Company:</span> <span class="value">' . htmlspecialchars($company) . '</span></div>
      <div class="info-row"><span class="label">Budget:</span> <span class="badge-blue">' . htmlspecialchars($budget) . '</span></div>
      <div class="info-row"><span class="label">Timeline:</span> <span class="badge-amber">' . htmlspecialchars($timeline) . '</span></div>
    </div>
    <div class="challenge-card">
      <strong>Challenge Description:</strong><br><br>' . nl2br(htmlspecialchars($challenge)) . '
    </div>
    <div class="footer">
      This inquiry was sent from your website\'s contact form.<br>
      © 2026 KeyMouse IT. AI-Powered Systems. Real Business Impact.
    </div>
  </div>
</body>
</html>
';

$client_subject = "Your Consultation Has Been Confirmed";
$client_headers = [
    "MIME-Version" => "1.0",
    "Content-Type" => "text/html; charset=UTF-8",
    "From"         => "KeyMouse IT <" . $smtp_config['from'] . ">",
    "Reply-To"     => "KeyMouse IT <" . $smtp_config['from'] . ">",
    "Subject"      => $client_subject
];

$client_body = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; padding: 40px 20px; margin: 0; }
    .card { background: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.02); max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; }
    .header { text-align: center; margin-bottom: 28px; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px; }
    .logo { font-size: 24px; font-weight: 800; color: #0b0f19; letter-spacing: -0.02em; text-decoration: none; }
    .logo-blue { color: #2563eb; }
    h2 { margin-top: 0; color: #0f172a; font-size: 20px; font-weight: 700; letter-spacing: -0.01em; }
    p { font-size: 15px; line-height: 1.6; color: #334155; }
    .divider { height: 1px; background-color: #e2e8f0; margin: 24px 0; }
    .footer { text-align: center; font-size: 12px; color: #94a3b8; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <a href="https://keymouseit.com" style="text-decoration: none;">
        <img src="https://design.keymouseit.com/assets/logo.svg" alt="KeyMouse IT" width="220" height="auto" style="display: block; margin: 0 auto; border: 0; outline: none; max-width: 100%; width: 220px;" />
      </a>
    </div>
    <h3>Hi ' . htmlspecialchars($name) . ',</h3>
    <p>Thank you for choosing KeyMouse IT.</p>
    <p>Your consultation has been successfully confirmed. We look forward to meeting with you and discussing how KeyMouse IT can help transform your ideas into scalable digital solutions.</p>
    <p>We are looking forward to discussing your goals, understanding your challenges, and identifying opportunities where technology can create measurable value for your business. Our team will connect with you at the scheduled time and guide you through the next steps based on your specific requirements.</p>
    <p>If you need to reschedule or update any information before the meeting, please let us know.</p>
    <p>We appreciate your trust in KeyMouse IT and look forward to the conversation.</p>
    <div class="divider"></div>
    <p style="font-size: 14px; color: #64748b; margin-bottom: 0;">Warm regards,<br><br><strong style="color: #0f172a;">The KeyMouse IT Team</strong><br>Building Scalable Digital Solutions</p>
    <div class="footer" style="margin-top: 32px;">
      © 2026 KeyMouse IT. All rights reserved.<br>
    </div>
  </div>
</body>
</html>
';

// Send emails using SMTP socket
$send_admin = send_smtp_email($to_admin, $admin_subject, $admin_body, $admin_headers, $smtp_config);
$send_client = send_smtp_email($email, $client_subject, $client_body, $client_headers, $smtp_config);

if ($send_admin && $send_client) {
    echo json_encode(["success" => true, "message" => "Emails sent successfully via SMTP"]);
} else {
    // Save to a log file on localhost as fallback
    $host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : '';
    $is_localhost = (strpos($host, 'localhost') !== false || strpos($host, '127.0.0.1') !== false);
    
    if ($is_localhost) {
        $log_file = dirname(__FILE__) . '/mail_log.txt';
        $log_data = "=== SMTP FAILED OR BLANK - SAVED TO LOG ===\n";
        $log_data .= "DATE: " . date('Y-m-d H:i:s') . "\n";
        $log_data .= "ADMIN EMAIL TO: " . $to_admin . "\n\n";
        $log_data .= "CLIENT EMAIL TO: " . $email . "\n\n";
        file_put_contents($log_file, $log_data, FILE_APPEND);
        
        echo json_encode(["success" => true, "message" => "SMTP Failed, logged to mail_log.txt instead"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to send emails via SMTP"]);
    }
}

// Helper to read SMTP socket responses
function read_smtp_response($socket) {
    $data = "";
    while ($str = fgets($socket, 515)) {
        $data .= $str;
        if (substr($str, 3, 1) == " ") { break; }
    }
    return $data;
}

// SMTP Socket Function
function send_smtp_email($to, $subject, $body, $headers, $config) {
    if (empty($config['password']) || $config['password'] == 'your-email-password-here') {
        return false;
    }
    
    $host = $config['host'];
    $port = $config['port'];
    $username = $config['username'];
    $password = $config['password'];
    
    $socket = @fsockopen(($port == 465 ? "ssl://" : "") . $host, $port, $errno, $errstr, 15);
    if (!$socket) {
        return false;
    }
    
    read_smtp_response($socket);
    fwrite($socket, "EHLO localhost\r\n");
    read_smtp_response($socket);
    
    if ($port == 587) {
        fwrite($socket, "STARTTLS\r\n");
        read_smtp_response($socket);
        stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        fwrite($socket, "EHLO localhost\r\n");
        read_smtp_response($socket);
    }
    
    fwrite($socket, "AUTH LOGIN\r\n");
    read_smtp_response($socket);
    fwrite($socket, base64_encode($username) . "\r\n");
    read_smtp_response($socket);
    fwrite($socket, base64_encode($password) . "\r\n");
    $auth_res = read_smtp_response($socket);
    
    if (strpos($auth_res, "235") === false) {
        fclose($socket);
        return false;
    }
    
    fwrite($socket, "MAIL FROM: <" . $config['from'] . ">\r\n");
    read_smtp_response($socket);
    fwrite($socket, "RCPT TO: <" . $to . ">\r\n");
    read_smtp_response($socket);
    fwrite($socket, "DATA\r\n");
    read_smtp_response($socket);
    
    $headers_str = "";
    foreach ($headers as $k => $v) {
        $headers_str .= "$k: $v\r\n";
    }
    $headers_str .= "To: <" . $to . ">\r\n";
    
    $msg = $headers_str . "\r\n" . $body . "\r\n.\r\n";
    fwrite($socket, $msg);
    $send_res = read_smtp_response($socket);
    
    fwrite($socket, "QUIT\r\n");
    fclose($socket);
    
    return (strpos($send_res, "250") !== false);
}
?>
