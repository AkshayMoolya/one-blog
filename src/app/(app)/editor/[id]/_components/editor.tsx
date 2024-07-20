"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactQuill from "react-quill";
import "../style.css";

import "react-quill/dist/quill.snow.css";

const Editor = ({ onChange, value }: any) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // Header sizes
      ["bold", "italic", "underline", "strike"], // Text formatting
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      [{ indent: "-1" }, { indent: "+1" }], // Indentation
      [{ align: [] }], // Text alignment
      ["link", "image", "video"], // Links, images, and videos
      [{ color: [] }, { background: [] }], // Text color and background color
      ["blockquote", "code-block"], // Blockquote and code block
      ["clean"], // Clear formatting
      [{ font: [] }], // Font selection
    ],
  };

  return (
    <div>
      {mounted && (
        <ReactQuill
          modules={modules}
          onChange={onChange}
          value={value}
          className="custom-editor"
        />
      )}
    </div>
  );
};

export default Editor;
