import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Ramesh Kumar",
    rating: 5,
    review:
      "Excellent treatment and friendly doctors. Highly recommended for families.",
  },
  {
    name: "Priya",
    rating: 5,
    review:
      "Very clean clinic and caring staff. The doctor explained everything clearly.",
  },
  {
    name: "Karthik",
    rating: 5,
    review:
      "Good experience. Quick appointment and professional service.",
  },
];

function ReviewsSection() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <p className="font-semibold uppercase tracking-widest text-secondary">
            Patient Reviews
          </p>

          <h2 className="mt-4 text-4xl font-bold text-primary">
            What Our Patients Say
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-text">
            We are proud to provide quality healthcare and compassionate service
            to every patient.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl bg-white p-8 shadow-md"
            >
              <div className="mb-4 flex text-secondary">
                {[...Array(review.rating)].map((_, index) => (
                  <FaStar key={index} />
                ))}
              </div>

              <p className="italic text-text">
                "{review.review}"
              </p>

              <h3 className="mt-6 text-lg font-semibold text-primary">
                {review.name}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ReviewsSection;