"use client";

import { useState, useEffect } from "react";
// Make sure this path is correct for your project structure
import "/styles/linux-installation.css";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function LinuxInstallationPage() {
  const [markdownContent, setMarkdownContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/linux-installation/guide.md") // Ensure this file is in your /public directory
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch markdown file");
        }
        return response.text();
      })
      .then((text) => {
        setMarkdownContent(text);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching markdown:", error);
        setMarkdownContent(
          "# Error\n\nCould not load the installation guide. Please check the console for details.",
        );
        setLoading(false);
      });
  }, []);

  return (
    // The CSS file now controls the background color
    <main>
      <div className="container mx-auto px-4 py-16">
        <article className="prose lg:prose-xl mx-auto">
          {loading ? (
            <p className="text-white">Loading guide...</p>
          ) : (
            <Markdown remarkPlugins={[remarkGfm]}>{markdownContent}</Markdown>
          )}
        </article>
      </div>
    </main>
  );
}
