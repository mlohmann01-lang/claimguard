import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertClaimSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/claims", async (req, res) => {
    try {
      const validatedData = insertClaimSchema.parse(req.body);
      const claim = await storage.createClaim(validatedData);
      res.status(201).json(claim);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid claim data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create claim" });
    }
  });

  app.delete("/api/claims/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteClaim(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Claim not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete claim" });
    }
  });
  
  app.get("/api/claims", async (req, res) => {
    try {
      const claims = await storage.getClaims();
      res.json(claims);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch claims" });
    }
  });

  app.get("/api/claims/recent", async (req, res) => {
    try {
      const claims = await storage.getRecentClaims(10);
      res.json(claims);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent claims" });
    }
  });

  app.get("/api/claims/flagged", async (req, res) => {
    try {
      const claims = await storage.getFlaggedClaims();
      res.json(claims);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch flagged claims" });
    }
  });

  app.get("/api/claims/:id", async (req, res) => {
    try {
      const claim = await storage.getClaim(req.params.id);
      if (!claim) {
        return res.status(404).json({ error: "Claim not found" });
      }
      res.json(claim);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch claim" });
    }
  });

  app.patch("/api/claims/:id/approve", async (req, res) => {
    try {
      const claim = await storage.updateClaimStatus(req.params.id, "approved");
      if (!claim) {
        return res.status(404).json({ error: "Claim not found" });
      }
      res.json(claim);
    } catch (error) {
      res.status(500).json({ error: "Failed to approve claim" });
    }
  });

  app.patch("/api/claims/:id/reject", async (req, res) => {
    try {
      const claim = await storage.updateClaimStatus(req.params.id, "rejected");
      if (!claim) {
        return res.status(404).json({ error: "Claim not found" });
      }
      res.json(claim);
    } catch (error) {
      res.status(500).json({ error: "Failed to reject claim" });
    }
  });

  app.patch("/api/claims/:id/submit", async (req, res) => {
    try {
      const claim = await storage.updateClaimStatus(req.params.id, "submitted");
      if (!claim) {
        return res.status(404).json({ error: "Claim not found" });
      }
      res.json(claim);
    } catch (error) {
      res.status(500).json({ error: "Failed to submit claim" });
    }
  });

  app.get("/api/plans", async (req, res) => {
    try {
      const plans = await storage.getPlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch plans" });
    }
  });

  app.get("/api/plans/:id", async (req, res) => {
    try {
      const plan = await storage.getPlan(req.params.id);
      if (!plan) {
        return res.status(404).json({ error: "Plan not found" });
      }
      res.json(plan);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch plan" });
    }
  });

  app.get("/api/rules", async (req, res) => {
    try {
      const rules = await storage.getValidationRules();
      res.json(rules);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch validation rules" });
    }
  });

  app.get("/api/validations/recent", async (req, res) => {
    try {
      const validations = await storage.getRecentValidations();
      res.json(validations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent validations" });
    }
  });

  app.get("/api/metrics", async (req, res) => {
    try {
      const metrics = await storage.getMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch metrics" });
    }
  });

  return httpServer;
}
