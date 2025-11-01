import React, { useEffect, useRef, useState } from 'react';
import './ImageCarousel.css';

const AUTO_INTERVAL_MS = 4000;

const ImageCarousel = ({ images = [], onViewMore }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const intervalRef = useRef(null);

	const goTo = (idx) => {
		if (images.length === 0) return;
		const normalized = ((idx % images.length) + images.length) % images.length;
		setCurrentIndex(normalized);
	};

	const next = () => goTo(currentIndex + 1);
	const prev = () => goTo(currentIndex - 1);

	useEffect(() => {
		if (images.length <= 1) return;
		intervalRef.current = setInterval(() => {
			setCurrentIndex((i) => (i + 1) % images.length);
		}, AUTO_INTERVAL_MS);
		return () => clearInterval(intervalRef.current);
	}, [images.length]);

	return (
		<div className="carousel">
			<div className="carousel-viewport">
				{images.map((src, i) => (
					<div
						key={i}
						className={`carousel-slide ${i === currentIndex ? 'active' : ''}`}
						aria-hidden={i !== currentIndex}
					>
						<img src={src} alt={`Slide ${i + 1}`} />
					</div>
				))}
			</div>

			<button className="carousel-control prev" onClick={prev} aria-label="Previous slide">‹</button>
			<button className="carousel-control next" onClick={next} aria-label="Next slide">›</button>

			<div className="carousel-dots">
				{images.map((_, i) => (
					<button
						key={i}
						className={`dot ${i === currentIndex ? 'active' : ''}`}
						aria-label={`Go to slide ${i + 1}`}
						onClick={() => goTo(i)}
					/>
				))}
			</div>

			{onViewMore && (
				<div className="carousel-actions">
					<button className="btn btn-secondary" onClick={onViewMore}>View More</button>
				</div>
			)}
		</div>
	);
};

export default ImageCarousel;
