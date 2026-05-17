import React, { useState, useRef } from 'react';
import Popup from 'reactjs-popup';
import emailjs from '@emailjs/browser';
import useTranslation from './useTranslation';
import { SVGClose } from '../../public/assets/SVG';

// ─── star helpers ─────────────────────────────────────────────────────────────

function StarRow({ rating, size = 16, interactive = false, onSet }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = interactive ? i <= (hovered || rating) : i <= rating;
        return (
          <span
            key={i}
            onClick={() => interactive && onSet?.(i)}
            onMouseEnter={() => interactive && setHovered(i)}
            onMouseLeave={() => interactive && setHovered(0)}
            style={{
              fontSize: size,
              color: filled ? '#f59e0b' : '#d1d5db',
              cursor: interactive ? 'pointer' : 'default',
              lineHeight: 1,
              transition: 'color 0.1s',
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

function getInitials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('');
}

const AVATAR_COLORS = ['#6366f1','#ec4899','#f59e0b','#10b981','#3b82f6','#8b5cf6'];
function avatarColor(name) {
  let h = 0;
  for (let c of name) h = (h * 31 + c.charCodeAt(0)) & 0xffff;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

// ─── field ────────────────────────────────────────────────────────────────────

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  padding: '10px 12px', border: '1px solid #e5e7eb',
  borderRadius: 8, fontSize: 14, outline: 'none',
  transition: 'border-color 0.15s', background: '#fff',
};

// ─── component ────────────────────────────────────────────────────────────────

const ProductPageReview = ({ data = [] }) => {
  const { t } = useTranslation();
  const ref_name = useRef(null);
  const ref_text = useRef(null);

  const [open, setOpen]       = useState(false);
  const [rating, setRating]   = useState(0);
  const [status, setStatus]   = useState('submit');  // 'submit' | 'loading' | 'done'
  const [formData, setFormData] = useState({
    review_name: '', review_country: '', review_avatar: '', review_text: '',
  });

  const change = (e) => setFormData(f => ({ ...f, [e.target.name]: e.target.value }));

  function handleClose() { setOpen(false); }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.review_name.trim()) { ref_name.current?.focus(); return; }
    if (!formData.review_text.trim()) { ref_text.current?.focus(); return; }

    setStatus('loading');
    try {
      await emailjs.send(
        'service_tpg1r0h', 'template_2wp5lco',
        { ...formData, review_rating: rating },
        'dCVeBV20VeZr1KjP4'
      );
      setStatus('done');
      setTimeout(() => { setStatus('submit'); setOpen(false); }, 1500);
    } catch {
      setStatus('submit');
    }
  }

  const reviews = Array.isArray(data) ? data : [];

  return (
    <div style={{ marginTop: 48 }}>

      {/* ── Section header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24, paddingBottom: 16, borderBottom: '2px solid var(--color_line)' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--color_heading)' }}>
            Customer Reviews
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--color_body)' }}>
            {reviews.length > 0 ? `${reviews.length} review${reviews.length !== 1 ? 's' : ''}` : 'No reviews yet'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            padding: '10px 20px', borderRadius: 8,
            background: 'var(--color_primary)', color: '#fff',
            border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>✏️</span>
          Write a Review
        </button>
      </div>

      {/* ── Review list ── */}
      {reviews.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 24px', background: '#f9fafb', borderRadius: 12 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⭐</div>
          <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color_heading)', margin: '0 0 6px' }}>No reviews yet</p>
          <p style={{ fontSize: 13, color: 'var(--color_body)', margin: '0 0 20px' }}>Be the first to share your thoughts.</p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            style={{ padding: '9px 20px', borderRadius: 8, background: 'var(--color_primary)', color: '#fff', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            Write a Review
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {reviews.map((review, i) => {
            const name    = review.name || 'Anonymous';
            const country = review.country || '';
            const initials = getInitials(name);
            const bg = avatarColor(name);
            return (
              <div key={i} style={{
                background: '#fff', border: '1px solid var(--color_line)',
                borderRadius: 12, padding: '20px 24px',
                display: 'flex', gap: 16, alignItems: 'flex-start',
              }}>
                {/* Avatar */}
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                  background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: 0.5,
                }}>
                  {initials || '?'}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, marginBottom: 4 }}>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--color_heading)' }}>{name}</span>
                      {country && <span style={{ fontSize: 13, color: 'var(--color_body)', marginLeft: 8 }}>· {country}</span>}
                    </div>
                    <StarRow rating={review.rating || 0} size={14} />
                  </div>
                  <p style={{ margin: 0, fontSize: 14, color: 'var(--color_body)', lineHeight: 1.65 }}>
                    {review.content || review.text || ''}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Write review popup ── */}
      <Popup open={open} closeOnDocumentClick onClose={handleClose}>
        <div className="modal__layout modal-open review-popup">
          <div className="modal__close" onClick={handleClose} />
          <div className="modal__content" style={{ borderRadius: 16, padding: 0, overflow: 'hidden', maxWidth: 480 }}>

            {/* Header */}
            <div style={{ background: 'var(--color_primary)', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#fff' }}>Write a Review</h3>
              <button onClick={handleClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                <SVGClose />
              </button>
            </div>

            {/* Form body */}
            <div style={{ padding: '24px', maxHeight: '70vh', overflowY: 'auto' }}>

              {/* Star rating */}
              <div style={{ marginBottom: 20, textAlign: 'center' }}>
                <p style={{ fontSize: 13, color: 'var(--color_body)', margin: '0 0 10px' }}>How would you rate this product?</p>
                <StarRow rating={rating} size={36} interactive onSet={setRating} />
                <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 6 }}>
                  {rating === 0 ? 'Tap a star to rate' : ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
                <Field label="Your Name *">
                  <input
                    ref={ref_name}
                    type="text"
                    name="review_name"
                    value={formData.review_name}
                    onChange={change}
                    placeholder="John Doe"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color_primary)'}
                    onBlur={(e)  => e.target.style.borderColor = '#e5e7eb'}
                  />
                </Field>
                <Field label="Country">
                  <input
                    type="text"
                    name="review_country"
                    value={formData.review_country}
                    onChange={change}
                    placeholder="Ghana"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color_primary)'}
                    onBlur={(e)  => e.target.style.borderColor = '#e5e7eb'}
                  />
                </Field>
              </div>

              <Field label="Your Review *">
                <textarea
                  ref={ref_text}
                  name="review_text"
                  value={formData.review_text}
                  onChange={change}
                  placeholder="Share your experience with this product..."
                  rows={5}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color_primary)'}
                  onBlur={(e)  => e.target.style.borderColor = '#e5e7eb'}
                />
              </Field>

              {/* Submit */}
              {status === 'done' ? (
                <div style={{ textAlign: 'center', padding: '14px', background: '#d1fae5', borderRadius: 8, color: '#065f46', fontWeight: 600, fontSize: 14 }}>
                  ✓ Thank you! Your review has been submitted.
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={status === 'loading'}
                  style={{
                    width: '100%', padding: '12px', borderRadius: 8, border: 'none',
                    background: status === 'loading' ? '#4444aa' : 'var(--color_primary)',
                    color: '#fff', fontSize: 15, fontWeight: 600,
                    cursor: status === 'loading' ? 'wait' : 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  {status === 'loading' ? 'Submitting…' : 'Submit Review'}
                </button>
              )}
            </div>

          </div>
        </div>
      </Popup>

    </div>
  );
};

export default ProductPageReview;
