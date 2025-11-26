import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertTestimonialSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";

async function sendEmailNotification(submission: any) {
  // Email notification logic
  // In production, this would use a service like SendGrid, AWS SES, or Nodemailer
  // For now, we'll log the notification details
  console.log("📧 New Contact Form Submission:");
  console.log(`Name: ${submission.name}`);
  console.log(`Email: ${submission.email}`);
  console.log(`Subject: ${submission.subject || "No subject"}`);
  console.log(`Message: ${submission.message}`);
  console.log("---");

  // In production, you would:
  // 1. Configure email service (e.g., nodemailer with SMTP)
  // 2. Send email to contact@apexverse.com
  // 3. Optionally send confirmation email to the submitter

  // Example production code:
  // await emailService.send({
  //   to: "contact@apexverse.com",
  //   subject: `New Contact Form: ${submission.subject || "No subject"}`,
  //   html: `<h2>New Contact Form Submission</h2>
  //          <p><strong>From:</strong> ${submission.name} (${submission.email})</p>
  //          <p><strong>Message:</strong></p>
  //          <p>${submission.message}</p>`
  // });
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validationResult = insertContactSubmissionSchema.safeParse(req.body);

      if (!validationResult.success) {
        const validationError = fromError(validationResult.error);
        return res.status(400).json({
          error: validationError.toString()
        });
      }

      const submission = await storage.createContactSubmission(validationResult.data);

      // Send email notification asynchronously (don't block response)
      sendEmailNotification(submission).catch(err => {
        console.error("Failed to send email notification:", err);
        // Don't fail the request if email fails
      });

      return res.status(201).json(submission);
    } catch (error) {
      console.error("Error creating contact submission:", error);
      return res.status(500).json({
        error: "Failed to submit contact form. Please try again."
      });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      return res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      return res.status(500).json({
        error: "Failed to fetch submissions"
      });
    }
  });

  // Helper function to extract content from X (Twitter) posts using oEmbed
  async function extractXContent(url: string) {
    try {
      const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}`;
      const response = await fetch(oembedUrl);

      if (!response.ok) {
        throw new Error(`oEmbed API returned ${response.status}`);
      }

      const data = await response.json();
      return {
        authorName: data.author_name || "Unknown",
        authorHandle: data.author_url ? data.author_url.split('/').pop() : null,
        html: data.html || "",
      };
    } catch (error) {
      console.error("Error extracting X content:", error);
      return null;
    }
  }

  // Helper function to extract content from Instagram posts using oEmbed
  async function extractInstagramContent(url: string) {
    try {
      // Note: Instagram's oEmbed API requires authentication via Facebook Graph API
      // This is a limitation of Instagram's API as of 2024
      // For now, we'll attempt the public endpoint and provide helpful error messages

      const response = await fetch(`https://api.instagram.com/oembed?url=${encodeURIComponent(url)}`);

      // Check if response is HTML (error page) instead of JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        throw new Error('Instagram API requires authentication. Please enter details manually.');
      }

      if (!response.ok) {
        throw new Error(`Instagram oEmbed API returned ${response.status}`);
      }

      const data = await response.json();

      // Extract author name from author_name or title
      const authorName = data.author_name || "Unknown";
      const authorHandle = data.author_url ? '@' + data.author_url.split('/').filter(Boolean).pop() : null;

      // Try to extract caption from title (Instagram includes it there)
      let content = "";
      if (data.title) {
        // Instagram titles often include username and caption
        const titleParts = data.title.split(' on Instagram: ');
        content = titleParts.length > 1 ? titleParts[1].replace(/"/g, '') : data.title;
      }

      return {
        authorName,
        authorHandle,
        content,
        imageUrl: data.thumbnail_url || null,
      };
    } catch (error) {
      console.error("Error extracting Instagram content:", error);

      // Provide more helpful error message
      if (error instanceof Error && error.message.includes('Unexpected token')) {
        throw new Error('Instagram API is not accessible without authentication. Please enter the testimonial details manually.');
      }

      throw error;
    }
  }


  // Testimonials routes
  app.post("/api/testimonials", async (req, res) => {
    try {
      const validationResult = insertTestimonialSchema.safeParse(req.body);

      if (!validationResult.success) {
        const validationError = fromError(validationResult.error);
        return res.status(400).json({
          error: validationError.toString()
        });
      }

      const testimonial = await storage.createTestimonial(validationResult.data);

      console.log("✨ New Testimonial Added:");
      console.log(`Platform: ${testimonial.platform}`);
      console.log(`Author: ${testimonial.authorName}`);
      console.log(`URL: ${testimonial.postUrl}`);
      console.log("---");

      return res.status(201).json(testimonial);
    } catch (error) {
      console.error("Error creating testimonial:", error);
      return res.status(500).json({
        error: "Failed to create testimonial. Please try again."
      });
    }
  });

  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      return res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return res.status(500).json({
        error: "Failed to fetch testimonials"
      });
    }
  });

  app.delete("/api/testimonials/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteTestimonial(id);

      if (!deleted) {
        return res.status(404).json({
          error: "Testimonial not found"
        });
      }

      return res.status(200).json({ message: "Testimonial deleted successfully" });
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      return res.status(500).json({
        error: "Failed to delete testimonial"
      });
    }
  });

  // X oEmbed extraction endpoint (helper for admin interface)
  app.post("/api/testimonials/extract-x", async (req, res) => {
    try {
      const { url } = req.body;

      if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: "URL is required" });
      }

      const extracted = await extractXContent(url);

      if (!extracted) {
        return res.status(400).json({
          error: "Failed to extract content from X post. Please verify the URL is valid."
        });
      }

      return res.json(extracted);
    } catch (error) {
      console.error("Error in X extraction endpoint:", error);
      return res.status(500).json({
        error: "Failed to extract content"
      });
    }
  });

  // Instagram oEmbed extraction endpoint (helper for admin interface)
  app.post("/api/testimonials/extract-instagram", async (req, res) => {
    try {
      const { url } = req.body;

      if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: "URL is required" });
      }

      const extracted = await extractInstagramContent(url);

      if (!extracted) {
        return res.status(400).json({
          error: "Failed to extract content from Instagram post. Please verify the URL is valid and the post is public."
        });
      }

      return res.json(extracted);
    } catch (error) {
      console.error("Error in Instagram extraction endpoint:", error);
      return res.status(500).json({
        error: "Failed to extract content"
      });
    }
  });



  const httpServer = createServer(app);

  return httpServer;
}
