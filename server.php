<?php
$url = parse_url(getenv(" mysql://vuhsxgawmm76q2m0:cpe4lruxq8gtnexs@ijj1btjwrd3b7932.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/h335cz5ylaqekthf"));
$host = $url["ijj1btjwrd3b7932.cbetxkdyhwsb.us-east-1.rds.amazonaws.com"];
$user = $url["c21m3bihcvb3u8ib"];
$pass = $url["lj70kn5jrdaxl91v"];
$dbname = substr($url["d99c5oiieri85ca1"], 1);

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}
?>
