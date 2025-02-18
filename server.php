<?php
// ใช้ getenv() เพื่อดึงค่า JAWSDB_URL ที่ Heroku ตั้งไว้
$url = parse_url(getenv("mysql://vuhsxgawmm76q2m0:cpe4lruxq8gtnexs@ijj1btjwrd3b7932.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/h335cz5ylaqekthf"));
$host = $url["ijj1btjwrd3b7932.cbetxkdyhwsb.us-east-1.rds.amazonaws.com"];
$user = $url["vuhsxgawmm76q2m0"];
$pass = $url["cpe4lruxq8gtnexs"];
// ใช้ ltrim เพื่อเอาเครื่องหมาย / ออกจาก path
$dbname = ltrim($url["h335cz5ylaqekthf"], '/');

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}
?>
