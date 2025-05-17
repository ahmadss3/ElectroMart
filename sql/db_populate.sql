BEGIN;

-- Users
INSERT INTO users (
  userid,
  username,
  password,
  email,
  firstname,
  lastname,
  address
) VALUES
  (1, 'alice', 'hashespassword123', 'alice@example.com', 'Alice', 'Anderson', '123 Maple St'),
  (2, 'bob',   'Secuer123b!', 'bob@example.com',   'Bob',   'Builder',  '456 Construction Rd');

-- Categories
INSERT INTO categories (categoryid, name, description) VALUES
  (1, 'Electronics', 'Gadgets and electronic devices'),
  (2, 'Books',       'Printed and digital books'),
  (3, 'Clothing',    'Apparel for men and women');

-- Brands
INSERT INTO brands (brandid, name, description) VALUES
  (1, 'Acme',   'Acme Corporation, quality goods'),
  (2, 'Globex', 'Globex International'),
  (3, 'Initech','Initech Solutions');

-- Products
INSERT INTO products (
  productid,
  name,
  description,
  price,
  stockquantity,
  brandid,
  categoryid
) VALUES
  (1, 'Acme Smartphone', 'State-of-the-art mobile phone',   699.99,  50, 1, 1),
  (2, 'Acme Laptop',     'Powerful laptop for professionals',1299.00,20, 1, 1),
  (3, 'Globex Novel',    'A thrilling mystery novel',        19.99,100, 2, 2),
  (4, 'Initech T-Shirt', 'Soft cotton tee',                   9.99,200, 3, 3);

-- Orders
INSERT INTO orders (
  orderid,
  userid,
  orderdate,
  totalamount,
  status
) VALUES
  (1, 1, '2025-05-01 10:15:00', 719.98, 'completed'),
  (2, 2, '2025-05-02 14:30:00',  29.98, 'pending');

-- OrderItems
INSERT INTO orderitems (
  orderitemid,
  orderid,
  productid,
  quantity,
  subtotal
) VALUES
  (1, 1, 1, 1, 699.99),
  (2, 1, 3, 1,  19.99),
  (3, 2, 3, 1,  19.99),
  (4, 2, 4, 1,   9.99);

-- Payments
INSERT INTO payments (
  paymentid,
  orderid,
  paymentmethod,
  amount,
  paymentdate,
  status
) VALUES
  (1, 1, 'credit_card', 719.98, '2025-05-01 10:17:00', 'successful'),
  (2, 2, 'paypal',       29.98, '2025-05-02 14:35:00', 'pending');

-- Reset serial sequences so they continue after our test ids
SELECT setval(pg_get_serial_sequence('users',        'userid'),      (SELECT MAX(userid)      FROM users));
SELECT setval(pg_get_serial_sequence('categories',   'categoryid'),  (SELECT MAX(categoryid)  FROM categories));
SELECT setval(pg_get_serial_sequence('brands',       'brandid'),     (SELECT MAX(brandid)     FROM brands));
SELECT setval(pg_get_serial_sequence('products',     'productid'),   (SELECT MAX(productid)   FROM products));
SELECT setval(pg_get_serial_sequence('orders',       'orderid'),     (SELECT MAX(orderid)     FROM orders));
SELECT setval(pg_get_serial_sequence('orderitems',   'orderitemid'), (SELECT MAX(orderitemid) FROM orderitems));
SELECT setval(pg_get_serial_sequence('payments',     'paymentid'),   (SELECT MAX(paymentid)   FROM payments));

COMMIT;
