import type { NextApiRequest, NextApiResponse } from "next";
import products from "@/utils/data/products";

export default (_req: NextApiRequest, res: NextApiResponse) => {
  // fake loading time
  setTimeout(() => {
    // category is checked to not be news as news is a fake category which just filters some arbitrary products
    if (_req.query.category && _req.query.category !== "News") {
      const category = _req.query.category as string;
      const filteredProducts = products.filter((x) => x.category === category);
      return res.status(200).json(filteredProducts);
    } else if (_req.query.category === "News") {
      const newsProducts = products.slice(0, 4);
      return res.status(200).json(newsProducts);
    } else if (_req.query.search) {
      const search = _req.query.search as string;
      const filteredProducts = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
      return res.status(200).json(filteredProducts);
    } else {
      res.status(200).json(products);
    }
  }, 200);
};