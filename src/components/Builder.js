import dynamic from "next/dynamic";

// Dynamically import GrapesEditor with SSR disabled
const GrapesEditor = dynamic(() => import("../components/GrapesEditor"), {
  ssr: false,
});

export default function BuilderPage() {
  return (
    <div>
      <GrapesEditor />
    </div>
  );
}