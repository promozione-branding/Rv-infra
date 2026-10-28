"use client";
import { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import {
  Bold, Italic, Underline as UnderlineIcon, Heading2, Heading3, List, ListOrdered,
  Quote, Link2, ImagePlus, Minus, Undo2, Redo2,
} from "lucide-react";

function Btn({ active, onClick, title, disabled, children }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()} // keep editor focus
      onClick={onClick}
      className={`rounded p-1.5 transition disabled:opacity-40 ${active ? "bg-navy text-white" : "text-slate-600 hover:bg-slate-200"}`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({ value, onChange }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    immediatelyRender: false, // avoids SSR hydration mismatch in Next
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true }),
      Image,
    ],
    content: value || "",
    editorProps: {
      attributes: { class: "blog-content min-h-[320px] max-w-none px-4 py-3 focus:outline-none" },
    },
    onUpdate: ({ editor }) => onChange(editor.isEmpty ? "" : editor.getHTML()),
  });

  if (!editor) return <div className="min-h-[380px] rounded-md border border-slate-200 bg-white" />;

  function setLink() {
    const prev = editor.getAttributes("link").href || "";
    const url = window.prompt("Link URL (leave empty to remove)", prev);
    if (url === null) return;
    if (url.trim() === "") return editor.chain().focus().extendMarkRange("link").unsetLink().run();
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  }

  async function insertImage(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Upload failed");
      editor.chain().focus().setImage({ src: data.url, alt: file.name.replace(/\.[^.]+$/, "") }).run();
    } catch (err) {
      window.alert(err.message);
    } finally {
      setUploading(false);
    }
  }

  const c = () => editor.chain().focus();

  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-white focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/30">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-200 bg-slate-50 p-1.5">
        <Btn title="Bold" active={editor.isActive("bold")} onClick={() => c().toggleBold().run()}><Bold size={16} /></Btn>
        <Btn title="Italic" active={editor.isActive("italic")} onClick={() => c().toggleItalic().run()}><Italic size={16} /></Btn>
        <Btn title="Underline" active={editor.isActive("underline")} onClick={() => c().toggleUnderline().run()}><UnderlineIcon size={16} /></Btn>
        <span className="mx-1 h-5 w-px bg-slate-300" />
        <Btn title="Heading" active={editor.isActive("heading", { level: 2 })} onClick={() => c().toggleHeading({ level: 2 }).run()}><Heading2 size={16} /></Btn>
        <Btn title="Sub-heading" active={editor.isActive("heading", { level: 3 })} onClick={() => c().toggleHeading({ level: 3 }).run()}><Heading3 size={16} /></Btn>
        <span className="mx-1 h-5 w-px bg-slate-300" />
        <Btn title="Bullet list" active={editor.isActive("bulletList")} onClick={() => c().toggleBulletList().run()}><List size={16} /></Btn>
        <Btn title="Numbered list" active={editor.isActive("orderedList")} onClick={() => c().toggleOrderedList().run()}><ListOrdered size={16} /></Btn>
        <Btn title="Quote" active={editor.isActive("blockquote")} onClick={() => c().toggleBlockquote().run()}><Quote size={16} /></Btn>
        <Btn title="Divider" onClick={() => c().setHorizontalRule().run()}><Minus size={16} /></Btn>
        <span className="mx-1 h-5 w-px bg-slate-300" />
        <Btn title="Link" active={editor.isActive("link")} onClick={setLink}><Link2 size={16} /></Btn>
        <Btn title={uploading ? "Uploading…" : "Insert image"} disabled={uploading} onClick={() => fileRef.current?.click()}><ImagePlus size={16} /></Btn>
        <span className="mx-1 h-5 w-px bg-slate-300" />
        <Btn title="Undo" disabled={!editor.can().undo()} onClick={() => c().undo().run()}><Undo2 size={16} /></Btn>
        <Btn title="Redo" disabled={!editor.can().redo()} onClick={() => c().redo().run()}><Redo2 size={16} /></Btn>
        {uploading && <span className="ml-2 text-xs text-slate-500">Uploading image…</span>}
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" className="hidden" onChange={insertImage} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
