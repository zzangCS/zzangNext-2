import { getFeaturedEvents } from "@/helpers/api-util";
import EventList from "@/components/events/EventList/EventList";

export default function HomePage({ featuredEvents }) {
  if (!featuredEvents) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ul>
        <EventList items={featuredEvents} />
      </ul>
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
