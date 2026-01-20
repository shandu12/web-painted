import type { NextApiRequest, NextApiResponse } from "next";

// fake login
export default (req: NextApiRequest, res: NextApiResponse) => {
  const request = req.body;
  const { email } = request;
  const { password } = request;
  if (email === "johndoe@mail.com") {
    res.status(200).json({ name: "John Doe", email: ""});
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};
