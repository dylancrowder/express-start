import { Router } from "express";
import client from "prom-client";

const router = Router();

// Endpoint /metrics
router.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', client.register.contentType);
        res.end(await client.register.metrics());
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});


export default router;
