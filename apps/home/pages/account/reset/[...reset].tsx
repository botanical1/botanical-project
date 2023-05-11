import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import { Breadcrumb, Spinner } from '@shopify/components';
import { storefront } from '@shopify/utilities';
import { resetPasswordQuery } from '@shopify/graphql-queries';
import { ResetPasswordResponseModel } from '@shopify/models';

const breadcrumbList = [
  { name: 'Account', href: '/account', current: false },
  { name: 'reset', href: '/account/reset', current: true },
];

const ResetPassword: FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [resetURL, setResetURL] = useState<string>('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const loginResponse = await storefront<ResetPasswordResponseModel>(
      resetPasswordQuery,
      {
        resetUrl: resetURL,
        password: event.target.password.value,
      }
    );
    const token =
      loginResponse?.data?.customerResetByUrl?.customerAccessToken?.accessToken;
    if (token) {
      toast.success('You have resetted your password successfully!');
      router.push('/account/login');
    } else {
      loginResponse.data.customerResetByUrl.customerUserErrors.forEach(
        (error) => toast.error(error.message)
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    setResetURL(window.location.href);
  }, []);

  return (
    <div className="min-h-full flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Reset Password
        </h2>
        <div className="flex justify-center">
          <Breadcrumb list={breadcrumbList} />
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading && <Spinner />}
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
