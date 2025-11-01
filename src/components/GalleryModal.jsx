import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './GalleryModal.css';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const GalleryModal = ({ isOpen, images = [], startIndex = 0, onClose }) => {
	const [index, setIndex] = useState(startIndex);
	const [zoom, setZoom] = useState(1);
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const containerRef = useRef(null);
	const isDraggingRef = useRef(false);
	const dragStartRef = useRef({ x: 0, y: 0 });
	const offsetStartRef = useRef({ x: 0, y: 0 });

	useEffect(() => {
		if (isOpen) {
			setIndex(startIndex);
			setZoom(1);
			setOffset({ x: 0, y: 0 });
			document.body.style.overflow = 'hidden';
			return () => { document.body.style.overflow = ''; };
		}
	}, [isOpen, startIndex]);

	const next = useCallback(() => {
		setIndex((i) => (i + 1) % images.length);
		setZoom(1);
		setOffset({ x: 0, y: 0 });
	}, [images.length]);

	const prev = useCallback(() => {
		setIndex((i) => (i - 1 + images.length) % images.length);
		setZoom(1);
		setOffset({ x: 0, y: 0 });
	}, [images.length]);

	const handleWheel = (e) => {
		if (!isOpen) return;
		const delta = e.deltaY;
		const newZoom = clamp(zoom + (delta > 0 ? -0.1 : 0.1), 1, 3);
		setZoom(newZoom);
	};

	const onMouseDown = (e) => {
		if (zoom === 1) return;
		isDraggingRef.current = true;
		dragStartRef.current = { x: e.clientX, y: e.clientY };
		offsetStartRef.current = { ...offset };
	};

	const onMouseMove = (e) => {
		if (!isDraggingRef.current) return;
		const dx = e.clientX - dragStartRef.current.x;
		const dy = e.clientY - dragStartRef.current.y;
		setOffset({ x: offsetStartRef.current.x + dx, y: offsetStartRef.current.y + dy });
	};

	const onMouseUp = () => { isDraggingRef.current = false; };

	useEffect(() => {
		if (!isOpen) return;
		const onKey = (e) => {
			if (e.key === 'Escape') onClose?.();
			if (e.key === 'ArrowRight') next();
			if (e.key === 'ArrowLeft') prev();
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [isOpen, next, prev, onClose]);

	if (!isOpen) return null;

	return (
		<div className="gallery-backdrop" onClick={onClose}>
			<div
				className="gallery-modal"
				onClick={(e) => e.stopPropagation()}
				ref={containerRef}
				onWheel={handleWheel}
				onMouseDown={onMouseDown}
				onMouseMove={onMouseMove}
				onMouseUp={onMouseUp}
				onMouseLeave={onMouseUp}
			>
				<button className="close-btn" onClick={onClose} aria-label="Close">✕</button>
				<button className="nav-btn prev" onClick={prev} aria-label="Previous">‹</button>
				<button className="nav-btn next" onClick={next} aria-label="Next">›</button>

				<div className="canvas">
					<img
						src={images[index]}
						alt={`Preview ${index + 1}`}
						style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`, transformOrigin: 'center center' }}
					/>
				</div>

				<div className="toolbar">
					<div className="zoom-controls">
						<button onClick={() => setZoom((z) => clamp(z - 0.2, 1, 3))} aria-label="Zoom out">−</button>
						<span>{Math.round(zoom * 100)}%</span>
						<button onClick={() => setZoom((z) => clamp(z + 0.2, 1, 3))} aria-label="Zoom in">+</button>
						<button onClick={() => { setZoom(1); setOffset({ x: 0, y: 0 }); }} aria-label="Reset">Reset</button>
					</div>
					<div className="counter">{index + 1} / {images.length}</div>
				</div>
			</div>
		</div>
	);
};

export default GalleryModal;
