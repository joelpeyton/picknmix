<?php
session_start();

$id = isset($_GET['id']) ? $_GET['id'] : "";

$id = ltrim($id, "a");

if (!in_array($id, $_SESSION['cart'])) {
    array_push($_SESSION['cart'], $id);
}
?>