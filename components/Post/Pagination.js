import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function Pagination({ pageNumber }) {
  console.log(pageNumber);
  return '';
  /* return (
    <>
      <div className="container-fluid">
        <div className="row">
          {pageNumber.map((Elem) => {
            const href_link = "?page=" + Elem;
            return (
              <>
                <button onClick={() => ChangePage(Elem, href_link)} className="px-3 py-1 m-1 text-center btn-outline-dark" key={Elem}>
                  {Elem}
                </button>
              </>
            );
          })}
        </div>
      </div>
    </>
  ); */
};

