import React, { useEffect, useState } from 'react'
import { useProduct } from '../hooks/useProducts'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// ─── Currency symbol helper ────────────────────────────────────────────────────
const CURRENCY_SYMBOLS = {
  INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥', AED: 'AED', CHF: 'CHF',
};

const getCurrencySymbol = (currency) => CURRENCY_SYMBOLS[currency] || currency;

const formatPrice = (price) =>
  `${getCurrencySymbol(price.currency)}${price.amount.toLocaleString('en-IN')}`;

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

// ─── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ product, index }) {
  const [imgIdx, setImgIdx] = useState(0);

  const images = product.images || [];
  const coverImg = images[imgIdx]?.url || null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setImgIdx((i) => (i - 1 + images.length) % images.length);
  };
  const handleNext = (e) => {
    e.stopPropagation();
    setImgIdx((i) => (i + 1) % images.length);
  };

  return (
    <div
      className="group relative bg-[#0d0f12] border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-300 hover:border-amber-500/30 hover:shadow-[0_8px_40px_rgba(245,158,11,0.08)] flex flex-col"
    >
      {/* Image section */}
      <div className="relative w-full aspect-[4/3] bg-[#111318] overflow-hidden">
        {coverImg ? (
          <img
            src={coverImg}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12] via-transparent to-transparent opacity-60" />

        {/* Image navigation (only if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:bg-black/80 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:bg-black/80 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                  className={`rounded-full transition-all duration-200 ${i === imgIdx ? 'w-4 h-1.5 bg-amber-400' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Image count badge */}
        {images.length > 0 && (
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-2 py-0.5">
            <svg className="w-3 h-3 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[10px] text-white/60 font-medium">{images.length}</span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-semibold text-sm leading-snug line-clamp-1 flex-1">
            {product.title}
          </h3>
          <span className="shrink-0 text-amber-400 font-bold text-sm">
            {formatPrice(product.price)}
          </span>
        </div>

        <p className="text-white/40 text-xs leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
          <span className="text-white/25 text-[10px]">
            {formatDate(product.createdAt)}
          </span>
          <span className="text-[10px] text-white/25 font-mono tracking-tight">
            #{product._id.slice(-6).toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Stats Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, accent }) {
  return (
    <div className="bg-[#0d0f12] border border-white/[0.06] rounded-xl p-4 flex items-center gap-4">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: accent + '1a', border: `1px solid ${accent}30` }}
      >
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <div>
        <p className="text-white/40 text-xs">{label}</p>
        <p className="text-white font-bold text-lg leading-tight">{value}</p>
      </div>
    </div>
  );
}

// ─── Empty State ───────────────────────────────────────────────────────────────
function EmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-5">
        <svg className="w-9 h-9 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
      <h3 className="text-white/60 font-semibold text-base mb-1">No products yet</h3>
      <p className="text-white/25 text-sm mb-6 max-w-xs">
        Start adding products to your store and they will appear here.
      </p>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
        Add your first product
      </button>
    </div>
  );
}

// ─── Dashboard ─────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const navigate = useNavigate();
  const { handleGetSellerProducts } = useProduct();
  const sellerProducts = useSelector((state) => state.products.sellerProducts);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await handleGetSellerProducts();
      setLoading(false);
    };
    fetch();
  }, []);

  const products = Array.isArray(sellerProducts) ? sellerProducts : [];

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = products.reduce((sum, p) => sum + p.price.amount, 0);
  const currency = products[0]?.price?.currency || 'INR';

  return (
    <div className="min-h-screen bg-[#080a0d] text-white">
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[100px] pointer-events-none" />

      {/* ── Header ── */}
      <header className="sticky top-0 z-20 border-b border-white/[0.05] bg-[#080a0d]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-base leading-none">Seller Dashboard</h1>
              <p className="text-white/30 text-xs mt-0.5">Manage your products</p>
            </div>
          </div>

          <button
            id="add-product-btn"
            onClick={() => navigate('/seller/create-products')}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] active:scale-95"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* ── Stats row ── */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <StatCard
              label="Total Products"
              value={products.length}
              accent="#f59e0b"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              }
            />
            <StatCard
              label="Total Images"
              value={products.reduce((s, p) => s + p.images.length, 0)}
              accent="#6366f1"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            />
            <StatCard
              label={`Catalogue Value (${currency})`}
              value={`${getCurrencySymbol(currency)}${totalValue.toLocaleString('en-IN')}`}
              accent="#10b981"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>
        )}

        {/* ── Search & count row ── */}
        {!loading && products.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                id="search-products"
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#0d0f12] border border-white/[0.06] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-amber-500/40 transition-colors"
              />
            </div>
            <span className="text-white/30 text-xs shrink-0">
              {filtered.length} of {products.length} product{products.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* ── Content ── */}
        {loading ? (
          /* Loading skeleton */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#0d0f12] border border-white/[0.06] rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-white/[0.03]" />
                <div className="p-4 space-y-3">
                  <div className="flex justify-between">
                    <div className="h-3.5 bg-white/[0.05] rounded w-2/5" />
                    <div className="h-3.5 bg-white/[0.05] rounded w-1/5" />
                  </div>
                  <div className="h-3 bg-white/[0.04] rounded w-full" />
                  <div className="h-3 bg-white/[0.04] rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <EmptyState onAdd={() => navigate('/seller/create-products')} />
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg className="w-10 h-10 text-white/15 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-white/40 text-sm">No products match "<span className="text-white/60">{search}</span>"</p>
            <button
              onClick={() => setSearch('')}
              className="mt-3 text-amber-400/80 hover:text-amber-400 text-xs transition-colors"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((product, idx) => (
              <ProductCard key={product._id} product={product} index={idx} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;