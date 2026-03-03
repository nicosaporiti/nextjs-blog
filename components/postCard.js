import Link from 'next/link';
import Date from './date';
import styles from './postCard.module.css';

export default function PostCard({ id, title, date, resume, image, author, view }) {
  const isList = view === 'list';

  return (
    <Link href={`/posts/${id}`} className={`${styles.card} ${isList ? styles.listCard : ''}`}>
      {image && (
        <div className={`${styles.imageWrap} ${isList ? styles.listImageWrap : ''}`}>
          <img src={image} alt="" className={styles.image} loading="lazy" />
        </div>
      )}
      <div className={styles.body}>
        <h2 className={`${styles.title} ${isList ? styles.listTitle : ''}`}>{title}</h2>
        {resume && <p className={styles.excerpt}>{resume}</p>}
        <div className={styles.meta}>
          {author && <span>{author}</span>}
          <span><Date dateString={date} /></span>
        </div>
      </div>
    </Link>
  );
}
