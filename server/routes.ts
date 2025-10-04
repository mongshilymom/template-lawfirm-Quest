import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/practice-areas", async (_req, res) => {
    try {
      const practiceAreas = await storage.getPracticeAreas();
      res.json(practiceAreas);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch practice areas" });
    }
  });

  app.get("/api/news", async (_req, res) => {
    try {
      const newsItems = await storage.getNewsItems();
      res.json(newsItems);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news items" });
    }
  });

  app.get("/api/newsletters", async (_req, res) => {
    try {
      const newsletters = await storage.getNewsletters();
      res.json(newsletters);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch newsletters" });
    }
  });

  app.get("/api/attorneys", async (_req, res) => {
    try {
      const attorneys = await storage.getAttorneys();
      res.json(attorneys);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch attorneys" });
    }
  });

  app.get("/api/offices", async (_req, res) => {
    try {
      const offices = await storage.getOffices();
      res.json(offices);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch offices" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
