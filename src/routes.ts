import { Router } from "express";
import checkPalindromeService from "./services/checkpalindrome.service";

const routes = Router();

routes.get("/api/check-palindrome", async (req, res) => {
  try {
    res.json(checkPalindromeService(req.query.palindrome as string));
  } catch (error) {
    console.error(error);
    res.status(400).json({ result: null, error: error.message });
  }
});

export default routes;
