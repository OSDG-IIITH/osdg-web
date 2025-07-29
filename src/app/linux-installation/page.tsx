"use client";

import { useState, useEffect } from "react";
// Make sure this path is correct for your project structure
import "/styles/linux-installation.css";

export default function LinuxInstallationPage() {
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the HTML file directly
    fetch("/linux-installation/fedora.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch HTML file");
        }
        return response.text();
      })
      .then((text) => {
        setHtmlContent(text);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching HTML:", error);
        // Provide a basic HTML error message
        setHtmlContent(
          "<h1>Error</h1><p>Could not load the installation guide. Please check the console for details.</p>",
        );
        setLoading(false);
      });
  }, []);

  return (
    // The CSS file now controls the background color
    <main>
      <div className="container mx-auto px-4 py-16">
        {/* The `prose` classes from Tailwind CSS can still be useful for styling raw HTML */}
        <article className="prose lg:prose-xl mx-auto">
          {loading ? (
            <p className="text-white">Loading guide...</p>
          ) : (
            <div
              // Use dangerouslySetInnerHTML to render the HTML content from state
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          )}
        </article>
      </div>
    </main>
  );
}