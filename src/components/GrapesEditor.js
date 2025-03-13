import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import grapesjsPresetWebpage from "grapesjs-preset-webpage";
import grapesjsStyleBg from "grapesjs-style-bg";
import grapesjsCustomCode from "grapesjs-custom-code";
import Header from "./Header";
import BlockSidebar from "./BlockSidebar";
import Body from "./Body";
import "../styles/builder.css"; // Ensure this import is correct

const GrapesEditor = () => {
  const editorRef = useRef(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false); // Track sidebar visibility
  const [editor, setEditor] = useState(null); // State to hold the editor instance

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  const toggleSidebarVisibility = (shouldHide) => {
    setIsSidebarHidden(shouldHide);
  };

  useEffect(() => {
    if (!editorRef.current) {
      const editorInstance = grapesjs.init({
        container: "#gjs",
        height: "calc(100vh - 64px)",
        width: isSidebarExpanded ? "calc(100% - 250px)" : "100%",
        fromElement: true,
        storageManager: false,
        plugins: [grapesjsPresetWebpage, grapesjsStyleBg, grapesjsCustomCode],
        pluginsOpts: {
          grapesjsPresetWebpage: {},
          grapesjsStyleBg: {},
          grapesjsCustomCode: {},
        },
        blockManager: {
          appendTo: "#blocks-container",
        },
        panels: {
          defaults: [],
        },
        assetManager: {
          embedAsBase64: true,
          upload: false,
          autoAdd: true,
        },
      });

      editorRef.current = editorInstance;
      setEditor(editorInstance); // Set the editor state
    }
  }, [isSidebarExpanded]);

  return (
    <div>
      <Header
        editor={editor}
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
        toggleSidebarVisibility={toggleSidebarVisibility} // Pass the toggleSidebarVisibility function
      />
      <BlockSidebar
        isSidebarExpanded={isSidebarExpanded}
        isSidebarHidden={isSidebarHidden} // Pass the isSidebarHidden state
        toggleSidebar={toggleSidebar}
      />
      <Body isSidebarExpanded={isSidebarExpanded} />
    </div>
  );
};

export default GrapesEditor;