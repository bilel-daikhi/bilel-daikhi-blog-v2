import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import MonacoEditor from "@monaco-editor/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";
import "bootstrap/dist/css/bootstrap.min.css";

const TextAndCodeEditor = ({blocks,setBlocks}) => {

  const [isPreview, setIsPreview] = useState(false);

  // Load saved blocks from localStorage on mount
  useEffect(() => {
    const savedBlocks = JSON.parse(localStorage.getItem("blogBlocks")) || [];
    setBlocks(savedBlocks);
    console.log('savedBlocks: '+savedBlocks)
  }, []);

  // Save blocks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("blogBlocks", JSON.stringify(blocks));
  }, [blocks]);

  // Add a new text block
  const addTextBlock = () => {
    setBlocks([...blocks, { id: Date.now(), type: "text", content: "<p></p>" }]);
  };

  // Add a new code block
  const addCodeBlock = () => {
    setBlocks([
      ...blocks,
      { id: Date.now(), type: "code", content: "// Write your code here", language: "javascript" },
    ]);
  };

  // Update block content
  const updateBlockContent = (id, newContent) => {
    const updatedBlocks = blocks.map((block) =>
      block.id === id ? { ...block, content: newContent } : block
    );
    setBlocks(updatedBlocks);
  };

  // Delete a block
  const deleteBlock = (id) => {
    const updatedBlocks = blocks.filter((block) => block.id !== id);
    setBlocks(updatedBlocks);
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
        <button className="btn btn-secondary" onClick={() => setIsPreview(!isPreview)}>
          {isPreview ? "Edit" : "Preview"}
        </button>
      </div>

      {/* Edit Mode */}
      {!isPreview ? (
        <div className="flex flex-col gap-4">
          {blocks.map((block, index) => (
            <div key={block.id} className="card mb-3">
              <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                  <strong>{block.type === "text" ? "Text Block" : "Code Block"}</strong>
                </div>
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
                    onChange={(content) => updateBlockContent(block.id, content)}
                    theme="snow"
                  />
                ) : (
                  <MonacoEditor
                    height="200px"
                    language={block.language}
                    value={block.content}
                    onChange={(content) => updateBlockContent(block.id, content || "")}
                    options={{
                      theme: "vs-dark",
                      fontSize: 14,
                      minimap: { enabled: false },
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Preview Mode (Full Article)
        <div className="card">
          <div className="card-body">
            {blocks.map((block, index) =>
              block.type === "text" ? (
                <div
                  key={block.id}
                  className="prose mb-4"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(block.content) }}
                />
              ) : (
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
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextAndCodeEditor;