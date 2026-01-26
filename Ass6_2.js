import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./src/config/.env" });
const app = express();
import mysql from "mysql2";
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "test",
  multipleStatements: true,
});
db.connect((err) => {
  if (err) return console.log("error", { message: err });
  console.log("db is connected successful");
});
const port = process.env.PORT;
app.use(express.json());

const CT_SUPPLIERS = `CREATE TABLE IF NOT EXISTS SUPPLIERS(
    SUPPLIER_ID INT PRIMARY KEY AUTO_INCREMENT,
    SUPPLIER_NAME TEXT,
    CONTACT_NUMBER TEXT
)`;
const CT_PRODUCTS = `CREATE TABLE IF NOT EXISTS PRODUCTS (
PRODUCT_ID INT PRIMARY KEY AUTO_INCREMENT,
PRODUCT_NAME TEXT,
PRICE INT,
QUANTITY INT,
SUPPLIER_ID INT,
FOREIGN KEY(SUPPLIER_ID) REFERENCES SUPPLIERS(SUPPLIER_ID)
)`;
const CT_SALES = `CREATE TABLE IF NOT EXISTS SALES(
SALE_ID INT PRIMARY KEY AUTO_INCREMENT,
QUANTITY_SOLD INT,
SALE_DATE DATE,
PRODUCT_ID INT,
FOREIGN KEY(PRODUCT_ID) REFERENCES PRODUCTS(PRODUCT_ID)
)`;
const ADD_COLUMN = `ALTER TABLE PRODUCTS ADD CATEGORY TEXT;`;
const DROP_COLUMN = `ALTER TABLE PRODUCTS DROP COLUMN CATEGORY;`;
const update_column_CONTACT_NUMBER = `ALTER TABLE SUPPLIERS MODIFY COLUMN CONTACT_NUMBER VARCHAR(15);`;
const update_column_PRODUCT_NAME = `ALTER TABLE PRODUCTS MODIFY COLUMN PRODUCT_NAME TEXT NOT NULL;`;

app.post("/tables/add_category", (req, res) => {
  // ADD COLUMN category IN PRODUCTS TABLE
  db.execute(ADD_COLUMN, (err, result) => {
    if (err) {
      console.log("err in database", err);
      res.status(400).json({ Error: err });
      return;
    }
    console.log("the column added successful", result);
    res.json("the column added successful");
  });
});
app.post("/db/create_tables_retailstore", (req, res) => {
  //create tables in db
  db.execute(CT_SUPPLIERS, (err, result) => {
    if (err) return console.log("query error", err);
    console.log("The Table create successful\n", result);
  });
  db.execute(CT_PRODUCTS, (err, result) => {
    if (err) return console.log("query error", err);
    console.log("The Table create successful\n", result);
  });
  db.execute(CT_SALES, (err, result) => {
    if (err) return console.log("query error", err);
    console.log("The Table create successful\n", result);
  });
});

app.post("/tables/add_category", (req, res) => {
  // ADD COLUMN category IN PRODUCTS TABLE
  db.execute(ADD_COLUMN, (err, result) => {
    if (err) {
      console.log("err in database", err);
      res.status(400).json({ Error: err });
      return;
    }
    console.log("the column added successful", result);
    res.json("the column added successful");
  });
});

app.delete("/tables/delete_category", (req, res) => {
  // DELETE COLUMN category IN PRODUCTS TABLE
  db.execute(DROP_COLUMN, (err, result) => {
    if (err) {
      console.log("err in database", err);
      res.status(400).json({ message: err });
      return;
    }

    console.log("the column deleted successful", result);
    res.json("the column deleted successful");
  });
});

app.patch("/tables/update_contant_number", (req, res) => {
  // update contant_number column to varchar in suppliers table
  db.execute(update_column_CONTACT_NUMBER, (err, result) => {
    if (err) {
      console.log("err in database", err);
      res.status(400).json({ Error: err });
      return;
    }
    res.json("updeted successful");
    console.log("updeted successful");
  });
});

