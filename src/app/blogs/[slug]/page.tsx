import { Metadata } from "next";

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(props: BlogPostProps): Promise<Metadata> {
  const params = await props.params;
  // In the future, fetch actual blog metadata based on the slug
  return {
    title: `Blog Post: ${params.slug} | Wolgan`,
    description: `Read our latest insights on ${params.slug} at Wolgan Water Treatment.`,
  };
}

export default async function BlogPost(props: BlogPostProps) {
  const params = await props.params;
  const { slug } = params;

  // Space created for future data fetching.
  // const post = await getBlogPost(slug);
  // if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#0A1F3C] pt-32 pb-24">
      <article className="container mx-auto px-6 max-w-4xl">
        {/* Header section: Title, Date, Author */}
        <header className="mb-12 text-center flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#66B2E8]/30 bg-[#66B2E8]/10 text-[#66B2E8] text-sm font-medium mb-6">
            Category Placeholder
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight capitalize">
            Blog Title Placeholder for: <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#66B2E8] to-[#a3d8fc]">{slug.replace(/-/g, ' ')}</span>
          </h1>
          <div className="flex items-center justify-center gap-4 text-white/60 text-sm">
            <span>By Wolgan Expert</span>
            <span>•</span>
            <time dateTime="2026-08-01">August 1, 2026</time>
          </div>
        </header>

        {/* Hero Image Space */}
        <div className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-16 bg-white/5 border border-white/10 flex items-center justify-center">
          {/* In the future:
            <Image src={post.heroImage} alt={post.title} fill className="object-cover" />
          */}
          <span className="text-white/40 text-lg">Hero Image Placeholder</span>
        </div>

        {/* Body Content Space */}
        <div className="prose prose-invert prose-lg max-w-none text-white/80 leading-relaxed">
          <p>
            This is the placeholder layout for the individual blog post pages. The layout is set up to receive the dynamic slug: <strong>{slug}</strong>.
          </p>
          <p className="mt-6">
            Space has been reserved here for the main body of the article. When the content is ready, this area will be populated with headings, paragraphs, lists, and images to form a comprehensive blog post.
          </p>
          <h2 className="text-2xl text-white font-medium mt-12 mb-6">Example Subheading</h2>
          <p>
            You can inject rich text or markdown content directly into this container. The styling is already prepared for long-form reading with appropriate line heights, text colors, and spacing.
          </p>
        </div>
      </article>
    </main>
  );
}
