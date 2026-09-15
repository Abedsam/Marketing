import { Star } from "lucide-react";

export type Review = {
  author: string;
  text: string;
  source?: string;
};

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex w-[320px] shrink-0 flex-col gap-3 rounded-[2px] border border-dl-ink/10 bg-white/60 p-6">
      <div className="flex gap-1 text-dl-burgundy">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-dl-ink/80">
        &ldquo;{review.text}&rdquo;
      </p>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-dl-ink/45">
        {review.author}
        {review.source ? ` · ${review.source}` : ""}
      </p>
    </div>
  );
}

export function ReviewMarquee({
  reviews,
  reverse = false,
  speed = 64,
}: {
  reviews: Review[];
  reverse?: boolean;
  speed?: number;
}) {
  return (
    <div
      className="dl-marquee-wrap relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className={`dl-marquee-track${reverse ? " dl-marquee-track--reverse" : ""} flex w-max gap-5`}
        style={{ animationDuration: `${speed}s` }}
      >
        {[...reviews, ...reviews].map((review, i) => (
          <div key={i} aria-hidden={i >= reviews.length}>
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  );
}
