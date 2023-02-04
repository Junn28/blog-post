import Head from 'next/head';
import styles from '@/styles/Users.module.css';
import Link from 'next/link';
import AddUser from '@/components/add_user';

export default function Users({ users }) {
  return (
    <>
      <Head>
        <title>Users</title>
        <meta name="users" content="list of users" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="user" className={styles.container}>
        <h1>Users</h1>
        <AddUser />
        <button
          className={styles.btnAdd}
          onClick={() => {
            document.querySelector('.modal').style.display = 'block';
          }}
        >
          + Add User
        </button>
        {users.map((user) => (
          <div key={user.id} className={styles.userWrapper}>
            <p className={styles.name}>{user.name}</p>
            <Link href={'/users/' + user.id}>
              <button className={styles.btnDetails}>Details</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer 9790edbfff496f9264e925ed95933e72406eb166598fdd1df4ee1cd8f589f21d',
      'Content-Type': 'application/json',
    },
  };
  const res = await fetch('https://gorest.co.in//public/v2/users', options);
  const users = await res.json();

  return {
    props: {
      users,
    },
    revalidate: 10,
  };
}
