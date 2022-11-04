const express = require('express');
const app = express();
const port = process.env.PORT || 3200;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const orders = [];

/**
 * creating a New order http://localhost:3200/
 */

app.post("/new_order", (req, res) => {
  const order = req.body;

  if (order.food_name || order.customer_name || order.food_qty) {
    orders.push({
      ...order,
      id: orders.length + 1,
      date: Date.now().toString()
    });
    console.log();
    res.status(200).json({
      message: "Order created successfully"
    });
  } else {
    res.status(401).json({
      message: "Invalid Order creation"
    });
  }
});
/**
 *  Getting All orders
 */

 app.get("/get_orders", (req, res) => {
   res.status(200).send(orders);
 });
 
 app.get("/", (req, res) => {
   res.status(200).send("hi the app is running");
 });

 /**
 * Update order
 */
app.patch("/order/:id", (req, res) => {
   const order_id = req.params.id;
   const order_update = req.body;
   for (let order of orders) {
     if (order.id == order_id) {
       if (order_update.food_name != null || undefined)
         order.food_name = order_update.food_name;
       if (order_update.food_qty != null || undefined)
         order.food_qty = order_update.food_qty;
       if (order_update.customer_name != null || undefined)
         order.customer_name = order_update.customer_name;
 
       return res
         .status(200)
         .json({ message: "Updated Succesfully", data: order });
     }
   }
 
   res.status(404).json({ message: "Invalid Order Id" });
 });

 /**
 * Delete Order
 */
app.delete("/order/:id", (req, res) => {
   const order_id = req.params.id;
 
   for (let order of orders) {
     if (order.id == order_id) {
       orders.splice(orders.indexOf(order), 1);
 
       return res.status(200).json({
         message: "Deleted Successfully"
       });
     }
   }
   res.status(404).json({ message: "Invalid Order Id" });
});
app.listen(port, () => {
   console.log(`running at port ${port}`);
});

