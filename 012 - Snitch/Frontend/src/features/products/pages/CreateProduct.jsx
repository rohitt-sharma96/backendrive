import { useState, useRef, useCallback } from "react";
import { useProduct } from "../hooks/useProducts";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CURRENCIES = [
  { code: "USD", symbol: "$", label: "USD — US Dollar" },
  { code: "EUR", symbol: "€", label: "EUR — Euro" },
  { code: "GBP", symbol: "£", label: "GBP — British Pound" },
  { code: "INR", symbol: "₹", label: "INR — Indian Rupee" },
  { code: "CHF", symbol: "CHF", label: "CHF — Swiss Franc" },
  { code: "JPY", symbol: "¥", label: "JPY — Japanese Yen" },
  { code: "AED", symbol: "AED", label: "AED — UAE Dirham" },
];

const MAX_IMAGES = 7;

const SLOT_LABELS = [
  "Cover Image",
  "Angle 2",
  "Angle 3",
  "Detail Shot",
  "Packaging",
  "Certificate",
  "Extra",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ImageSlot({ index, image, onAdd, onRemove, isCover }) {
  const inputRef = useRef(null);

  const handleClick = () => {
    if (!image) inputRef.current?.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) onAdd(index, file);
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onAdd(index, file);
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`relative group flex flex-col items-center justify-center cursor-pointer rounded-xl transition-all duration-300 overflow-hidden
        ${isCover ? "col-span-2 row-span-2 min-h-[220px]" : "min-h-[108px]"}
        ${image
          ? "border border-amber-500/30"
          : "border border-dashed border-white/10 hover:border-amber-500/50 hover:bg-white/[0.02]"
        }
      `}
      style={{ background: image ? "transparent" : "rgba(13,15,18,0.5)" }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {image ? (
        <>
          <img
            src={image.preview}
            alt={SLOT_LABELS[index]}
            className="w-full h-full object-cover absolute inset-0"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              className="text-[11px] font-mono tracking-widest px-3 py-1.5 rounded-md bg-white/10 text-white hover:bg-amber-500/20 hover:text-amber-400 transition-colors"
            >
              REPLACE
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onRemove(index); }}
              className="text-[11px] font-mono tracking-widest px-3 py-1.5 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
            >
              REMOVE
            </button>
          </div>
          {/* Cover badge */}
          {isCover && (
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-mono tracking-widest bg-amber-500/20 text-amber-400 border border-amber-500/30">
              COVER
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 p-4 text-center select-none">
          <div
            className={`flex items-center justify-center rounded-lg bg-white/5 group-hover:bg-amber-500/10 transition-colors duration-200
              ${isCover ? "w-12 h-12" : "w-8 h-8"}
            `}
          >
            <svg
              className={`text-white/30 group-hover:text-amber-500/70 transition-colors duration-200 ${isCover ? "w-6 h-6" : "w-4 h-4"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-white/25 group-hover:text-white/40 transition-colors uppercase">
            {SLOT_LABELS[index]}
          </span>
          {isCover && (
            <span className="text-[10px] text-white/20 font-['Hanken_Grotesk'] max-w-[120px]">
              Drag & drop or click to upload
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const CreateProduct = () => {
  const { handleCreateProduct } = useProduct();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "USD",
  });
  const [images, setImages] = useState(Array(MAX_IMAGES).fill(null));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  // ── Field handlers ──────────────────────────────────────────────────────────

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleAddImage = useCallback((index, file) => {
    const preview = URL.createObjectURL(file);
    setImages((prev) => {
      const next = [...prev];
      next[index] = { file, preview };
      return next;
    });
  }, []);

  const handleRemoveImage = useCallback((index) => {
    setImages((prev) => {
      const next = [...prev];
      if (next[index]?.preview) URL.revokeObjectURL(next[index].preview);
      next[index] = null;
      return next;
    });
  }, []);

  // ── Validation ──────────────────────────────────────────────────────────────

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required.";
    if (!form.description.trim()) e.description = "Description is required.";
    if (!form.priceAmount || isNaN(Number(form.priceAmount)) || Number(form.priceAmount) <= 0)
      e.priceAmount = "Enter a valid price.";
    return e;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const imageFiles = images.filter(Boolean).map((img) => img.file);
      await handleCreateProduct({
        title: form.title,
        description: form.description,
        priceAmount:  Number(form.priceAmount),
        priceCurrency: form.priceCurrency,
        images: imageFiles,
      });
      // Reset on success
      setForm({ title: "", description: "", priceAmount: "", priceCurrency: "INR" });
      setImages(Array(MAX_IMAGES).fill(null));
      setErrors({});
    } catch (err) {
      console.error("Failed to create product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "w-full rounded-xl px-4 py-3.5 text-sm font-['Hanken_Grotesk'] text-[#f9fafb] placeholder-[#6b7280] outline-none transition-all duration-200";

  const inputStyle = (field) => ({
    background: "rgba(13,15,18,0.6)",
    border: errors[field]
      ? "1px solid rgba(239,68,68,0.6)"
      : focusedField === field
      ? "1px solid #f59e0b"
      : "1px solid rgba(255,255,255,0.08)",
    boxShadow: focusedField === field
      ? "0 0 0 3px rgba(245,158,11,0.12)"
      : errors[field]
      ? "0 0 0 3px rgba(239,68,68,0.08)"
      : "none",
  });

  const uploadedCount = images.filter(Boolean).length;

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#0e0e10",
        backgroundImage:
          "radial-gradient(ellipse at 60% 0%, rgba(245,158,11,0.07) 0%, transparent 60%)",
      }}
    >
      {/* ── Top Nav ──────────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-30 px-8 py-4 flex items-center justify-between"
        style={{
          background: "rgba(13,15,18,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Logo + breadcrumb */}
        <div className="flex flex-col gap-0.5">
          <span
            className="text-xl font-semibold tracking-tight"
            style={{ fontFamily: "Outfit, sans-serif", color: "#f59e0b" }}
          >
            SNITCH
          </span>
          <div
            className="flex items-center gap-1.5 text-[10px] tracking-[0.1em] uppercase"
            style={{ fontFamily: "JetBrains Mono, monospace", color: "#a08e7a" }}
          >
            <span className="hover:text-amber-400 cursor-pointer transition-colors">Dashboard</span>
            <span className="opacity-40">›</span>
            <span className="hover:text-amber-400 cursor-pointer transition-colors">Products</span>
            <span className="opacity-40">›</span>
            <span style={{ color: "#f59e0b" }}>Create New</span>
          </div>
        </div>

        {/* Seller badge */}
        <div
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] tracking-widest"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.2)",
            color: "#f59e0b",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          SELLER PORTAL
        </div>
      </header>

      {/* ── Page action bar ───────────────────────────────────────────────────── */}
      <div
        className="px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div>
          <h1
            className="text-2xl font-medium tracking-tight text-[#f9fafb]"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Create Product
          </h1>
          <p
            className="text-sm mt-0.5"
            style={{ fontFamily: "Hanken Grotesk, sans-serif", color: "#a08e7a" }}
          >
            List a new item on the Snitch marketplace.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Save Draft */}
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              fontFamily: "Hanken Grotesk, sans-serif",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#f9fafb",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = "1px solid rgba(245,158,11,0.4)";
              e.currentTarget.style.color = "#f59e0b";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "#f9fafb";
            }}
          >
            Save Draft
          </button>

          {/* Publish */}
          <button
            type="submit"
            form="create-product-form"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              fontFamily: "Hanken Grotesk, sans-serif",
              background: isSubmitting
                ? "rgba(245,158,11,0.5)"
                : "linear-gradient(135deg, #f59e0b, #ca8a04)",
              color: "#0e0e10",
              boxShadow: "0 4px 16px rgba(245,158,11,0.25)",
            }}
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Publishing…
              </>
            ) : (
              <>
                Publish Listing
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Main form ─────────────────────────────────────────────────────────── */}
      <form
        id="create-product-form"
        onSubmit={handleSubmit}
        noValidate
        className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8"
      >
        {/* ═══════════════════════════════════════════
            LEFT COLUMN — Product details
        ════════════════════════════════════════════ */}
        <div className="flex flex-col gap-8">

          {/* Card: Product Information */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: "rgba(13,15,18,0.7)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 8px 32px -4px rgba(0,0,0,0.5), 0 0 1px 0 rgba(245,158,11,0.08)",
            }}
          >
            {/* Section header */}
            <div className="flex items-center gap-3 mb-8">
              <span
                className="text-[10px] tracking-[0.15em] uppercase"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "#f59e0b" }}
              >
                01 / Product Information
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(245,158,11,0.12)" }} />
            </div>

            <div className="flex flex-col gap-6">
              {/* Title */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[11px] tracking-[0.1em] uppercase"
                  style={{ fontFamily: "JetBrains Mono, monospace", color: "#a08e7a" }}
                >
                  Title *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("title")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g. Vintage Leather Jacket — 1987 Edition"
                  className={inputBase}
                  style={inputStyle("title")}
                />
                {errors.title && (
                  <span className="text-xs text-red-400" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>
                    {errors.title}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label
                    className="text-[11px] tracking-[0.1em] uppercase"
                    style={{ fontFamily: "JetBrains Mono, monospace", color: "#a08e7a" }}
                  >
                    Description *
                  </label>
                  <span
                    className="text-[10px]"
                    style={{ fontFamily: "JetBrains Mono, monospace", color: form.description.length > 900 ? "#f59e0b" : "#534434" }}
                  >
                    {form.description.length} / 1000
                  </span>
                </div>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  maxLength={1000}
                  value={form.description}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("description")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Describe the item's condition, provenance, materials, and any notable history…"
                  className={`${inputBase} resize-none leading-relaxed`}
                  style={inputStyle("description")}
                />
                {errors.description && (
                  <span className="text-xs text-red-400" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>
                    {errors.description}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Card: Pricing */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: "rgba(13,15,18,0.7)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 8px 32px -4px rgba(0,0,0,0.5), 0 0 1px 0 rgba(245,158,11,0.08)",
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span
                className="text-[10px] tracking-[0.15em] uppercase"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "#f59e0b" }}
              >
                02 / Valuation &amp; Currency
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(245,158,11,0.12)" }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_180px] gap-5">
              {/* Price Amount */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[11px] tracking-[0.1em] uppercase"
                  style={{ fontFamily: "JetBrains Mono, monospace", color: "#a08e7a" }}
                >
                  Price Amount *
                </label>
                <div className="relative">
                  <span
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-sm pointer-events-none"
                    style={{ fontFamily: "JetBrains Mono, monospace", color: "#a08e7a" }}
                  >
                    {CURRENCIES.find((c) => c.code === form.priceCurrency)?.symbol}
                  </span>
                  <input
                    id="priceAmount"
                    name="priceAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.priceAmount}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("priceAmount")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="0.00"
                    className={`${inputBase} pl-9`}
                    style={inputStyle("priceAmount")}
                  />
                </div>
                {errors.priceAmount && (
                  <span className="text-xs text-red-400" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>
                    {errors.priceAmount}
                  </span>
                )}
              </div>

              {/* Currency */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[11px] tracking-[0.1em] uppercase"
                  style={{ fontFamily: "JetBrains Mono, monospace", color: "#a08e7a" }}
                >
                  Currency
                </label>
                <select
                  id="priceCurrency"
                  name="priceCurrency"
                  value={form.priceCurrency}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("priceCurrency")}
                  onBlur={() => setFocusedField(null)}
                  className={inputBase}
                  style={{
                    ...inputStyle("priceCurrency"),
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a08e7a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 14px center",
                    cursor: "pointer",
                  }}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code} style={{ background: "#1c1b1d", color: "#f9fafb" }}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price hint */}
            <p
              className="mt-4 text-xs leading-relaxed"
              style={{ fontFamily: "Hanken Grotesk, sans-serif", color: "#534434" }}
            >
              All listings are subject to a 3% marketplace fee upon successful sale.
              Funds are held in secure escrow until delivery is confirmed.
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            RIGHT COLUMN — Image gallery
        ════════════════════════════════════════════ */}
        <div className="flex flex-col gap-6">
          <div
            className="rounded-2xl p-8 flex flex-col gap-6"
            style={{
              background: "rgba(13,15,18,0.7)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 8px 32px -4px rgba(0,0,0,0.5), 0 0 1px 0 rgba(245,158,11,0.08)",
            }}
          >
            {/* Section header */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-[10px] tracking-[0.15em] uppercase"
                  style={{ fontFamily: "JetBrains Mono, monospace", color: "#f59e0b" }}
                >
                  03 / Media Gallery
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(245,158,11,0.12)" }} />
                <span
                  className="text-[10px] tracking-widest shrink-0"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    color: uploadedCount === MAX_IMAGES ? "#f59e0b" : "#534434",
                  }}
                >
                  {uploadedCount}/{MAX_IMAGES}
                </span>
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ fontFamily: "Hanken Grotesk, sans-serif", color: "#534434" }}
              >
                First image is the cover. Up to 7 images. JPG, PNG, or WEBP.
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, i) => (
                <ImageSlot
                  key={i}
                  index={i}
                  image={img}
                  onAdd={handleAddImage}
                  onRemove={handleRemoveImage}
                  isCover={i === 0}
                />
              ))}
            </div>

            {/* Drop hint */}
            <div
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs"
              style={{
                fontFamily: "Hanken Grotesk, sans-serif",
                background: "rgba(255,255,255,0.02)",
                border: "1px dashed rgba(255,255,255,0.06)",
                color: "#534434",
              }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Click any slot or drag &amp; drop files
            </div>
          </div>

          {/* Quick summary card */}
          {(form.title || form.priceAmount) && (
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(245,158,11,0.04)",
                border: "1px solid rgba(245,158,11,0.15)",
              }}
            >
              <p
                className="text-[10px] tracking-[0.12em] uppercase mb-3"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "#f59e0b" }}
              >
                Preview
              </p>
              {form.title && (
                <p
                  className="text-sm font-medium text-[#f9fafb] mb-1 truncate"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {form.title}
                </p>
              )}
              {form.priceAmount && (
                <p
                  className="text-lg font-semibold"
                  style={{ fontFamily: "JetBrains Mono, monospace", color: "#f59e0b" }}
                >
                  {CURRENCIES.find((c) => c.code === form.priceCurrency)?.symbol}
                  {Number(form.priceAmount).toLocaleString()}
                  {" "}
                  <span className="text-xs text-[#a08e7a]">{form.priceCurrency}</span>
                </p>
              )}
              <p
                className="text-[10px] mt-2"
                style={{ fontFamily: "Hanken Grotesk, sans-serif", color: "#534434" }}
              >
                {uploadedCount} image{uploadedCount !== 1 ? "s" : ""} attached
              </p>
            </div>
          )}
        </div>
      </form>

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <footer
        className="mt-4 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <span
          className="text-[10px] tracking-[0.1em] uppercase"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "#353437" }}
        >
          © 2026 Snitch Marketplace — All rights reserved
        </span>
        <div className="flex items-center gap-1.5">
          <svg className="w-3 h-3 text-[#534434]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span
            className="text-[10px] tracking-[0.08em]"
            style={{ fontFamily: "JetBrains Mono, monospace", color: "#534434" }}
          >
            SECURED · ENCRYPTED ESCROW
          </span>
        </div>
      </footer>
    </div>
  );
};

export default CreateProduct;