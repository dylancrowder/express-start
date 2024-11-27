import { Router } from "express";
import { ArticleController } from "../controllers/articles.controllers";

const router = Router();

router.post("/create-article", ArticleController.create);
router.get("/find-all", ArticleController.findAll);
router.post("/find-one", ArticleController.findByID);
router.delete("/delete-one", ArticleController.deleteByID);
router.put("/update-one", ArticleController.updateByID);

export default router;
