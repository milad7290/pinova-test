import _ from "lodash";
// import formidable from 'formidable'
import { mdb } from "../server";
import assert from "assert";

const productByID = (req, res, next, id) => {
  // Product.findById(id).exec((err, product) => {
  //   if (err || !product)
  //     return res.status('400').json({
  //       error: "Product not found"
  //     })
  //   req.product = product
  //   next()
  // })
};

const read = (req, res) => {
  // return res.json(req.product)
};

const create = (req, res) => {
  const name = req.body.name;
  const price = parseInt(req.body.price, 10);
  const quantity = parseInt(req.body.quantity, 10);
  mdb.collection("products").insertOne(
    {
      name: name,
      price: price,
      quantity: quantity,
      createdDate: new Date()
    },
    (err, response) => {
      if (err) {
        console.error(err);
        res.status(404).send({ error: "Bad Request" });
      } else {
        res.send({
          addedProduct: response.ops[0]
        });
      }
    }
  );
};

const List = (req, res) => {
  let products = [];
  mdb
    .collection("products")
    .find({})
    .each((err, product) => {
      assert.equal(null, err);
      if (!product) {
        // no more products
        res.send({
          products
        });
        return;
      }

      products.push(product);
    });
};

export default {
  productByID,
  read,
  create,
  List
};
