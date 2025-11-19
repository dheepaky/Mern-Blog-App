import express from "express";
import blogModel from "../models/blog.model.js";
import categoryModel from "../models/category.model.js";

const router = express.Router();

router.get("/sitemap.xml", async (req, res) => {
  try {
    const baseUrl = "https://blogwebapp.koyeb.app";
    // const baseUrl = "http://localhost:5000";

    const posts = await blogModel.find().sort({ updatedAt: -1 });
    const categories = await categoryModel.find().sort({ updatedAt: -1 });

    const staticUrls = ["/login", "/signup", "/blog"];
    const domainUrls = [""];

    const domainXml = domainUrls
      .map((path) => {
        return `
        <url>
          <loc>${baseUrl}${path}</loc>
          <changefreq>weekly</changefreq>
          <priority>1.0</priority>
        </url>`;
      })
      .join("");

    const staticXml = staticUrls
      .map((path) => {
        return `
        <url>
          <loc>${baseUrl}${path}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>`;
      })
      .join("");

    const postUrls = posts
      .map((p) => {
        return `
        <url>
          <loc>${baseUrl}/blog/${p.slug}</loc>
          <lastmod>${p.updatedAt.toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.9</priority>
        </url>`;
      })
      .join("");

    // category
    const categoryUrls = categories
      .map((c) => {
        return `
        <url>
          <loc>${baseUrl}/category/${c.slug}</loc>
          <lastmod>${c.updatedAt.toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>`;
      })
      .join("");

    const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${domainXml}
        ${staticXml}
        ${postUrls}
        ${categoryUrls}
      </urlset>
    `;

    res.header("Content-Type", "application/xml");
    res.send(sitemap.trim());
  } catch (err) {
    console.log(err);
    res.status(500).send("Error generating sitemap");
  }
});

export default router;
