import { Fragment } from "react";
import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import EventList from "@/components/events/EventList/EventList";
import EventsSearch from "@/components/events/EventsSearch/EventsSearch";

export default function AllEventsPage() {
  const router = useRouter();
  const events = getAllEvents();

  const findEvents = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={findEvents} />
      <EventList items={events} />
    </Fragment>
  );
}
