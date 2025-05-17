-- User management
-- List users
SELECT userid, username, email, firstname, lastname, address
FROM users
ORDER BY username
LIMIT $1     -- e.g. page size
OFFSET $2;   -- e.g. (page-1)*page_size

-- Get a single user by ID
SELECT userid, username, email, firstname, lastname, address
FROM users
WHERE userid = $1;

-- Find user by username
SELECT userid, username, password
FROM users
WHERE username = $1;

-- Create a new user
INSERT INTO users (username, password, email, firstname, lastname, address)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING userid;

-- Update a users profile
UPDATE users
SET email     = $1,
    firstname = $2,
    lastname  = $3,
    address   = $4
WHERE userid =  $5;

-- Delete a user
DELETE FROM users
WHERE userid = $1;


-- Categories and brands
-- List all categories
SELECT categoryid, name, description
FROM categories
ORDER BY name;

-- Insert a brand
INSERT INTO brands (name, description)
VALUES ($1, $2)
RETURNING brandid;

-- Update a category
UPDATE categories
SET name        =  $1,
    description =  $2
WHERE categoryid = $3;


-- Products
-- Search and filter products (with category filter)
SELECT p.productid, p.name, p.price, p.stockquantity, b.name AS brand, c.name AS category
FROM products p
JOIN brands b ON b.brandid = p.brandid
JOIN categories c ON c.categoryid = p.categoryid
WHERE p.name ILIKE '%' || $1 || '%'   -- Search term
  AND p.categoryid = $2 -- category filter
ORDER BY p.name
LIMIT $3 OFFSET $4;     -- Limit and offset for use with multiple pages

-- Search and filter products (without category filter)
SELECT p.productid, p.name, p.price, p.stockquantity, b.name AS brand
FROM products p
JOIN brands b ON b.brandid = p.brandid
WHERE p.name ILIKE '%' || $1 || '%'   -- Search term
ORDER BY p.name
LIMIT $2 OFFSET $3;     -- Limit and offset for use with multiple pages

-- Get product details by ID
SELECT productid, name, description, price, stockquantity
FROM products
WHERE productid = $1;

-- Add a new product
INSERT INTO products (name, description, price, stockquantity, brandid, categoryid)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING productid;

-- Update stock after a sale
UPDATE products
SET stockquantity = stockquantity - $1    -- quantity sold
WHERE productid = $2;


-- Orders
-- List a users orders
SELECT o.orderid, o.orderdate, o.totalamount, o.status
FROM orders o
WHERE o.userid = $1
ORDER BY o.orderdate DESC;

-- Get full details for one order
SELECT o.orderid,
       o.orderdate,
       o.totalamount,
       o.status AS order_status,
       u.firstname,
       u.lastname,
       p.paymentmethod,
       p.status AS payment_status,
       p.paymentdate
FROM orders o
JOIN users u ON u.userid = o.userid
LEFT JOIN payments p ON p.orderid = o.orderid
WHERE o.orderid = $1;

-- List items in an order
SELECT oi.orderitemid,
       p.productid,
       p.name,
       oi.quantity,
       oi.subtotal
FROM orderitems oi
JOIN products p ON p.productid = oi.productid
WHERE oi.orderid = $1;

-- Create an order (and return its new ID)
INSERT INTO orders (userid, orderdate, totalamount, status)
VALUES ($1, $2, $3, $4)
RETURNING orderid;

-- Bulk-insert items for that order
INSERT INTO orderitems (orderid, productid, quantity, subtotal)
VALUES 
  ($1, $2, $3, $4),
  ($1, $5, $6, $7);    -- add as many rows as needed

-- Change order status
UPDATE orders
SET status = $1       -- e.g. 'shipped'
WHERE orderid = $2;

-- Record a payment
INSERT INTO payments (orderid, paymentmethod, amount, paymentdate, status)
VALUES ($1, $2, $3, $4, $5)
RETURNING paymentid;

-- Update payment status
UPDATE payments
SET status = $1       -- e.g. 'successful'
WHERE paymentid = $2;

-- Reporting
-- Total money from sales by category
SELECT c.categoryid, c.name,
       SUM(oi.subtotal) AS total_sales
FROM orderitems oi
JOIN products p ON p.productid = oi.productid
JOIN categories c ON c.categoryid = p.categoryid
GROUP BY c.categoryid, c.name
ORDER BY total_sales DESC;

-- Monthly revenue over a date range
SELECT date_trunc('month', orderdate) AS month,
       SUM(totalamount)               AS revenue
FROM orders
WHERE orderdate BETWEEN $1 AND $2    -- e.g. '2025-01-01' AND '2025-03-31'
GROUP BY 1
ORDER BY 1;

-- Top N best-selling products
SELECT p.productid, p.name,
       SUM(oi.quantity) AS total_sold
FROM orderitems oi
JOIN products p ON p.productid = oi.productid
GROUP BY p.productid, p.name
ORDER BY total_sold DESC
LIMIT $1;                             -- e.g. 5
