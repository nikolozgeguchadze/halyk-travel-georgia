import { Router } from "express";
import branches from "../data/branches.json" with { type: "json" };
import faq from "../data/faq.json" with { type: "json" };
import store from "../store.js";

const router = Router();

// Mid-market reference rates for the demo conversion model (F2).
const RATE_KZT_USD = 0.00185;
const RATE_USD_GEL = 2.7;
const DOUBLE_CONVERSION_SPREAD = [0.03, 0.025]; // KZT->USD leg, USD->GEL leg
const DIRECT_CONVERSION_SPREAD = 0.015; // KZT->GEL, single hop

const MOCK_TRANSACTIONS = [
  { id: "t1", merchant: "Air Astra", category: "flight_ticket", amountKzt: 210000, date: "2026-08-18" },
  { id: "t2", merchant: "Magnum", category: "groceries", amountKzt: 18500, date: "2026-08-15" },
  { id: "t3", merchant: "Booking.com — Tbilisi", category: "hotel", amountKzt: 340000, date: "2026-08-19" },
];

router.get("/status/:clientId", (req, res) => {
  res.json(store.getStatus(req.params.clientId));
});

router.post("/activate", (req, res) => {
  const { clientId, consent } = req.body ?? {};
  if (!clientId) return res.status(400).json({ error: "clientId is required" });
  if (consent !== true) {
    return res.status(400).json({ error: "Explicit opt-in consent is required to activate travel mode" });
  }
  res.json(store.activate(clientId, consent));
});

router.post("/deactivate", (req, res) => {
  const { clientId } = req.body ?? {};
  if (!clientId) return res.status(400).json({ error: "clientId is required" });
  res.json(store.deactivate(clientId));
});

router.get("/branches", (_req, res) => {
  res.json(branches);
});

router.get("/faq", (req, res) => {
  const lang = req.query.lang === "kk" ? "kk" : "ru";
  res.json(faq[lang]);
});

router.post("/convert", (req, res) => {
  const amountKzt = Number(req.body?.amountKzt);
  if (!Number.isFinite(amountKzt) || amountKzt <= 0) {
    return res.status(400).json({ error: "amountKzt must be a positive number" });
  }

  const fairGel = amountKzt * RATE_KZT_USD * RATE_USD_GEL;
  const [leg1, leg2] = DOUBLE_CONVERSION_SPREAD;
  const doubleConversionGel = fairGel * (1 - leg1) * (1 - leg2);
  const directGel = fairGel * (1 - DIRECT_CONVERSION_SPREAD);
  const savingsGel = directGel - doubleConversionGel;
  const savingsPct = (savingsGel / doubleConversionGel) * 100;

  res.json({
    amountKzt,
    fairMarketGel: round2(fairGel),
    doubleConversion: { gel: round2(doubleConversionGel), route: "KZT → USD → GEL" },
    directConversion: { gel: round2(directGel), route: "KZT → GEL" },
    savings: { gel: round2(savingsGel), pct: round2(savingsPct) },
  });
});

router.get("/transactions/:clientId", (req, res) => {
  const status = store.getStatus(req.params.clientId);
  const transactions = MOCK_TRANSACTIONS.map((t) => ({
    ...t,
    travelTrigger: t.category === "flight_ticket" || t.category === "hotel",
  }));
  const suggestion = !status.active && transactions.some((t) => t.travelTrigger)
    ? {
        show: true,
        reason: "Обнаружена покупка авиабилета/бронь отеля в Грузию",
        message: "Похоже, вы собираетесь в Грузию. Активировать режим «Еду в Грузию», чтобы избежать двойной конвертации и ложных блокировок?",
      }
    : { show: false };

  res.json({ transactions, suggestion });
});

function round2(n) {
  return Math.round(n * 100) / 100;
}

export default router;
