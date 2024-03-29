import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import menuBar from '../../public/bars.svg';
import iconXmark from '../../public/xmark.svg';
import { useState } from 'react';

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const isShowMenu = () => {
    if (!showMenu) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  };
  const router = useRouter();
  const tabNav = [
    {
      name: 'blogs',
      href: '/',
    },
    {
      name: 'users',
      href: '/users',
    },
  ];
  return (
    <nav>
      <div className="container">
        <h2 className="logo">
          Blog-Junn<span className="dot">.</span>
        </h2>
        <div className="icon-bars">{showMenu ? <Image className="xmark" src={iconXmark} alt="menu" onClick={isShowMenu} /> : <Image className="bars" src={menuBar} alt="menu" onClick={isShowMenu} />}</div>
        <div className={showMenu ? 'nav-wrapper show' : 'nav-wrapper'}>
          <ul className="tab-nav">
            {tabNav.map((nav, i) => (
              <li key={i} className={router.asPath === nav.href ? 'active nav-item' : 'nav-item'}>
                {nav.name === 'blogs' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm64 32v64c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H96c-17.7 0-32 14.3-32 32zM80 320c-13.3 0-24 10.7-24 24s10.7 24 24 24h56c13.3 0 24-10.7 24-24s-10.7-24-24-24H80zm136 0c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H216z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path d="M144 160c-44.2 0-80-35.8-80-80S99.8 0 144 0s80 35.8 80 80s-35.8 80-80 80zm368 0c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM416 224c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                  </svg>
                )}
                <Link href={nav.href} legacyBehavior>
                  <a className={router.asPath === nav.href ? 'text-white' : ''}>{nav.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
