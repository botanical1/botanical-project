import { FC, ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import { AccountLayout, Spinner } from '@shopify/components';
import { storefront } from '@shopify/utilities';
import { updateAddressQuery } from '@shopify/graphql-queries';
import { UpdateAddressResponseModel } from '@shopify/models';
import { useUserStore } from '@shopify/state';

const UnitedStatesProvince = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

type InputErrors = {
  firstName?: ReactElement;
  lastName?: ReactElement;
  company?: ReactElement;
  address1?: ReactElement;
  address2?: ReactElement;
  city?: ReactElement;
  country?: ReactElement;
  province?: ReactElement;
  zip?: ReactElement;
  phone?: ReactElement;
};

type FormValuesType = {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  province: string;
  zip: string;
  phone: string;
};

const Address: FC = () => {
  const router = useRouter();
  const addressID = `gid://shopify/MailingAddress/${router.query.id}?model_name=${router.query.model_name}`;
  const userStore = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<InputErrors>({});
  const [formValues, setFormValues] = useState<FormValuesType>({
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    province: '',
    zip: '',
    phone: '',
  });
  const handleOnChangeFormInputs = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);
    const createAddressResponse = await storefront<UpdateAddressResponseModel>(
      updateAddressQuery,
      {
        address: {
          firstName: event.target.firstName.value,
          lastName: event.target.lastName.value,
          company: event.target.company.value,
          address1: event.target.address1.value,
          address2: event.target.address2.value,
          city: event.target.city.value,
          country: event.target.country.value,
          province: event.target.province.value,
          zip: event.target.zip.value,
          phone: event.target.phone.value,
        },
        customerAccessToken:
          localStorage.getItem('token') || sessionStorage.getItem('token'),
        id: addressID,
      }
    );
    const updatedAddress =
      createAddressResponse?.data?.customerAddressUpdate?.customerAddress;
    if (updatedAddress) {
      toast.success('Your address has been Updated successfully!');
      router.push('/account/addresses');
      userStore.getUser();
    } else {
      createAddressResponse?.data?.customerAddressUpdate?.customerUserErrors.forEach(
        (error) => {
          if (error.field[1]) {
            setErrors((prevState) => ({
              ...prevState,
              [error.field[1]]: (
                <div className="text-xs font-medium text-red-700 mt-1">
                  {error.message}
                </div>
              ),
            }));
          } else {
            toast.error(error.message);
          }
        }
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userStore.user) {
      const foundedAddress = userStore.user?.addresses?.nodes?.find((address) =>
        address.id.includes(addressID)
      );
      setFormValues({
        firstName: foundedAddress?.firstName,
        lastName: foundedAddress?.lastName,
        company: foundedAddress?.company,
        address1: foundedAddress?.address1,
        address2: foundedAddress?.address2,
        city: foundedAddress?.city,
        country: foundedAddress?.country,
        province: foundedAddress?.province,
        zip: foundedAddress?.zip,
        phone: foundedAddress?.phone,
      });
    }
  }, [userStore.user, addressID]);
  return (
    <AccountLayout page="Addresses">
      <div className="space-y-6 sm:px-6 px-4 lg:px-0 lg:col-span-9">
        <section aria-labelledby="payment-details-heading">
          <form noValidate onSubmit={handleSubmit}>
            <div className="shadow rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 sm:p-6">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  Addresses
                </h1>

                <div className="mt-6 grid grid-cols-4 gap-6">
                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      autoComplete="cc-given-name"
                      onChange={handleOnChangeFormInputs}
                      value={formValues.firstName}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors['firstName']}
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      autoComplete="cc-family-name"
                      value={formValues.lastName}
                      onChange={handleOnChangeFormInputs}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors['lastName']}
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={formValues.company}
                      onChange={handleOnChangeFormInputs}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors['company']}
                  </div>
                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="address1"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      name="address1"
                      id="address1"
                      value={formValues.address1}
                      onChange={handleOnChangeFormInputs}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors['address1']}
                  </div>
                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="address2"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      name="address2"
                      id="address2"
                      value={formValues.address2}
                      onChange={handleOnChangeFormInputs}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors['address2']}
                  </div>
                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      value={formValues.city}
                      onChange={handleOnChangeFormInputs}
                      type="text"
                      name="city"
                      id="city"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors['city']}
                  </div>
                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      value="United States"
                      onChange={handleOnChangeFormInputs}
                      disabled
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                    />
                    {errors['country']}
                  </div>
                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State / Province
                    </label>
                    <select
                      id="province"
                      name="province"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      defaultValue="Alabama"
                      value={formValues.province}
                      onChange={handleOnChangeFormInputs}
                    >
                      {UnitedStatesProvince.map((province, index) => (
                        <option key={index}>{province}</option>
                      ))}
                    </select>
                    {errors['province']}
                  </div>
                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="zip"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Zip / Postal Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      id="zip"
                      value={formValues.zip}
                      onChange={handleOnChangeFormInputs}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors['zip']}
                  </div>
                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      autoComplete="phone"
                      value={formValues.phone}
                      onChange={handleOnChangeFormInputs}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors['phone']}
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full sm:w-24 justify-center items-center bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading && <Spinner />}
                  Update
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </AccountLayout>
  );
};

export default Address;
