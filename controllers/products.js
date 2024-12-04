const Product = require("../models/products");
const getAllProducts = async (req, res) => {

  const {company, name, featured, sort, select} = req.query;
  const queryObject = {};

  if(company) {
    queryObject.company = company;
  }
  
  if(name) {
    queryObject.name = {$regex: name, $options: "i"};
  }

  if(featured) {
    queryObject.featured = featured;
  }

  let apiData = Product.find(queryObject);

  if(sort) {
    let sortFix = sort.replace(",", " ")
    apiData = apiData.sort(sortFix);
    
  }

  if(select) {
    let selectFix = select.replace(",", " ")
    apiData = apiData.select(selectFix);
    console.log(apiData);
    
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 3;
  let skip = (page - 1) * limit; // page = 2, limit = 3 , skip = 1 * 3 = 3(prePage Se Skip)

  apiData = apiData.skip(skip).limit(limit);

  console.log(queryObject);

  const Products = await apiData;
  console.log(
    "🚀 ~ file: products.js ~ line 10 ~ getAllProductsTesting ~ req.query",
    req.query
  );
  res.status(200).json({ Products, nbHits: Products.length });
};

const getAllProductsTesting = async (req, res) => {
  const Products = await Product.find(req.query).select("price name");
  
  console.log(
    "🚀 ~ file: products.js ~ line 10 ~ getAllProductsTesting ~ req.query",
    req.query
  );
  res.status(200).json({ Products });
};

module.exports = { getAllProducts, getAllProductsTesting };
