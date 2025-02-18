<?php
$url = parse_url(getenv("mysql://c21m3bihcvb3u8ib:lj70kn5jrdaxl91v@ijj1btjwrd3b7932.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/d99c5oiieri85ca1"));
$host = $url["ijj1btjwrd3b7932.cbetxkdyhwsb.us-east-1.rds.amazonaws.com	"];
$user = $url["c21m3bihcvb3u8ib"];
$pass = $url["lj70kn5jrdaxl91v"];
$dbname = substr($url["d99c5oiieri85ca1"], 1);

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}
?>
