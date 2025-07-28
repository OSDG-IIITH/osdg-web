"use client";

import { useState, useEffect } from "react";
import "/styles/linux-installation.css"; // Ensure this path is correct
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function LinuxInstallationPage() {
  const [markdownContent, setMarkdownContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the markdown file from the public directory
    fetch("/linux-installation/linux-installation.md")
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
    // The main background color is now handled by the imported CSS file
    <main>
      {/* Removed responsive padding classes, as they are now in the CSS */}
      <div className="container mx-auto py-16">
        <article className="prose lg:prose-xl mx-auto">
          {loading ? (
            <p>Loading guide...</p>
          ) : (
            <Markdown remarkPlugins={[remarkGfm]}>{markdownContent}</Markdown>
          )}
        </article>
      </div>
    </main>
  );
}
