"use client";
import DOMPurify from "isomorphic-dompurify";

const SafeHtml = ({ html }: { html: string }) => {
  // Configure DOMPurify to allow iframe elements and necessary attributes
  const sanitizedHtml = DOMPurify.sanitize(html, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: [
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "src",
      "height",
      "width",
    ],
  });

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default SafeHtml;
