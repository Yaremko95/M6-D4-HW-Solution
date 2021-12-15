import Product from "./product.js";
import Review from "./reviews.js";

//hasMany
//belongsTo

Product.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Product, { onDelete: "CASCADE" });

export { Product, Review };
