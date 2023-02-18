import { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "@/helpers/api-util";
import EventSummary from "@/components/event-detail/EventSummary/EventSummary";
import EventLogistics from "@/components/event-detail/EventLogistics/EventLogistics";
import EventContent from "@/components/event-detail/EventContent/EventContent";
import ErrorAlert from "@/components/common/ErrorAlert/ErrorAlert";
import Head from "next/head";

export default function EventDetailPage({ event }) {
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>

      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const eventId = params.eventId;

  const event = await getEventById(eventId);

  return {
    props: { event },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const filteredEvents = await getFeaturedEvents();

  const paths = filteredEvents.map((event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths: paths,
    fallback: true,
  };
}
