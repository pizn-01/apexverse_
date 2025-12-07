import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertTestimonialSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import { JSDOM } from "jsdom";

import nodemailer from "nodemailer";

async function sendEmailNotification(submission: any) {
  // Check if SMTP credentials are provided
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("⚠️ SMTP credentials missing. Skipping email sending.");
    console.log("📝 Submission details:", submission);
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email to admin
    await transporter.sendMail({
      from: `"ApexVerse Contact" <${process.env.SMTP_USER}>`, // Sender address
      to: "contact@apexverse.site", // List of receivers
      subject: `New Contact Form: ${submission.subject || "No subject"}`, // Subject line
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${submission.name} (<a href="mailto:${submission.email}">${submission.email}</a>)</p>
        <p><strong>Subject:</strong> ${submission.subject || "No subject"}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #ccc;">
          ${submission.message.replace(/\n/g, "<br>")}
        </blockquote>
      `,
    });

    console.log("✅ Email sent successfully to contact@apexverse.site");

    // Optional: Send auto-reply to user
    /*
    await transporter.sendMail({
      from: `"ApexVerse" <${process.env.SMTP_USER}>`,
      to: submission.email,
      subject: "We received your message!",
      html: `<p>Hi ${submission.name},</p><p>Thanks for reaching out. We'll get back to you shortly.</p>`
    });
    */

  } catch (error) {
    console.error("❌ Error sending email:", error);
    // Don't throw, so we don't fail the request completely if email service is down
  }
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

  // Health check endpoint to verify database connection
  app.get("/api/health", async (req, res) => {
    try {
      // Simple query to check database connection
      const result = await storage.getTestimonials();
      return res.json({
        status: "healthy",
        database: "connected",
        testimonialCount: result.length,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      console.error("Health check failed:", error);
      return res.status(500).json({
        status: "unhealthy",
        database: "disconnected",
        error: error.message
      });
    }
  });

  // Helper function to extract content from X (Twitter) posts using oEmbed
  async function extractXContent(url: string) {
    try {
      // Normalize URL - handle both twitter.com and x.com
      const normalizedUrl = url.replace('twitter.com', 'x.com');

      const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(normalizedUrl)}`;
      const response = await fetch(oembedUrl);

      if (!response.ok) {
        throw new Error(`oEmbed API returned ${response.status}. The tweet may be private or deleted.`);
      }

      const data = await response.json();

      // Extract author information
      const authorName = data.author_name || "Unknown";
      let authorHandle = null;

      if (data.author_url) {
        // Extract handle from URL like https://twitter.com/username
        const urlParts = data.author_url.split('/');
        authorHandle = '@' + urlParts[urlParts.length - 1];
      }

      // Parse HTML to extract tweet content
      let content = "";
      if (data.html) {
        // Use JSDOM to parse HTML on the server
        const dom = new JSDOM(data.html);
        const document = dom.window.document;

        // Try to extract the tweet text from the blockquote
        const blockquote = document.querySelector('blockquote');
        if (blockquote) {
          // Get all paragraph elements
          const paragraphs = blockquote.querySelectorAll('p');
          if (paragraphs.length > 0) {
            // The first paragraph usually contains the tweet text
            // Remove the link at the end (which is the tweet URL)
            const firstP = paragraphs[0];
            const link = firstP.querySelector('a');
            if (link) {
              link.remove();
            }
            content = firstP.textContent?.trim() || "";
          }
        }

        // Fallback: extract all text from blockquote
        if (!content && blockquote) {
          content = blockquote.textContent?.trim() || "";
          // Remove the timestamp and author info at the end
          const lines = content.split('\n').filter(line => line.trim());
          // Usually the last 2 lines are author and timestamp
          if (lines.length > 2) {
            content = lines.slice(0, -2).join(' ').trim();
          }
        }
      }

      console.log(`✅ Extracted X content from ${authorHandle || authorName}`);

      return {
        authorName,
        authorHandle,
        content,
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
