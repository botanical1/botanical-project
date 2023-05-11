import { FC, ReactElement, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import classNames from 'classnames';

import { RouteGuard, Spinner } from '@shopify/components';
import { storefront } from '@shopify/utilities';
import { registerQuery } from '@shopify/graphql-queries';
import { RegisterResponseModel } from '@shopify/models';

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
  password?: ReactElement;
};

const Register: FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<InputErrors>({});
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);
    const registerResponse = await storefront<RegisterResponseModel>(
      registerQuery,
      {
        input: {
          ...(event.target.firstName.value && {
            firstName: event.target.firstName.value,
          }),
          ...(event.target.lastName.value && {
            lastName: event.target.lastName.value,
          }),
          ...(event.target.phone.value && { phone: event.target.phone.value }),
          email: event.target.email.value,
          password: event.target.password.value,
          acceptsMarketing: true,
        },
      }
    );

    const registeredUser = registerResponse?.data?.customerCreate?.customer;

    if (registeredUser) {
      toast.success('You have been registered successfully!');
      router.push('/account/login');
    } else if (registerResponse?.errors) {
      registerResponse.errors.forEach((error) => toast.error(error.message));
    } else {
      registerResponse.data.customerCreate.userErrors.forEach((error) =>
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
  return (
    <RouteGuard>
      <div className="min-h-full flex flex-col justify-center py-12 px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Register
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label
                  htmlFor="firstName"
                  className="flex items-center text-sm font-medium text-gray-700"
                >
                  First name
                  <span className="text-xs ml-1">(Optional)</span>
                </label>
                <div className="mt-1">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className={classNames(
                      InputsBaseCssClasses,
                      errors['firstName']
                        ? InputsErrorCssClasses
                        : InputsDefaultCssClasses
                    )}
                  />
                </div>
                {errors['firstName']}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                  <span className="text-xs ml-1">(Optional)</span>
                </label>
                <div className="mt-1">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className={classNames(
                      InputsBaseCssClasses,
                      errors['lastName']
                        ? InputsErrorCssClasses
                        : InputsDefaultCssClasses
                    )}
                  />
                </div>
                {errors['lastName']}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone number<span className="text-xs ml-1">(Optional)</span>
                </label>
                <div className="mt-1">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={classNames(
                      InputsBaseCssClasses,
                      errors['phone']
                        ? InputsErrorCssClasses
                        : InputsDefaultCssClasses
                    )}
                  />
                </div>
                {errors['phone']}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                  <span className="text-red-700 ml-1">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={classNames(
                      InputsBaseCssClasses,
                      errors['email']
                        ? InputsErrorCssClasses
                        : InputsDefaultCssClasses
                    )}
                  />
                </div>
                {errors['email']}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                  <span className="text-red-700 ml-1">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={classNames(
                      InputsBaseCssClasses,
                      errors['password']
                        ? InputsErrorCssClasses
                        : InputsDefaultCssClasses
                    )}
                  />
                </div>
                {errors['password']}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading && <Spinner />}
                  Register
                </button>
              </div>
              <div className="font-medium text-sm">
                <span>Already have an account?</span>
                <Link href="/account/login">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
                    Login
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </RouteGuard>
  );
};

export default Register;
