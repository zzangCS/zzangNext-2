import React, { Fragment, useContext } from "react";
import { NotificationContext } from "@/store/notificationContext";
import MainHeader from "@/components/common/MainHeader/MainHeader";
import Notification from "@/components/common/Notification/Notification";

export default function Layout({ children }) {
  const { notification } = useContext(NotificationContext);

  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>

      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </Fragment>
  );
}
