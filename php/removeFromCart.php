<?php
session_start();

$id = isset($_GET['id']) ? $_GET['id'] : "";

$id = ltrim($id, "m");

if (in_array($id, $_SESSION['cart'])) {
    $index = array_search($id, $_SESSION['cart']);
    array_splice($_SESSION['cart'], $index, 1);
}
?>