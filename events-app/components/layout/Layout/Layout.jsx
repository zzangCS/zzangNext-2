import MainHeader from "@/components/common/MainHeader/MainHeader";
import React, { Fragment } from "react";

export default function Layout({ children }) {
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
    </Fragment>
  );
}
