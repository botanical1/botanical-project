import { FC, ReactElement } from 'react';
import Link from 'next/link';
import { IconUserCircle, IconBasket, IconAddressBook } from '@tabler/icons';

import RouteGuard from '../route-gaurd';

const subNavigation = [
  {
    name: 'Profile',
    href: '/account',
    icon: IconUserCircle,
  },
  { name: 'Orders', href: '/account/orders', icon: IconBasket },
  {
    name: 'Addresses',
    href: '/account/addresses',
    icon: IconAddressBook,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  children: ReactElement;
  page: 'Profile' | 'Orders' | 'Addresses';
};

const AccountLayout: FC<Props> = ({ children, page }: Props) => {
  return (
    <RouteGuard>
      <div className="h-full">
        <main className="max-w-1432 mx-auto pb-10 lg:py-12 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
              <nav className="space-y-1">
                {subNavigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={classNames(
                        item.name === page
                          ? 'bg-gray-50 text-indigo-700'
                          : 'text-gray-700 hover:text-gray-900',
                        'group rounded-md px-3 py-2 flex items-center text-sm font-medium hover:bg-white'
                      )}
                      aria-current={item.name === page ? 'page' : undefined}
                    >
                      <item.icon
                        className={classNames(
                          item.name === page
                            ? 'text-indigo-700'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </a>
                  </Link>
                ))}
              </nav>
            </aside>
            {children}
          </div>
        </main>
      </div>
    </RouteGuard>
  );
};

export default AccountLayout;
