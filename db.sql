CREATE DATABASE IF NOT EXISTS game_shop;
USE game_shop;

CREATE TABLE IF NOT EXISTS product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    description TEXT,
    image_url VARCHAR(255)
);

INSERT INTO product (name, price, description, image_url) VALUES
('Game ID #1', 500, 'Premium game account with rare items', 'images/game1.jpg'),
('Game ID #2', 700, 'High-level character with exclusive skins', 'images/game2.jpg'),
('Game ID #3', 1000, 'Ultimate game package with all DLCs', 'images/game3.jpg');

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    total_price INT NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    price INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

