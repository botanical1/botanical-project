import { Breadcrumb, Container } from '@shopify/components';
import { pageQuery } from '@shopify/graphql-queries';
import { PageModel } from '@shopify/models';
import { storefront } from '@shopify/utilities';
import classNames from 'classnames';
import { GetServerSideProps } from 'next';
import React, { FC } from 'react';
import classes from './page.module.css';
interface Props {
  page: PageModel;
}

const Page: FC<Props> = ({ page: drivedPage }) => {
  const page = drivedPage.data.page;
  return (
    <Container className="min-h-[30vh] m-16 text-center">
      <h2 className="text-center text-5xl font-semibold font-raleway mb-3">
        {page.title}
      </h2>
      <Breadcrumb
        list={[
          {
            name: page.title,
            current: true,
            href: `/page/${page.handle}`,
          },
        ]}
      />
      <div
        className={classNames(
          'mt-10 font-normal text-center',
          classes['Content']
        )}
        dangerouslySetInnerHTML={{ __html: page.body }}
      ></div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const slug = context.params.slug;

  const page = await storefront<PageModel>(pageQuery(slug as string));

  return {
    props: {
      page,
    },
  } as any;
};

export default Page;
