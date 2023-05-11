import {
  IconShieldChevron,
  IconShoppingCartPlus,
  IconTruckDelivery,
} from '@tabler/icons';

import Image from 'next/future/image';

import Container from '../container';

const perks = [
  {
    name: '30 day guarantee',
    Icon: (
      <Image
        width={80}
        height={80}
        src="/images/icons-level-2-gaurantee@3x.png"
        alt="30 Day Money Back Guarantee"
      />
    ),
    description:
      'The most effective treatment for all types of skin ailments or your money back.',
  },
  {
    name: 'free delivery',
    Icon: (
      <Image
        width={80}
        height={80}
        src="/images/icons-level-2-shipping@3x.png"
        alt="Free Delivery"
      />
    ),
    description:
      'All purchases over $50 will be shipped free to addesses within the United States.',
  },
  {
    name: 'all year discount',
    Icon: (
      <Image
        width={80}
        height={80}
        src="/images/icons-level-2-discount@3x.png"
        alt="All year discount"
      />
    ),
    description:
      'For amazing deals, use the code "ALLYEAR" at checkout year round.',
  },
  {
    name: 'for the planet',
    Icon: (
      <Image
        width={80}
        height={80}
        src="/images/icons-level-2-planet@3x.png"
        alt="For the planet"
      />
    ),
    description:
      'We pledged 1% of sales to preserve and restore natural environments.',
  },
];

const Perks = () => {
  return (
    <section aria-labelledby="perks-heading">
      <Container>
        <div className="md:flex md:items-center md:justify-between md:flex-col">
          <h2 className="text-52 text-center font-medium -tracking-2 text-neutral">
            Why Yas Natural Solutions?
          </h2>
        </div>
      </Container>

      <div className="max-w-1432 mx-auto pt-24 px-4 sm:px-6  sm:pt-16 lg:px-8">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
          {perks.map((perk) => {
            return (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="flow-root h-20 w-20">{perk.Icon}</div>
                </div>
                <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                  <h3 className="text-sm md:text-2xl font-semibold tracking-wide uppercase text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm md:text-base font-normal text-gray-500">
                    {perk.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Perks;
