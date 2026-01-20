import type { NextApiRequest, NextApiResponse } from "next";
import products from "@/utils/data/products";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const request = req.body;
  const { ids } = request;
  setTimeout(() => {
    const cartItems = products.filter((x) => ids.includes(x.id));
    res.status(200).json(cartItems);
  }, 200);
};