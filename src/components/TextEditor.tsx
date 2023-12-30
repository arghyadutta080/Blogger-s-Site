import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor: React.FC = () => {
  const [value, setValue] = useState("");

  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    ["link", "image"],[
      // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      { header: [1, 2, 3, 4, 5, 6, false] }
    ],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const modules = {
    toolbar: toolbarOptions
  }

  const PrintValue = () => {
    console.log(value);
  }

  return (
    <div>
      <ReactQuill theme="snow" modules={modules} value={value} onChange={setValue} className=" h-52 w-2/3 border-2 border-red-700 m-10 flex flex-col"/>;
      <button onClick={() => PrintValue()} >Print</button>
    </div>
  ); 
};

export default TextEditor;
