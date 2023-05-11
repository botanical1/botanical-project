import { FC, Fragment, useRef, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';

import { AccountLayout, Spinner } from '@shopify/components';
import { useUserStore } from '@shopify/state';
import { storefront } from '@shopify/utilities';
import {
  deleteAddressQuery,
  updateCustomerDefaultAddressQuery,
} from '@shopify/graphql-queries';
import {
  DeleteAddressResponseModel,
  UpdateDefaultAddressResponseModel,
} from '@shopify/models';

const Addresses: FC = () => {
  const userStore = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const defaultAddress = userStore.user?.defaultAddress;

  const [selectedAddressForDelete, setSelectedAddressForDelete] =
    useState<string>(null);

  const handleDelete = async (addressID: string) => {
    setLoading(true);
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token') || '';

    const deleteAddressResponse = await storefront<DeleteAddressResponseModel>(
      deleteAddressQuery,
      {
        customerAccessToken: token,
        id: addressID,
      }
    );
    if (!deleteAddressResponse.data.customerUserErrors?.length) {
      toast.success('The address has been deleted successfully!');
      userStore.getUser();
    } else {
      toast.error('The address has not been deleted!');
    }
    setLoading(false);
    setIsModalOpen(false);
  };

  const handleSetDefaultAddress = async (addressID: string) => {
    setLoading(true);
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token') || '';
    const defaultAddressResponse =
      await storefront<UpdateDefaultAddressResponseModel>(
        updateCustomerDefaultAddressQuery,
        {
          addressId: addressID,
          customerAccessToken: token,
        }
      );
    if (defaultAddressResponse?.data?.customerDefaultAddressUpdate) {
      toast.success('The default address has been set successfully!');
      userStore.getUser();
    }
  };

  return (
    <AccountLayout page="Addresses">
      <div className="sm:px-6 px-4 lg:px-0 lg:col-span-9">
        <section aria-labelledby="payment-details-heading">
          <div className="sm:overflow-hidden">
            <div className="pb-6 sm:pb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  Addresses
                </h1>
                <Link href="/account/addresses/create">
                  <a className="text-indigo-600 hover:text-indigo-900">
                    Create new address
                  </a>
                </Link>
              </div>
              <div className="flex flex-col mt-6">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-white">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Address 1
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              City
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Default address
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {userStore.user?.addresses.nodes.map((address) => {
                            const href =
                              address.id.split('/')[
                                address.id.split('/').length - 1
                              ];
                            return (
                              <tr key={address.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {address.firstName} {address.lastName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {address.address1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {address.city}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <input
                                    id="defaultAddress"
                                    name="defaultAddress"
                                    onClick={() =>
                                      handleSetDefaultAddress(address.id)
                                    }
                                    checked={address.id === defaultAddress.id}
                                    type="checkbox"
                                    disabled={loading}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                  />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <Link href={`/account/addresses/${href}`}>
                                    <a className="text-indigo-600 hover:text-indigo-900">
                                      Edit
                                    </a>
                                  </Link>
                                  <button
                                    type="button"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      setIsModalOpen(true);
                                      setSelectedAddressForDelete(address.id);
                                    }}
                                    className="inline-flex ml-3 items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300"
                                  >
                                    delete
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Transition.Root show={isModalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed z-10 inset-0 overflow-y-auto"
            initialFocus={cancelButtonRef}
            onClose={setIsModalOpen}
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Delete the address
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete the address?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      disabled={loading}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => handleDelete(selectedAddressForDelete)}
                    >
                      {loading && <Spinner />}
                      Yes, delete it!
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setIsModalOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </AccountLayout>
  );
};

export default Addresses;
