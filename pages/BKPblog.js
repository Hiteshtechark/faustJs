import { gql, useQuery } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import React, { useState, useEffect } from "react";
import Link from "next/link"
import { useRouter } from 'next/router';
import {
  Header,
  Hero,
  Footer,
  Main,
  Container,
  NavigationMenu,
  SEO,
  Post
} from '../components';
import { getNextStaticProps } from '@faustwp/core';

export default function Page(props) {

  const router = useRouter();
  const { page } = router.query;
  const currentPage = page || 1;

  useEffect(() => {
    router.push("?page=" + currentPage);
  }, []);

  var offset = 4;
  const { data } = useQuery(Page.query, {
    variables: Page.variables(offset),
  });

  const title = props.title;

  const { title: siteTitle, description: siteDescription } = data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];
  const posts_data = data?.posts_data?.nodes ?? [];
  const all_posts = data?.all_posts?.nodes ?? [];

  const pageNumber = [];
  const postPerPage = 2;
  for (let i = 1; i <= Math.ceil(all_posts.length / postPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <Container>
          <Hero title={title} />
          <div className="text-center">
            <p>This page is utilizing the Next.js File based routes.</p>
            <code>pages/example.js</code>
          </div>
          {posts_data.map((post) => {
            return (
              <Post post={post} ></Post>
            )
          })}
          {pageNumber.map((Elem) => {
            const href_link = "?page=" + Elem;
            return (
              <>
                <Link href={href_link} className="card" key={Elem}>
                  <a className="card">
                    {Elem}
                  </a>
                </Link>
              </>
            );
          })}
        </Container>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Page.variables = ({ offset }) => {
  return {
    offset: 4,
    postPerPage: 2,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};

Page.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData(  
    $offset:Int,
    $postPerPage: Int,    
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum    
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    posts_data: posts(where: { offsetPagination: { size:$postPerPage , offset: $offset } }) {
        pageInfo {
            offsetPagination {             
                hasMore
                hasPrevious
                total
            }
        }
        nodes {
            id
            title
            slug
        }
    }
    all_posts: posts{    
        nodes {
            id
            title
            slug
        }
    }
  }
`;

export function getStaticProps(ctx) {
  return getNextStaticProps(ctx, { Page, props: { title: 'File Page Example' } });
}
