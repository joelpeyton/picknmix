<?php
    include "database.php";
    include "record.php";

    $database = new Database();
    $db = $database->getConnection();

    $email = htmlspecialchars(strip_tags($_GET["email"]));
    $given_name = htmlspecialchars(strip_tags($_GET["given_name"]));
    $surname = htmlspecialchars(strip_tags($_GET["surname"]));
    $total = htmlspecialchars(strip_tags($_GET["total"]));
    $discount = htmlspecialchars(strip_tags($_GET["discount"]));
    $promo_discount = htmlspecialchars(strip_tags($_GET["promo_discount"]));
    $shipping = htmlspecialchars(strip_tags($_GET["shipping"]));
    $grand_total = htmlspecialchars(strip_tags($_GET["grand_total"]));
    $notes = htmlspecialchars(strip_tags($_GET["notes"]));
    $transaction_id = htmlspecialchars(strip_tags($_GET["transaction_id"]));
    
    $cart = $_GET["cart"];
    $cart_decoded = json_decode($cart);
    
    $text = "";

    for ($i = 0; $i < count($cart_decoded); $i++) {
      foreach($cart_decoded[$i] as $k => $v) {
      	if ($k != "sold") {
        	$text .= $k . ": " . $v . '<br>';
        }
      }
      $text .= '<br>';
    }

    $sender = "{$given_name} {$surname}";
    $sender_email = $email;
    $subject = "Successful transaction from Pick n Mix Records Website";
    
    $message = '<html><body>';
    $message .= '<h2>Transaction Information</h2>';
    $message .= '<p>Transaction ID: ' . $transaction_id . '<br>';
    $message .= 'Name: ' . $given_name . '<br>';
    $message .= 'Surname: ' . $surname . '<br>';
    $message .= 'Email: ' . $email . '<br>';
    $message .= 'Total: ' . $total . '<br>';
    $message .= 'Fixed price single discount: ' . $discount . '<br>';
    $message .= 'Promo discount: ' . $promo_discount . '<br>';
    $message .= 'Shipping: ' . $shipping . '<br>';
    $message .= 'Grand Total: ' . $grand_total . '<br>';
    $message .= 'Notes: ' . $notes . '<br>';
    $message .= '</p>';
    $message .= '<h3>Records</h3>';
    $message .= '<p>' . $text . '</p>';
    $message .= '</body></html>';

    $headers  = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=iso-8859-1" . "\r\n";
    $headers .= "From: {$sender} <{$sender_email}>" . "\r\n";
    
    $receiver = "ian@picknmixrecords.com";
    mail($receiver, $subject, $message, $headers);
?>
