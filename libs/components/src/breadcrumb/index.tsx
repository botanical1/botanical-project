import classNames from 'classnames';
import Link from 'next/link';
import React, { FC } from 'react';

interface Props {
  list: { name: string; href: string; current: boolean }[];
  extraClassName?: string;
}

const Breadcrumb: FC<Props> = ({ list, extraClassName }) => {
  return (
    <nav className={classNames('flex justify-center mt-3', extraClassName)} aria-label="Breadcrumb">
      <ol role="list" className="flex items-center justify-center space-x-2">
        <li>
          <div>
            <Link href="/">
              <a className="text-xs font-thin hover:text-gray-700">Home</a>
            </Link>
          </div>
        </li>
        {list.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <svg
                className="flex-shrink-0 h-3 w-3 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 15 15"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              {page.current && (
                <span className={'ml-3 text-xs'}>{page.name}</span>
              )}
              {!page.current && (
                <Link href={page.href}>
                  <a
                    className={'ml-3 text-xs hover:text-gray-700'}
                    aria-current={page.current ? 'page' : undefined}
                  >
                    {page.name}
                  </a>
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
