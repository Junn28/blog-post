import Footer from '../footer';
import Navbar from '../navbar';
import styles from '@/styles/Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.content}>{children}</main>
      <Footer />
    </div>
  );
}
