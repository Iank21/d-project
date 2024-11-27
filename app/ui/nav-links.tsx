'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { AccountIcon, HistoryIcon, HomeIcon, OverworkingIcon, TestIcon } from './icons';

const links = [
  { 
    name: 'Главная', 
    href: '/dashboard', 
    icon: HomeIcon 
  },
  {
    name: 'Список тестов',
    href: '/tests',
    icon: TestIcon,
  },
  {
    name: 'Сверхурочная работа',
    href: '/overworking',
    icon: OverworkingIcon,
  },
  {
    name: 'История',
    href: '/history',
    icon: HistoryIcon,
  },
  {
    name: 'Личный кабинет',
    href: '/account',
    icon: AccountIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}          
          >
            {LinkIcon}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
