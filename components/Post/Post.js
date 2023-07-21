import Link from 'next/link';
import { FeaturedImage } from '../FeaturedImage';
import { PostInfo } from '../PostInfo';
import styles from './Post.module.scss';

export default function Post({ post }) {
  return (
    <article>
      <Link href={post.slug} key={post.id}>
        <a>
          <h2>{post.title}</h2>
        </a>
      </Link>
    </article>
  );
}
