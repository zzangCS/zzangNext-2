import { getFeaturedEvents } from "@/helpers/api-util";
import EventList from "@/components/events/EventList/EventList";
import Head from "next/head";
import NewsletterRegistration from "@/components/input/NewsletterRegistration/NewsletterRegistration";

export default function HomePage({ featuredEvents }) {
  if (!featuredEvents) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Head>
        <title> Events App</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>

      <NewsletterRegistration />
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: { featuredEvents },
    revalidate: 1800,
  };
}
