import { FC, useState, useEffect, ReactElement } from 'react';
import classNames from 'classnames';
import toast from 'react-hot-toast';

import { AccountLayout, Spinner } from '@shopify/components';
import { useUserStore } from '@shopify/state';
import { storefront } from '@shopify/utilities';
import { updateUserQuery } from '@shopify/graphql-queries';
import { UpdateUserResponseModel } from '@shopify/models';

const InputsBaseCssClasses =
  'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm';
const InputsDefaultCssClasses =
  'border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500';
const InputsErrorCssClasses =
  'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500';

type InputErrors = {
  firstName?: ReactElement;
  lastName?: ReactElement;
  phone?: ReactElement;
  email?: ReactElement;
};

type FormValuesType = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

const Account: FC = () => {
  const userStore = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<InputErrors>({});
  const [formValues, setFormValues] = useState<FormValuesType>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
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
    const updatedUserResponse = await storefront<UpdateUserResponseModel>(
      updateUserQuery,
      {
        customer: {
          ...(event.target.firstName.value && {
            firstName: event.target.firstName.value,
          }),
          ...(event.target.lastName.value && {
            lastName: event.target.lastName.value,
          }),
          ...(event.target.phone.value && { phone: event.target.phone.value }),
          email: event.target.email.value,
        },
        customerAccessToken:
          localStorage.getItem('token') || sessionStorage.getItem('token'),
      }
    );
    const newCustomer = updatedUserResponse?.data?.customerUpdate?.customer;
    if (newCustomer) {
      userStore.getUser();
      toast.success('Your profile has been updated successfully!');
    } else {
      updatedUserResponse?.data?.customerUpdate?.customerUserErrors?.forEach(
        (error) =>
          setErrors((prevState) => ({
            ...prevState,
            [error.field[1]]: (
              <div className="text-xs font-medium text-red-700 mt-1">
                {error.message}
              </div>
            ),
          }))
      );
    }
    setLoading(false);
  };
  useEffect(() => {
    if (userStore.user) {
      setFormValues({
        firstName: userStore.user.firstName,
        lastName: userStore.user.lastName,
        phone: userStore.user.phone,
        email: userStore.user.email,
      });
    }
  }, [userStore.user]);

  return (
    <AccountLayout page="Profile">
      <div className="space-y-6 sm:px-6 px-4 lg:px-0 lg:col-span-9">
        <section aria-labelledby="payment-details-heading">
          <form noValidate onSubmit={handleSubmit}>
            <div className="shadow rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 sm:p-6">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  Profile
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
                      value={formValues.firstName}
                      onChange={handleOnChangeFormInputs}
                      className={classNames(
                        InputsBaseCssClasses,
                        errors['firstName']
                          ? InputsErrorCssClasses
                          : InputsDefaultCssClasses
                      )}
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
                      className={classNames(
                        InputsBaseCssClasses,
                        errors['lastName']
                          ? InputsErrorCssClasses
                          : InputsDefaultCssClasses
                      )}
                    />
                    {errors['lastName']}
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="email"
                      value={formValues.email}
                      onChange={handleOnChangeFormInputs}
                      disabled
                      className={classNames(
                        InputsBaseCssClasses,
                        errors['email']
                          ? InputsErrorCssClasses
                          : InputsDefaultCssClasses,
                        'disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none'
                      )}
                    />
                    {errors['email']}
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
                      className={classNames(
                        InputsBaseCssClasses,
                        errors['phone']
                          ? InputsErrorCssClasses
                          : InputsDefaultCssClasses
                      )}
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
                  Save
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </AccountLayout>
  );
};

export default Account;
