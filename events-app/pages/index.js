import EventList from "@/components/events/EventList/EventList";
import { getFeaturedEvents } from "@/dummy-data";

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <ul>
        <EventList items={featuredEvents} />
      </ul>
    </div>
  );
}
