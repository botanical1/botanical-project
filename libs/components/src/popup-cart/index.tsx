import { FC, Fragment, useEffect, useRef, useState } from 'react';

import Image from 'next/future/image';

import { Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { useCartStore } from '@shopify/state';
import { IconChevronRight, IconShoppingCartOff } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useClickOutside } from '@shopify/hooks';

interface Props {
  isOpen: boolean;
  onCartClose: () => void;
}

const PopupCart: FC<Props> = ({ isOpen, onCartClose }) => {
  const [open, setOpen] = useState(isOpen);
  const cartStore = useCartStore();
  const router = useRouter();
  const ref = useRef();

  useClickOutside(ref, () => {
    setOpen(false);
    onCartClose();
  });

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleRemoveProduct = (e: any, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    cartStore.removeItem(id);
  };

  const handleGoToCart = (e: any) => {
    e.preventDefault();
    setOpen(false);
    router.push('/cart');
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <div
        className="absolute sm:right-0 overflow-y-auto z-50 sm:-top-6"
        ref={ref as any}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className="inline-block max-w-sm align-bottom h-[720px] overflow-y-auto bg-yasBackground rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-6">
            <div className="flex justify-between items-center mb-10">
              <div className="text-midway text-4xl">Shopping Bag</div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className="group w-16 h-16 flex items-center justify-center bg-yasBackgroundDark2 rounded-full relative hover:opacity-80"
                  onClick={() => {
                    setOpen(false);
                    onCartClose();
                  }}
                >
                  <XIcon className="h-8 w-8" color="white" />
                </button>
              </div>
            </div>
            <ul className="-my-6 divide-y divide-gray-200">
              {cartStore.items.length === 0 && (
                <div className="mt-20 flex items-center flex-col">
                  <IconShoppingCartOff size={60} color="#5046e5" />
                  <p className="text-2xl mt-4">Your cart is empty</p>
                </div>
              )}
              {cartStore.items.map((product) => (
                <li key={product.id} className=" bg-white rounded-lg p-6">
                  <div className="flex">
                    <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                      <Image
                        width={96}
                        height={96}
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>

                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between font-medium text-dark">
                          <h3 className="text-lg">
                            <a href={product.handle}>{product.title}</a>
                          </h3>
                          <p className="ml-4">${product.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 justify-between mt-5">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="text-center w-full flex items-center px-3 py-3 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      edit
                    </button>
                    <button
                      onClick={(e) => {
                        handleRemoveProduct(e, product.id);
                      }}
                      type="button"
                      className="w-full flex items-center px-3 py-3 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={handleGoToCart}
              type="submit"
              className="w-full mt-10 bg-dark hover:opacity-70 flex items-center justify-center border border-transparent rounded-full p-4 text-lg font-normal text-white focus:ring-0 focus:ring-offset-2"
            >
              Continue to checkout
              <div>
                <IconChevronRight />
              </div>
            </button>
          </div>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
};

export default PopupCart;
