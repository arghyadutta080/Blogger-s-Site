import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImageResize } from "quill-image-resize-module-ts";
import BlotFormatter from "quill-blot-formatter";


Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/blotFormatter", BlotFormatter);


const TextEditor: React.FC = () => {
  const [htmlText, setHtmlText] = useState<string>("");

  var toolbarOptions = [                          // toolbar contains different tool to customize the text, image and video in the editor box
    ["bold", "italic", "underline", "strike"],  
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],             
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],   
    [{ indent: "-1" }, { indent: "+1" }],       
    [{ direction: "rtl" }],                     
    ["link", "image", "video"],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],        
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],            
  ];

  const modules = {
    toolbar: toolbarOptions,
    clipboard: { matchVisual: false },      // toggle to add extra line breaks when pasting HTML:
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
    blotFormatter: {},
  };

  const PrintHtmlText = () => {
    console.log(htmlText);
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        value={htmlText}
        onChange={setHtmlText}
        className=" h-auto w-3/4 border-2 border-red-700 m-10 flex flex-col"
      />
      <button
        onClick={() => PrintHtmlText()}
        className=" p-3 rounded-md border-2 border-blue-600"
      >
        Print
      </button>
    </div>
  );
};

export default TextEditor;
