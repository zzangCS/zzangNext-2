import { getFeaturedEvents } from "@/helpers/api-util";
import EventList from "@/components/events/EventList/EventList";

export default function HomePage({ featuredEvents }) {
  if (!featuredEvents) {
    return <p>Loading...</p>;
  }

  return (
    <div>
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
