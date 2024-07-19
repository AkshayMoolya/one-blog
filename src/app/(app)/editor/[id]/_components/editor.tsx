"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

const Editor = ({ onChange, value }: any) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div>
      {mounted && (
        <ReactQuill modules={modules} onChange={onChange} value={value} />
      )}
    </div>
  );
};

export default Editor;
