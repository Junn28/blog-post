import Layout from '@/components/layout';
import Head from 'next/head';
import styles from '@/styles/Users.module.css';
import male from '../../../public/male_avatar.svg';
import female from '../../../public/female_avatar.svg';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function DetailUser({ user }) {
  const router = useRouter();
  const [update, setUpdate] = useState(false);
  const isUpdate = () => {
    if (!update) {
      setUpdate(true);
    } else {
      setUpdate(false);
    }
    console.log(update);
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    const updateUser = {
      name: e.target.name.value,
      gender: e.target.gender.value,
      email: e.target.email.value,
      status: e.target.status.value,
    };
    const dataJson = JSON.stringify(updateUser);
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer 9790edbfff496f9264e925ed95933e72406eb166598fdd1df4ee1cd8f589f21d',
        'Content-Type': 'application/json',
      },
      body: dataJson,
    };
    const res = await fetch(`https://gorest.co.in/public/v2/users/${user.id}`, options);
    router.reload();
  };
  const deleteHandler = async (e) => {
    e.preventDefault();

    const options = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer 9790edbfff496f9264e925ed95933e72406eb166598fdd1df4ee1cd8f589f21d',
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(`https://gorest.co.in/public/v2/users/${user.id}`, options);
    router.push('/users');
  };

  return (
    <>
      <Head>
        <title>Detail User</title>
        <meta name="user" content="detail for user" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={styles.container}>
          <h1>Detail User</h1>
          <div className={styles.card}>
            <div className={styles.cardImage}>
              <Image src={user.gender === 'male' ? male : female} width={300} height="auto" alt={user.gender === 'male' ? 'male avatar' : 'female avatar'} />
            </div>
            <form className={styles.cardWrapper} onSubmit={update ? deleteHandler : updateHandler}>
              <label htmlFor="name">Name</label>
              <input className={update ? `${styles.inputItem} ${styles.noBorder}` : `${styles.inputItem}`} name="name" type="text" id="name" defaultValue={user.name} disabled={!update} />
              <label htmlFor="email">Email</label>
              <input className={update ? `${styles.inputItem} ${styles.noBorder}` : `${styles.inputItem}`} name="email" type="email" id="email" defaultValue={user.email} disabled={!update} />
              <label htmlFor="gender">Gender</label>
              <input className={update ? `${styles.inputItem} ${styles.noBorder}` : `${styles.inputItem}`} name="gender" type="text" id="gender" defaultValue={user.gender} disabled={!update} />
              <label htmlFor="status">Status</label>
              <select className={styles.inputItem} name="status" id="status" defaultValue={user.status} disabled={!update}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className={styles.btnWrapper}>
                <button className={update ? `${styles.btnCheck} ${styles.btn}` : `${styles.btnUpdate} ${styles.btn}`} onClick={isUpdate} type={update ? 'button' : 'submit'}>
                  {update ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z" />
                    </svg>
                  )}
                </button>
                <button className={update ? `${styles.btnCross} ${styles.btn}` : `${styles.btnDelete} ${styles.btn}`} onClick={isUpdate} type={update ? 'submit' : 'button'}>
                  {update ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                      <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer 9790edbfff496f9264e925ed95933e72406eb166598fdd1df4ee1cd8f589f21d',
      'Content-Type': 'application/json',
    },
  };
  const res = await fetch('https://gorest.co.in//public/v2/users/', options);
  const users = await res.json();
  const paths = users.map((user) => ({
    params: { userId: `${user.id}` },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { userId } = context.params;
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer 9790edbfff496f9264e925ed95933e72406eb166598fdd1df4ee1cd8f589f21d',
      'Content-Type': 'application/json',
    },
  };
  const res = await fetch(`https://gorest.co.in/public/v2/users/${userId}`, options);
  const user = await res.json();
  return {
    props: {
      user,
    },
  };
}
