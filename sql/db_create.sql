-- Users
CREATE TABLE users (
  userid          SERIAL        PRIMARY KEY,
  username        VARCHAR(50)   NOT NULL UNIQUE,
  password        VARCHAR(255)  NOT NULL, -- Assuming password will be hashed beforehand
  email           VARCHAR(255)  NOT NULL UNIQUE,
  firstname       VARCHAR(50)   NOT NULL,
  lastname        VARCHAR(50)   NOT NULL,
  address         VARCHAR(255)
);

-- Categories
CREATE TABLE categories (
  categoryid      SERIAL        PRIMARY KEY,
  name            VARCHAR(100)  NOT NULL,
  description     TEXT
);

-- Brands
CREATE TABLE brands (
  brandid         SERIAL        PRIMARY KEY,
  name            VARCHAR(100)  NOT NULL,
  description     TEXT
);

-- Products
CREATE TABLE products (
  productid       SERIAL        PRIMARY KEY,
  name            VARCHAR(100)  NOT NULL,
  description     TEXT,
  price           NUMERIC(10,2) NOT NULL,
  stockquantity   INT           NOT NULL,
  brandid         INT           NOT NULL
    REFERENCES brands(brandid)
    ON DELETE RESTRICT,
  categoryid      INT           NOT NULL
    REFERENCES categories(categoryid)
    ON DELETE RESTRICT
);

-- Orders
-- Utilizing enum for status in order to ensure only valid statuses are input
CREATE TYPE order_status AS ENUM (
  'pending',
  'completed',
  'shipped',
  'canceled',
  'returned'
);

CREATE TABLE orders (
  orderid         SERIAL        PRIMARY KEY,
  userid          INT           NOT NULL
    REFERENCES users(userid)
    ON DELETE CASCADE,
  orderdate       TIMESTAMP     NOT NULL,
  totalamount     NUMERIC(10,2) NOT NULL,
  status          order_status  NOT NULL
);

-- Payments
CREATE TABLE payments (
  paymentid       SERIAL        PRIMARY KEY,
  orderid         INT           NOT NULL UNIQUE
    REFERENCES orders(orderid)
    ON DELETE CASCADE,
  paymentmethod   VARCHAR(50)   NOT NULL,
  amount          NUMERIC(10,2) NOT NULL,
  paymentdate     TIMESTAMP     NOT NULL,
  status          VARCHAR(20)   NOT NULL
);

-- OrderItems
CREATE TABLE orderitems (
  orderitemid     SERIAL        PRIMARY KEY,
  orderid         INT           NOT NULL
    REFERENCES orders(orderid)
    ON DELETE CASCADE,
  productid       INT           NOT NULL
    REFERENCES products(productid)
    ON DELETE RESTRICT,
  quantity        INT           NOT NULL,
  subtotal        NUMERIC(10,2) NOT NULL
);

--Indexes on FKs to improve join performance
CREATE INDEX ON orders        (userid);
CREATE INDEX ON products      (brandid);
CREATE INDEX ON products      (categoryid);
CREATE INDEX ON orderitems    (orderid);
CREATE INDEX ON orderitems    (productid);