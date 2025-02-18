<?php
$host = "localhost";
$user = "root";  // Change according to your MySQL settings
$pass = "";  // Change according to your MySQL settings
$dbname = "game_shop";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>

