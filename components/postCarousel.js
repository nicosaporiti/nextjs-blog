import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Date from './date';
import styles from './postCarousel.module.css';

export default function PostCarousel({ posts }) {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);
  const total = posts.length;

  const isProgScroll = useRef(false);

  const goTo = useCallback((index) => {
    let next = index;
    if (next < 0) next = total - 1;
    if (next >= total) next = 0;
    isProgScroll.current = true;
    setCurrent(next);
  }, [total]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[current];
    if (!card) return;
    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const offset = cardRect.left - trackRect.left - (trackRect.width / 2) + (cardRect.width / 2);
    track.scrollTo({ left: track.scrollLeft + offset, behavior: 'smooth' });
    setTimeout(() => { isProgScroll.current = false; }, 500);
  }, [current]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let timer;
    const onScroll = () => {
      if (isProgScroll.current) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        const center = track.scrollLeft + track.offsetWidth / 2;
        let closest = 0;
        let minDist = Infinity;
        for (let i = 0; i < track.children.length; i++) {
          const child = track.children[i];
          const childCenter = child.offsetLeft - track.offsetLeft + child.offsetWidth / 2;
          const dist = Math.abs(center - childCenter);
          if (dist < minDist) { minDist = dist; closest = i; }
        }
        setCurrent(closest);
      }, 80);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.carousel}>
      <div className={styles.track} ref={trackRef}>
        {posts.map(({ id, title, date, image, author }, i) => (
          <Link
            key={id}
            href={`/posts/${id}`}
            className={`${styles.slide} ${i === current ? styles.slideActive : ''}`}
          >
            <div className={styles.imageBg}>
              {image && <img src={image} alt="" className={styles.image} />}
              <div className={styles.overlay} />
            </div>
            <div className={styles.content}>
              <h2 className={styles.title}>{title}</h2>
              <div className={styles.meta}>
                {author && <span>by {author}</span>}
                <span><Date dateString={date} /></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <button
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={() => goTo(current - 1)}
        aria-label="Anterior"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={() => goTo(current + 1)}
        aria-label="Siguiente"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </button>
      <div className={styles.dots}>
        {posts.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Ir al post ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