app.patch("/tables/update_product_name", (req, res) => {
  // update product_name column to not null in products table
  db.execute(update_column_PRODUCT_NAME, (err, reslut) => {
    if (err) {
      console.log("err in database", err);
      res.status(400).json({ Error: err });
      return;
    }
    res.json("updeted successful");
    console.log("updeted successful");
  });
});
/*Perform Basic Inserts: (0.5 Grade)
a. Add a supplier with the name 'FreshFoods' and contact number '01001234567'.
b. Insert the following three products, all provided by 'FreshFoods':
i. 'Milk' with a price of 15.00 and stock quantity of 50.
ii. 'Bread' with a price of 10.00 and stock quantity of 30.
iii. 'Eggs' with a price of 20.00 and stock quantity of 40.
c. Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'.
*/

app.post("/tables/insert_in_supplier", (req, res) => {
  const insert_in_supplier = `INSERT INTO SUPPLIERS (SUPPLIER_NAME,CONTACT_NUMBER) values(?,?);`;
  const { name, phone } = req.body;

  db.execute(insert_in_supplier, [name, phone], (err, result) => {
    if (err) {
      console.log("err in database", err);
      res.status(400).json({ Error: err });
      return;
    }
    res.json("inserting in supplier success", result);
    console.log("inserting in supplier success", result);
  });
});

app.post("/tables/insert_in_products", (req, res) => {
  const { name, price, quantity } = req.body;
  const insert_in_products = `INSERT INTO PRODUCTS (PRODUCT_NAME,PRICE,QUANTITY,SUPPLIER_ID) VALUES(?,?,?,1);`;
  db.execute(insert_in_products, [name, price, quantity], (err, result) => {
    if (err) {
      console.log("err in database", err);
      res.status(400).json({ Error: err });
      return;
    }
    res.json("inserting in products successful", result);
    console.log("inserting in products successful", result);
  });
});
app.post("/tables/insert_in_sales", (req, res) => {
  const { units, product_id, date } = req.body;
  const insert_in_sales = `INSERT INTO SALES (QUANTITY_SOLD,PRODUCT_ID,SALE_DATE) VALUES(?,?,?);`;
  db.execute(insert_in_sales, [units, product_id, date], (err, result) => {
    if (err) {
      console.log("err in database", err);
      res.status(400).json({ Error: err });
      return;
    }
    res.json("inserting in sale successful", result);
    console.log("inserting in sale successful", result);
  });
});
//7- Update the price of 'Bread' to 25.00. (0.5 Grade)

app.patch("/tables/update_bread", (req, res) => {
  const query = `UPDATE PRODUCTS SET PRICE =25 WHERE PRODUCT_NAME ='BREAD';`;

  db.execute(query, (err, result) => {
    if (err) {
      console.log("err in database", err);
      res.status(400).json({ Error: err });
      return;
    }
    res.json("Update the price of 'Bread' successful", result);
    console.log("Update the price of 'Bread' successful", result);
  });
});

//8- Delete the product 'Eggs'. (0.5 Grade)

app.delete("/tables/delete_eggs", (req, res) => {
  const query = `DELETE  FROM PRODUCTS WHERE PRODUCT_NAME="eggs";`;
  db.execute(query, (err, result) => {
    if (err) {
      console.log("err in database", err);
      res.status(400).json({ Error: err });
      return;
    }
    if (result.affectedRows === 0) {
      console.log("not found!");
      res.json("the item not found!!");
      return;
    }
    res.json("Delete the product 'Eggs' successful", result);
    console.log("Delete the product 'Eggs' successful", result);
  });
});

//9- Retrieve the total quantity sold for each product. (0.5 Grade)
app.get("/tables/products/quantity_sold", (req, res) => {
  const query = `SELECT products.PRODUCT_NAME, SUM(sales.QUANTITY_SOLD) AS total_sold
  FROM products
  JOIN sales
    ON products.PRODUCT_ID = sales.PRODUCT_ID
  GROUP BY products.PRODUCT_NAME;
  `;
  db.execute(query, (err, result) => {
    if (err) {
      console.log("err in database", err);
      res.status(400).json({ Error: err });
      return;
    }
    if (result.length == 0) {
      console.log("not found!");
      res.status(400).json("not found!");
      return;
    }
    res.json({
      message: "Get the total quantity sold for each product successful",
      result,
    });
    console.log(
      "get the total quantity sold for each product successful",
      result,
    );
  });
});
//10-Get the product with the highest stock. (0.5 Grade)

