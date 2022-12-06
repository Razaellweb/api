const Cart = require("../models/Cart");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  console.log(req.body)
  try {
    const newCart = await Cart.create({
      user: req.body.user,
      products: req.body.products,
      status: false
    })
    if(newCart) {
      res.json(newCart)
    }
    else {
      res.json("Problem Adding To Cart")
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $push: { products: req.body.product },
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/edit/:id", async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        products: req.body.product 
      }
          );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:name", async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.params.name });
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET USER CART
router.get("/find/:name",  async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.name });
    res.status(200).json(cart);
  } catch {
    res.status(500).json(0);
  }
});

router.get("/findmycart/:name",  async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.name });
    res.status(200).json(cart._id);
  } catch {
    res.status(500).json(0);
  }
});

// //GET ALL

router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
