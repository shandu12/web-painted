import type { NextApiRequest, NextApiResponse } from "next";
import productsTypes from "@/utils/data/products-types";

export default  (_req: NextApiRequest, res: NextApiResponse) => {
  // fake loading time
  setTimeout(() => {
      res.status(200).json(productsTypes);
  }, 200);
};