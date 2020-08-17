<?php
session_destroy();
session_start();
$_SESSION['cart'] = array();
?>