import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getAllEvents } from "@/helpers/api-util";
import EventList from "@/components/events/EventList/EventList";
import EventsSearch from "@/components/events/EventsSearch/EventsSearch";

export default function AllEventsPage({ events }) {
  const router = useRouter();

  const findEvents = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  if (!events) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <Head>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <EventsSearch onSearch={findEvents} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: { events },
    revalidate: 60,
  };
}
