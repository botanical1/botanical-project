import Image from 'next/future/image';
import Link from 'next/link';

const HeaderHero = () => {
  return (
    <section className="flex flex-col md:flex-row lg:flex-row justify-center items-center gap-0 my-16 md:gap-20 lg:gap-20">
      <div>
        <div className="sm:max-w-lg">
          <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Yas Natural Solutions
          </h1>
          <p className="mt-6 text-lg text-gray-500">
            Yas Natural Solutions is committed to formulating only those
            products that highlight the power of phytonutrients for our skin,
            delivered in packaging that creates zero plastic waste.
          </p>
        </div>
        <div>
          <div className="mt-10">
            <Link href="/collections">
              <a className="inline-block text-center bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700">
                Show Collections
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8 absolute opacity-10 md:relative lg:relative md:opacity-100 lg:opacity-100 -z-10 md:z-10 lg:z-10 overflow-hidden">
        <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
          <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
            <Image
              src="/images/hero/8.jpg"
              width={237}
              height={346}
              priority={true}
              alt=""
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="w-44 h-64 rounded-lg overflow-hidden">
            <Image
              src="/images/hero/2.jpg"
              width={237}
              height={346}
              priority={true}
              alt=""
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>
        <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
          <div className="w-44 h-64 rounded-lg overflow-hidden">
            <Image
              src="/images/hero/3.jpg"
              width={237}
              height={346}
              priority={true}
              alt=""
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="w-44 h-64 rounded-lg overflow-hidden">
            <Image
              src="/images/hero/4.jpg"
              width={237}
              height={346}
              priority={true}
              alt=""
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="w-44 h-64 rounded-lg overflow-hidden">
            <Image
              src="/images/hero/5.jpg"
              width={237}
              height={346}
              priority={true}
              alt=""
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>
        <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
          <div className="w-44 h-64 rounded-lg overflow-hidden">
            <Image
              src="/images/hero/6.jpg"
              width={237}
              height={346}
              priority={true}
              alt=""
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="w-44 h-64 rounded-lg overflow-hidden">
            <Image
              src="/images/hero/7.jpg"
              width={237}
              height={346}
              priority={true}
              alt=""
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderHero;