app.get("/tables/products/highest_stock", (req, res) => {
  const query = `SELECT PRODUCT_NAME FROM PRODUCTS WHERE QUANTITY= 
 (SELECT MAX(QUANTITY) FROM PRODUCTS); `;
  db.execute(query, (err, result) => {
    if (err) {
      console.log("err in database", err);
      res.status(400).json({ Error: err });
      return;
    }
    res.json({
      message: "Get the product with the highest stock successful",
      result,
    });
    console.log("Get the product with the highest stock successful", result);
  });
});
//11-Find suppliers with names starting with 'F'. (0.5 Grade)
app.get("/tables/suppliers/name_f", (req, res) => {
  const query = `SELECT SUPPLIER_NAME FROM SUPPLIERS WHERE SUPPLIER_NAME LIKE 'F%';`;
  db.execute(query, (err, result) => {
    if (err) {
      console.log("err in database", err);
      res.status(400).json({ Error: err });
      return;
    }
    if (result.length == 0) {
      console.log("not found!");
      res.status(400).json("not found!");
      return;
    }
    res.json({
      message: "Get suppliers with names starting with 'F' successful",
      result,
    });
    console.log("suppliers with names starting with 'F' successful", result);
  });
});
//12-Show all products that have never been sold. (0.5 Grade)
app.get("/tables/products/never_sold", (req, res) => {
  const query = `SELECT PRODUCT_NAME
  FROM products
  WHERE PRODUCT_ID NOT IN (
    SELECT PRODUCT_ID FROM sales
  );
  `;
  db.execute(query, (err, result) => {
    if (err) {
      console.log("err in database", err);
      res.status(400).json({ Error: err });
      return;
    }
    if (result.length == 0) {
      console.log("not found!");
      res.status(400).json("not found!");
      return;
    }
    res.json({
      message: "Get products that have never been sold successful",
      result,
    });
    console.log("products that have never been sold successful", result);
  });
});

//13-Get all sales along with product name and sale date. (0.5 Grad
app.get("/tables/sales/date_name", (req, res) => {
  const query = `SELECT sales.SALE_DATE ,products.PRODUCT_NAME FROM sales JOIN products ON sales.PRODUCT_ID=products.PRODUCT_ID;`;

  db.execute(query, (err, result) => {
    if (err) {
      console.log("err in database", err);
      res.status(400).json({ Error: err });
      return;
    }
    if (result.length == 0) {
      console.log("not found!");
      res.status(400).json("not found!");
      return;
    }
    res.json({
      message: "Get all sales along with product name and sale date successful",
      result,
    });
    console.log(
      "Get all sales along with product name and sale date successful",
      result,
    );
  });
});

app.post("/users/create", (req, res) => {
  const query1 = `CREATE USER 'store_manager'@'localhost' IDENTIFIED BY '123';`;

  const query2 = `GRANT SELECT, INSERT, UPDATE
  ON test.*
  TO 'store_manager'@'localhost'`;

  const query3 = `FLUSH PRIVILEGES;`;
  db.execute(query1, (err, result) => {
    if (err) {
      console.log("err in database", err);
      res.status(400).json({ Error: err });
      return;
    }
    res.json({
      message: "add user successful",
    });
    console.log("add user successful", result);
  });
  db.execute(query2);
  db.execute(query3);
});

//15-Revoke UPDATE permission from “store_manager”. (0.5 Grade)

app.patch("/users/revoke_update", (req, res) => {
  const query = `REVOKE UPDATE
  ON test.*
  FROM 'store_manager'@'localhost';
  `;
  db.execute(query, (err, result) => {
    if (err) {
      console.log("err in database", err);
      res.status(400).json({ Error: err });
      return;
    }
    res.json({
      message: "update user successful",
    });
    console.log("update user successful", result);
  });
});

//16-Grant DELETE permission to “store_manager” only on the Sales table. (0.5 Grade)
app.patch("/users/grant_delete", (req, res) => {
  const query = `GRANT DELETE
  ON test.sales
  TO 'store_manager'@'localhost';
  `;
  db.execute(query, (err, result) => {
    if (err) {
      console.log("err in database", err);
      res.status(400).json({ Error: err });
      return;
    }
    res.json({
      message: "grand update user successful",
    });
    console.log("grand update successful", result);
  });
});
app.listen(port, () => {
  console.log(`the server running on port ${port}`);
});
