import AppLayout from "core/layouts/AppLayout";
import BookingHistory from "../components/history/BookingHistory";

const History = () => {
  return (
    <AppLayout>
      <BookingHistory perPage={10} />
    </AppLayout>
  );
};

export default History;
