import React from "react";
import DOMPurify from "dompurify";
import "react-quill-new/dist/quill.snow.css"; // Optional: For Quill-compatible styling

export default function ContentView({ content }) {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div className="ql-snow">
      <div
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  );
}
