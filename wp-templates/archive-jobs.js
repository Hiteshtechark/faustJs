import { useQuery, gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import React, { useState } from "react";
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import FilterButtons from '../components/Post/FilterButtons';
import {
    Header,
    Footer,
    Main,
    Container,
    NavigationMenu,
    Hero,
    SEO,
} from '../components';

export default function Page() {

    const { data } = useQuery(Page.query);

    const cat = data?.jobCategory?.nodes ?? [];
    const posts = data?.jobs?.nodes ?? [];

    const catdata = cat.map((Val) => {
        for (let i = 0; i < Val['jobCategory']['nodes'].length; i++) {
            return Val['jobCategory']['nodes'][i].name;
        }
    });

    const [item, setItem] = useState(posts);

    const menuItems = [...new Set(catdata)];

    const filterItem = (curcat) => {
        const newItem = posts.filter((newVal) => {
            for (let i = 0; i < newVal['jobCategory']['nodes'].length; i++) {
                if (newVal['jobCategory']['nodes'][i].name === curcat) {
                    return newVal['jobCategory']['nodes'][i].name;
                }
            }
        });
        setItem(newItem);
    };

    return (
        <>
            <div className="container">

                <main>
                    <h1 className="col-12 text-center my-3 fw-bold">Our Menu</h1>
                    <FilterButtons
                        filterItem={filterItem}
                        setItem={setItem}
                        menuItems={menuItems}
                        all_post={posts}
                    />
                    {posts.map((Val) => {
                       <span key={Val.id}>{Val.title}</span>
                    })}
                </main>
                <Footer>CopyRight@2023</Footer>
            </div>
        </>
    )
}

Page.query = gql`
    ${BlogInfoFragment}
    ${NavigationMenu.fragments.entry}
    query GetPageData(
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
        jobs:jobs {
              nodes {
                id
                title
                content                    
            }
        }
        jobCategory:jobs {
            nodes {
              jobCategory {
                nodes {
                  name
                  slug
                }
              }
            }
        }          
    }
`;
