import Link from "next/link";
import { TrajectoryArt } from "@/components/graphics/TrajectoryArt";
import { PendingBadge } from "@/components/ui/Pending";
import { formatDate, type Article } from "@/lib/articles";

function Meta({ a }: { a: Article }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600">
      <span className="t-kicker text-gold-text">{a.category}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={a.date}>{formatDate(a.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{a.readingMinutes} min de leitura</span>
    </p>
  );
}

export function ArticleFeature({ a }: { a: Article }) {
  return (
    <Link href={`/conhecimento/${a.slug}`} className="group block">
      <div className="overflow-hidden rounded-card">
        <TrajectoryArt
          seed={a.artSeed}
          tone="light"
          className="aspect-[16/10] transition-transform duration-[1.2s] ease-spac group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-7">
        <Meta a={a} />
        <h3 className="t-h3 mt-4 max-w-[24ch] text-graphite-900 decoration-gold decoration-2 underline-offset-[0.18em] group-hover:underline">
          {a.title}
        </h3>
        <p className="mt-4 max-w-[52ch] text-graphite-700">{a.excerpt}</p>
        {a.status === "rascunho" && (
          <div className="mt-5">
            <PendingBadge>Rascunho editorial</PendingBadge>
          </div>
        )}
      </div>
    </Link>
  );
}

export function ArticleRow({ a }: { a: Article }) {
  return (
    <Link
      href={`/conhecimento/${a.slug}`}
      className="group grid gap-3 border-b border-gray-200 py-8 first:pt-0 md:py-9"
    >
      <Meta a={a} />
      <h3 className="t-h4 max-w-[30ch] text-graphite-900 decoration-gold decoration-2 underline-offset-[0.18em] group-hover:underline">
        {a.title}
      </h3>
      <p className="line-clamp-2 max-w-[56ch] text-[0.9875rem] text-graphite-700">{a.excerpt}</p>
    </Link>
  );
}
