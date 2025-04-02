import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import MonacoEditor from "@monaco-editor/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";
import "bootstrap/dist/css/bootstrap.min.css";

const TextAndCodeEditor = ({ blocks, setBlocks }) => {
  const [isPreview, setIsPreview] = useState(false);

  // Load blocks from localStorage on mount
  useEffect(() => {
    const savedBlocks = JSON.parse(localStorage.getItem("blogBlocks")) || [];
    if (savedBlocks.length > 0) setBlocks(savedBlocks);
  }, [setBlocks]);

  // Save blocks to localStorage whenever they change
  useEffect(() => {
    if (blocks.length > 0) {
      localStorage.setItem("blogBlocks", JSON.stringify(blocks));
    }
  }, [blocks]);

  // Add a new text block
  const addTextBlock = () => {
    setBlocks([
      ...blocks,
      { id: Date.now(), type: "text", content: "<p></p>" },
    ]);
  };

  // Add a new code block
  const addCodeBlock = () => {
    setBlocks([
      ...blocks,
      {
        id: Date.now(),
        type: "code",
        content: "// Write your code here",
        language: "javascript",
      },
    ]);
  };

  // Add a new image block
  const addImageBlock = () => {
    setBlocks([...blocks, { id: Date.now(), type: "image", content: "" }]);
  };

  // Update block content
  const updateBlockContent = (id, newContent) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id ? { ...block, content: newContent } : block
      )
    );
  };

  // Delete a block
  const deleteBlock = (id) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Post Editor</h1>

      {/* Action Buttons */}
      <div className="mb-4">
        <button className="btn btn-primary mr-2" onClick={addTextBlock}>
          Add Text Block
        </button>
        <button className="btn btn-success mr-2" onClick={addCodeBlock}>
          Add Code Block
        </button>
        <button className="btn btn-info mr-2" onClick={addImageBlock}>
          Add Image Block
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setIsPreview(!isPreview)}
        >
          {isPreview ? "Edit" : "Preview"}
        </button>
      </div>

      {/* Edit Mode */}
      {!isPreview ? (
        <div className="flex flex-col gap-4">
          {blocks.map((block) => (
            <div key={block.id} className="card mb-3">
              <div className="card-header d-flex justify-content-between align-items-center">
                <strong>
                  {block.type === "text"
                    ? "Text Block"
                    : block.type === "code"
                    ? "Code Block"
                    : "Image Block"}
                </strong>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteBlock(block.id)}
                >
                  Delete
                </button>
              </div>
              <div className="card-body">
                {block.type === "text" ? (
                  <ReactQuill
                    value={block.content}
                    onChange={(content) =>
                      updateBlockContent(block.id, content)
                    }
                    theme="snow"
                  />
                ) : block.type === "code" ? (
                  <MonacoEditor
                    height="200px"
                    language={block.language || "javascript"}
                    value={block.content}
                    onChange={(content) =>
                      updateBlockContent(block.id, content || "")
                    }
                    options={{
                      theme: "vs-dark",
                      fontSize: 14,
                      minimap: { enabled: false },
                    }}
                  />
                ) : (
                  // Image Block - URL Input Only
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter image URL"
                      value={block.content}
                      onChange={(e) =>
                        updateBlockContent(block.id, e.target.value)
                      }
                    />
                    {block.content && (
                      <img
                        src={block.content}
                        alt="Image Preview"
                        className="img-fluid mt-2"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Preview Mode
        <div className="card">
          <div className="card-body">
            {blocks.map((block) =>
              block.type === "text" ? (
                <div
                  key={block.id}
                  className="prose mb-4"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(block.content),
                  }}
                />
              ) : block.type === "code" ? (
                <div key={block.id} className="mb-4">
                  <SyntaxHighlighter
                    language={block.language}
                    style={dracula}
                    showLineNumbers
                    wrapLines
                  >
                    {block.content}
                  </SyntaxHighlighter>
                </div>
              ) : (
                // Image Preview
                <div key={block.id} className="mb-4 text-center">
                  {block.content ? (
                    <img
                      src={block.content}
                      alt="User provided"
                      className="img-fluid"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    <p className="text-muted">No image URL provided.</p>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextAndCodeEditor;
