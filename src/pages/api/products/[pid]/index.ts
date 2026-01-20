import type { NextApiRequest, NextApiResponse } from "next";
import products from "@/utils/data/products";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { pid },
  } = req;
  setTimeout(() => {
    const product = products.find((x) => x.id === pid);
    if (product === undefined) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  }, 200);
};