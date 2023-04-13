import Head from 'next/head';
import styles from '@/styles/Blog.module.css';
import iconElements from '../../../public/elements.svg';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Blog({ post }) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date();
  const [comments, setComments] = useState([]);
  const commentsHandle = async () => {
    const url = await fetch('https://gorest.co.in/public/v2/comments')
      .then((res) => res.json())
      .then((data) => setComments(data));
  };
  useEffect(() => {
    commentsHandle();
  }, []);
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="blog" content="detail blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <h1>Detail Blog</h1>
        <p className={styles.title}>{post.title}</p>
        <p className={styles.date}>
          On {months[date.getMonth()]} {date.getDate()} , {date.getFullYear()} - Posted by User
        </p>
        <div className={styles.blogImage}>
          <Image className={styles.elImage} src={iconElements} alt="image" />
        </div>
        <p className={styles.description}>{post.body}</p>
        <section className={styles.containerComments}>
          <h1>Comment</h1>
          {comments
            .filter((item) => item.post_id === post.id)
            .map((comment) => (
              <div key={comment.id} className={styles.commentsWrapper}>
                <div className={styles.iconWrapper}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                  </svg>
                </div>
                <div className={styles.textWrapper}>
                  <p className={styles.name}>{comment.name}</p>
                  <p className={styles.text}>{comment.body}</p>
                </div>
              </div>
            ))}
        </section>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch('https://gorest.co.in/public/v2/posts');
  const posts = await res.json();
  const paths = posts.map((post) => ({
    params: { postId: `${post.id}` },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { postId } = context.params;
  const res = await fetch(`https://gorest.co.in/public/v2/posts/${postId}`);
  const post = await res.json();
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}
