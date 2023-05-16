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
  console.log(cartStore.items);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div className="bg-[#fefbf7]/50 backdrop-blur-[10px] px-10 pt-8 pb-10 min-h-[400px] max-h-[720px] w-[420px] absolute flex flex-col items-center justify-between -top-2 sm:-right-2 overflow-y-auto z-50 inline-block max-w-sm align-bottom overflow-y-auto rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:align-middle no-scrollbar">
          <div className="flex justify-between items-center w-full">
            <div className="text-midway text-4xl font-arsenal">
              Shopping Bag
            </div>
            <div className="p-2 absolute top-0 right-0 flex-shrink-0 flex">
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
          <ul className="w-full divide-y divide-gray-200 mt-10">
            {!cartStore?.items?.length ? (
              <div className=" flex items-center flex-col">
                <IconShoppingCartOff size={60} color="#5046e5" />
                <p className="text-2xl">Your cart is empty</p>
              </div>
            ) : (
              cartStore.items.map((product) => (
                <li
                  key={product.id}
                  className="mb-4 bg-white/50 h-[152px] shadow-[0_6px_8px_0px_rgba(0, 0, 0, 0.05)] p-4 rounded-lg"
                >
                  <div className="flex">
                    <div className="flex-shrink-0 w-14 h-14 border border-gray-200 rounded-md overflow-hidden">
                      <Image
                        width={56}
                        height={56}
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>

                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex items-center justify-between font-medium text-dark font-poppins">
                          <h3 className="text-lg">
                            <a
                              href={product.handle}
                              className="inline-block text-ellipsis overflow-hidden whitespace-nowrap w-[150px]"
                            >
                              {product.title}
                            </a>
                          </h3>
                          <p className="ml-2">${product.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 justify-between mt-5">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="bg-white py-3 w-[156px] text-center border-none flex items-center justify-center border shadow-sm text-sm font-medium rounded-md text-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      edit
                    </button>
                    <button
                      onClick={(e) => {
                        handleRemoveProduct(e, product.id);
                      }}
                      type="button"
                      className="bg-white py-3 w-[156px] text-center border-none flex items-center justify-center border shadow-sm text-sm font-medium rounded-md text-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      remove
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
          <button
            onClick={handleGoToCart}
            type="submit"
            className="w-full mt-4 font-poppins bg-dark hover:opacity-70 flex items-center justify-center border border-transparent rounded-full text-lg font-normal text-white focus:ring-0 focus:ring-offset-2 py-3.5"
          >
            Continue to checkout
            <div>
              <IconChevronRight />
            </div>
          </button>
        </div>
      </Transition.Child>
    </Transition.Root>
    // </div>
  );
};

export default PopupCart;
