import { FC, Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/future/image';
import Link from 'next/link';
import { IconKey, IconLogin, IconMenu, IconX } from '@tabler/icons';
import { Dialog, Disclosure, Transition } from '@headlessui/react';

import { extractHandleFromUrl, storefront } from '@shopify/utilities';
import {
  getSearchedproductsResponseModel,
  MenuModel,
  ProductsModel,
} from '@shopify/models';
import { useCartStore, useUserStore } from '@shopify/state';

import PopupCart from '../popup-cart';
import Container from '../container';
import classNames from 'classnames';
import { SearchIcon, XIcon } from '@heroicons/react/outline';
import { getSearchedProducts } from '@shopify/graphql-queries';
import toast from 'react-hot-toast';
import { useDebounce } from '@shopify/hooks';

interface Props {
  menu: MenuModel[];
}

const Header: FC<Props> = ({ menu }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartStore = useCartStore();
  const userStore = useUserStore();

  const [onTop, setOnTop] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 1000);
  const [products, setProducts] = useState<ProductsModel[]>([]);
  console.log(products);
  const handleSearch = async () => {
    setLoading(true);
    const searchResponse = await storefront<getSearchedproductsResponseModel>(
      getSearchedProducts,
      {
        input: search,
      }
    );

    if (searchResponse?.data?.products) {
      setProducts(searchResponse?.data?.products?.edges);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (debouncedSearch?.length) {
      handleSearch();
    }
  }, [debouncedSearch]);

  const handleKeyDown = (event: any) => {
    if (event.code === 'Enter' && !loading) {
      handleSearch();
    }
  };

  useEffect(() => {
    const onScroll = (e: any) => {
      setOnTop((isShrunk) => {
        if (
          isShrunk &&
          (document.body.scrollTop > 250 ||
            document.documentElement.scrollTop > 250)
        ) {
          return false;
        }

        if (
          !isShrunk &&
          document.body.scrollTop < 150 &&
          document.documentElement.scrollTop < 150
        ) {
          return true;
        }

        return isShrunk;
      });
    };
    document.addEventListener('scroll', onScroll);
    router.events.on('routeChangeStart', (url) => {
      setIsSearchOpen(false);
    });
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleSignOut = (e: any) => {
    e?.preventDefault();
    e?.stopPropagation();
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    userStore.initiate(null);
    router.push('/');
  };

  const handleDisplayCart = (e: any) => {
    e.preventDefault();
    setCartOpen(!cartOpen);
  };

  useEffect(() => {
    const cartInitialData = localStorage.getItem('user_cart');

    if (cartInitialData) {
      cartStore.initiate(JSON.parse(cartInitialData));
    }
  }, []);

  const renderAuthenticatedUser = () => (
    <>
      <li className="hover:bg-highlight p-2 rounded-md hover:text-white transition-all duration-300 text-sm">
        <Link href="/account">
          <a className="flex gap-2 items-center">
            <IconLogin size={18} />
            <span>Profile</span>
          </a>
        </Link>
      </li>
      <li
        onClick={handleSignOut}
        className="hover:bg-highlight p-2 rounded-md hover:text-white transition-all duration-300 text-sm"
      >
        <Link href="#">
          <a className="flex gap-2 items-center">
            <IconLogin size={18} />
            <span>Signout</span>
          </a>
        </Link>
      </li>
    </>
  );
  const renderAnonymouseUser = () => (
    <>
      <li className="hover:bg-highlight p-2 rounded-md hover:text-white transition-all duration-300 text-sm">
        <Link href="/account/login">
          <a className="flex gap-2 items-center">
            <IconLogin size={18} />
            <span>Login</span>
          </a>
        </Link>
      </li>
      <li className="hover:bg-highlight p-2 rounded-md hover:text-white transition-all duration-300 text-sm">
        <Link href="/account/register">
          <a className="flex gap-2 items-center">
            <IconKey size={18} />
            <span>Register</span>
          </a>
        </Link>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-40 bg-opacity-90 backdrop-filter backdrop-blur-md">
      <Transition
        as={Fragment}
        show={isSearchOpen}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 absolute  translate-y-0 "
        enterTo="opacity-100 absolute  translate-y-0 "
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 absolute  translate-y-0 "
        leaveTo="opacity-0 absolute  translate-y-0 "
      >
        <div className="bg-opacity-90 px-6 z-50 w-full flex flex-col items-center  bg-yasBackground/90 backdrop-filter backdrop-blur-md">
          <div className="max-w-xl flex flex-col mx-auto md:max-w-1432 pt-16">
            <div className="flex items-center justify-between">
              <Link href="/">
                <a className="opacity-0">
                  <Image
                    width={186}
                    height={56}
                    priority={true}
                    className="w-auto h-14"
                    src="/images/brand-logo@3x.png"
                    alt="Yas Natural Solutions"
                  />
                </a>
              </Link>
              <XIcon
                className="h-8 w-8 cursor-pointer hover:opacity-70"
                onClick={() => setIsSearchOpen(false)}
              />
            </div>
            <div className="mt-4 relative flex items-center w-[300px]   md:w-[800px] self-center">
              <div
                className="absolute inset-y-0 left-0 flex py-2 pl-2 text-gray-400 cursor-pointer"
                onClick={handleSearch}
              >
                <SearchIcon className="w-6 h-6" aria-hidden="true" />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="search"
                value={search}
                disabled={loading}
                onKeyDown={handleKeyDown}
                onChange={(event) => setSearch(event.target.value)}
                className="appearance-none pl-10 rounded-full block w-full px-3 py-2 border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {!!products?.length && (
              <div className="mt-8 text-yasLink">
                {products?.length} search results
              </div>
            )}
            <div className="flex flex-col gap-4 my-8">
              {products?.map((item: any) => {
                const product = item.node;
                return (
                  <div>
                    <Link href={`/products/${product.handle}`}>
                      <a className="text-midway font-medium text-xl">
                        {product.title}
                      </a>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Transition>
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-50 " onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full shadow-xl pb-12 flex flex-col overflow-y-auto bg-white">
              <div className="px-4 pt-5 pb-5 mb-5 border-stone-200 border-b flex justify-between">
                <Link href="/">
                  <a>
                    <span className="sr-only">Yas Natural Solutions</span>
                    <Image
                      width={100}
                      height={40}
                      priority={true}
                      className="h-8 w-auto"
                      src="/images/brand-logo@3x.png"
                      alt="Yas Natural Solutions"
                    />
                  </a>
                </Link>
                <div>
                  <button
                    type="button"
                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <IconX className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col space-y-2 p-2">
                {menu?.map((category) =>
                  !category.items || !category.items?.length ? (
                    <Link
                      key={category.title}
                      href={
                        extractHandleFromUrl(category.url, category.type) ?? ''
                      }
                    >
                      <a
                        onClick={() => setOpen(false)}
                        className="bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 group w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium rounded-md"
                      >
                        {category.title}
                      </a>
                    </Link>
                  ) : (
                    <Disclosure
                      as="div"
                      key={category.title}
                      className="space-y-1"
                    >
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 group w-full flex items-center pr-2 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <svg
                              className={classNames(
                                open
                                  ? 'text-gray-400 rotate-90'
                                  : 'text-gray-300',
                                'mr-2 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                              )}
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path
                                d="M6 6L14 10L6 14V6Z"
                                fill="currentColor"
                              />
                            </svg>
                            {category.title}
                          </Disclosure.Button>
                          <Disclosure.Panel className="space-y-1">
                            {category.items.map((subItem) => (
                              <Disclosure.Button
                                key={subItem.title}
                                as="a"
                                href={
                                  extractHandleFromUrl(
                                    subItem.url,
                                    subItem.type
                                  ) ?? ''
                                }
                                className="group w-full flex items-center pl-10 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                              >
                                {subItem.title}
                              </Disclosure.Button>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )
                )}
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {userStore.user ? (
                  <>
                    <div className="flow-root">
                      <Link href="/account/">
                        <a className="-m-2 p-2 block font-medium text-gray-900">
                          Profile
                        </a>
                      </Link>
                    </div>
                    <div className="flow-root">
                      <span
                        className="-m-2 p-2 block font-medium text-gray-900 cursor-pointer"
                        onClick={handleSignOut}
                      >
                        Sign out
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flow-root">
                      <Link href="/account/login">
                        <a
                          onClick={() => setOpen(false)}
                          className="-m-2 p-2 block font-medium text-gray-900"
                        >
                          Sign in
                        </a>
                      </Link>
                    </div>
                    <div className="flow-root">
                      <Link href="/account/register">
                        <a
                          onClick={() => setOpen(false)}
                          className="-m-2 p-2 block font-medium text-gray-900"
                        >
                          Create account
                        </a>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
      <Container>
        <header className="relative">
          {/* Top navigation */}
          <nav
            aria-label="Top"
            className={classNames(
              'relative z-20 border-b transition-all duration-300 lg:px-0 px-6',
              onTop ? 'md:py-12' : 'py-2 border-transparent'
            )}
          >
            <div className="max-w-1432 mx-auto">
              <div className="h-16 flex items-center">
                <button
                  type="button"
                  className="bg-gray-200 rounded-md text-gray-400 lg:hidden p-2 mr-4"
                  onClick={() => setOpen(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <IconMenu className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="lg:flex lg:ml-0 hidden">
                  <Link href="/">
                    <a>
                      <span className="sr-only">Yas Natural Solutions</span>
                      <Image
                        width={186}
                        height={56}
                        priority={true}
                        className="w-auto h-14"
                        src="/images/brand-logo@3x.png"
                        alt="Yas Natural Solutions"
                      />
                    </a>
                  </Link>
                </div>

                <div className="ml-auto flex items-center mr-2">
                  <ul className="hidden gap-5 ml-7 lg:flex mr-12">
                    {menu?.map((category) => (
                      <li
                        key={category.resourceId}
                        className="text-sm group relative font-semibold cursor-pointer text-dark"
                      >
                        {(!category.items || category.items.length === 0) && (
                          <Link
                            href={
                              extractHandleFromUrl(
                                category.url,
                                category.type
                              ) ?? ''
                            }
                          >
                            <a>{category.title}</a>
                          </Link>
                        )}

                        {category.items && category.items.length > 0 && (
                          <>
                            <div className="flex items-center">
                              <span>{category.title}</span>
                              <svg
                                className="flex-shrink-0 h-5 w-5 rotate-90 group-hover:text-gray-400 text-gray-400"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path
                                  d="M6 6L14 10L6 14V6Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>
                            <ul
                              className="hidden group-hover:flex gap-3 flex-col absolute z-50 shadow-md bg-white p-3 rounded-md"
                              style={{ minWidth: 250 }}
                            >
                              {category.items.map((i) => (
                                <li
                                  key={i.resourceId}
                                  className="hover:bg-dark p-2 rounded-md hover:text-white transition-all duration-300"
                                >
                                  <Link
                                    href={
                                      extractHandleFromUrl(i.url, i.type) ?? ''
                                    }
                                  >
                                    <a className={classNames('text-sm')}>
                                      {i.title}
                                    </a>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>

                  {/* Search */}
                  <div
                    onClick={() => setIsSearchOpen(true)}
                    className="flex md:mr-10 text-gray-400 hover:text-gray-500 cursor-pointer"
                  >
                    <Image
                      src="/images/icons-search.svg"
                      width={40}
                      height={40}
                      alt="Search Icon"
                    />
                  </div>

                  {/* User */}
                  <div className="hidden md:flex mr-10">
                    <div className=" text-gray-400 hover:text-gray-500 group relative cursor-pointer">
                      <Image
                        src="/images/icons-account.svg"
                        width={40}
                        height={40}
                        alt="Search Icon"
                      />

                      <ul
                        className="hidden group-hover:flex gap-3 flex-col absolute z-50 shadow-md right-0 -left-32 bg-white p-3 rounded-md"
                        style={{ minWidth: 250 }}
                      >
                        {userStore.user
                          ? renderAuthenticatedUser()
                          : renderAnonymouseUser()}
                      </ul>
                    </div>
                  </div>

                  <Link href="/cart">
                    <a>
                      <Image
                        src="/images/icons-checkout.svg"
                        width={40}
                        height={40}
                        alt="Basket Icon"
                        className="md:hidden"
                      />
                    </a>
                  </Link>

                  {/* Cart */}
                  <div className="ml-4 hidden relative md:flex">
                    <PopupCart
                      isOpen={cartOpen}
                      onCartClose={() => {
                        setCartOpen(false);
                      }}
                    />
                    <a
                      href="#"
                      className="group w-16 h-16 flex items-center justify-center bg-dark rounded-full relative hover:bg-cool"
                      onClick={handleDisplayCart}
                    >
                      <span className="text-sm  absolute -top-1 -right-2 bg-highlight rounded-full text-white w-6 h-6 flex justify-center items-center">
                        {cartStore.items.length > 9
                          ? '+9'
                          : cartStore.items.length}
                      </span>
                      <Image
                        src="/images/icon-basket.svg"
                        width={40}
                        height={40}
                        alt="Basket Icon"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </Container>
    </div>
  );
};

export default Header;
