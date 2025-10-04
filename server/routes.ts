import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriptionSchema, insertContactSchema, insertConsultationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/robots.txt", (_req, res) => {
    res.type("text/plain");
    res.send(`User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${_req.protocol}://${_req.get('host')}/api/sitemap.xml`);
  });

  app.get("/api/sitemap.xml", async (_req, res) => {
    try {
      const baseUrl = `${_req.protocol}://${_req.get('host')}`;
      const practiceAreas = await storage.getPracticeAreas();
      const newsItems = await storage.getNewsItems();
      const events = await storage.getEvents();
      const attorneys = await storage.getAttorneys();
      
      const staticPages = [
        { url: '/', priority: '1.0', changefreq: 'daily' },
        { url: '/about', priority: '0.8', changefreq: 'monthly' },
        { url: '/practice-areas', priority: '0.9', changefreq: 'weekly' },
        { url: '/news', priority: '0.8', changefreq: 'daily' },
        { url: '/events', priority: '0.7', changefreq: 'weekly' },
        { url: '/attorneys', priority: '0.7', changefreq: 'weekly' },
        { url: '/contact', priority: '0.6', changefreq: 'monthly' },
      ];

      const dynamicPages = [
        ...practiceAreas.map(pa => ({
          url: `/practice-areas/${pa.id}`,
          priority: '0.7',
          changefreq: 'monthly' as const
        })),
        ...newsItems.map(news => ({
          url: `/news/${news.id}`,
          priority: '0.6',
          changefreq: 'monthly' as const
        })),
        ...events.map(event => ({
          url: `/events/${event.id}`,
          priority: '0.5',
          changefreq: 'monthly' as const
        })),
        ...attorneys.map(attorney => ({
          url: `/attorneys/${attorney.id}`,
          priority: '0.5',
          changefreq: 'monthly' as const
        })),
      ];

      const allPages = [...staticPages, ...dynamicPages];

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

      res.type("application/xml");
      res.send(sitemap);
    } catch (error) {
      console.error('[SITEMAP] Error generating sitemap:', error);
      res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><error>Failed to generate sitemap</error>');
    }
  });

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

  app.get("/api/events", async (_req, res) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.post("/api/subscriptions", async (req, res) => {
    try {
      const validatedData = insertSubscriptionSchema.parse(req.body);
      
      console.log('[SUBSCRIPTION] New subscription request:', {
        timestamp: new Date().toISOString(),
        email: validatedData.email,
      });
      
      const subscription = await storage.createSubscription(validatedData);
      
      console.log('[SUBSCRIPTION] Subscription created successfully:', {
        timestamp: new Date().toISOString(),
        subscriptionId: subscription.id,
        email: subscription.email,
      });
      
      res.status(201).json(subscription);
    } catch (error) {
      console.error('[SUBSCRIPTION] Error processing subscription:', {
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
        email: req.body?.email,
      });
      
      if (error instanceof Error) {
        if (error.message === 'Email already subscribed') {
          res.status(409).json({ error: "This email is already subscribed" });
        } else {
          res.status(400).json({ error: error.message });
        }
      } else {
        res.status(500).json({ error: "Failed to create subscription" });
      }
    }
  });

  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      
      console.log('[CONTACT] New contact submission:', {
        timestamp: new Date().toISOString(),
        email: validatedData.email,
        subject: validatedData.subject,
        hasPhone: !!validatedData.phone,
        hasCompany: !!validatedData.company,
      });
      
      const contact = await storage.createContact(validatedData);
      
      console.log('[CONTACT] Contact saved successfully:', {
        timestamp: new Date().toISOString(),
        contactId: contact.id,
        email: contact.email,
      });
      
      res.status(201).json(contact);
    } catch (error) {
      console.error('[CONTACT] Error processing contact:', {
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
        body: req.body,
      });
      
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });

  app.post("/api/consultation", async (req, res) => {
    try {
      const validatedData = insertConsultationSchema.parse(req.body);
      
      console.log('[CONSULTATION] New consultation request:', {
        timestamp: new Date().toISOString(),
        email: validatedData.email,
        subject: validatedData.subject,
        hasPhone: !!validatedData.phone,
        hasCompany: !!validatedData.company,
      });
      
      const consultation = await storage.createConsultation(validatedData);
      
      const confirmationUrl = `${req.protocol}://${req.get('host')}/api/confirm?token=${consultation.token}`;
      
      console.log('[CONSULTATION] Consultation created - Double opt-in required:', {
        timestamp: new Date().toISOString(),
        consultationId: consultation.id,
        email: consultation.email,
        status: consultation.status,
        confirmationUrl,
      });
      
      console.log('[EMAIL-SIMULATION] Would send confirmation email to:', {
        to: consultation.email,
        subject: 'Please confirm your consultation request',
        confirmationUrl,
      });
      
      res.status(201).json({
        id: consultation.id,
        status: consultation.status,
        message: 'Consultation request received. Please check your email to confirm.',
      });
    } catch (error) {
      console.error('[CONSULTATION] Error processing consultation:', {
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
        body: req.body,
      });
      
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to create consultation request" });
      }
    }
  });

  app.get("/api/confirm", async (req, res) => {
    try {
      const { token } = req.query;
      
      if (!token || typeof token !== 'string') {
        return res.status(400).json({ error: 'Invalid confirmation token' });
      }
      
      console.log('[CONFIRMATION] Confirmation attempt:', {
        timestamp: new Date().toISOString(),
        token,
      });
      
      const consultation = await storage.confirmConsultation(token);
      
      console.log('[CONFIRMATION] Consultation confirmed successfully:', {
        timestamp: new Date().toISOString(),
        consultationId: consultation.id,
        email: consultation.email,
        status: consultation.status,
        confirmedAt: consultation.confirmedAt,
      });
      
      res.status(200).json({
        success: true,
        message: 'Consultation confirmed successfully. We will contact you soon.',
        consultation: {
          id: consultation.id,
          email: consultation.email,
          status: consultation.status,
          confirmedAt: consultation.confirmedAt,
        },
      });
    } catch (error) {
      console.error('[CONFIRMATION] Error confirming consultation:', {
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
        token: req.query.token,
      });
      
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to confirm consultation" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
