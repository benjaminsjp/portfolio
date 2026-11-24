const GITHUB_URL = "https://github.com/benjaminsjp";
const PLACEHOLDER_COUNT = 3;

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-sm focus:text-background"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-10 border-b border-border/80 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
          <a
            href="#main"
            className="text-sm font-medium tracking-tight text-foreground"
          >
            Benjamin Pedersen
          </a>
          <nav aria-label="Primary" className="flex items-center gap-7 text-sm">
            <a
              href="#projects"
              className="text-muted transition-colors hover:text-foreground"
            >
              Work
            </a>
            <a
              href={GITHUB_URL}
              className="text-muted transition-colors hover:text-foreground"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main id="main" className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6">
        <section className="flex flex-col gap-6 py-20 sm:py-28 md:py-32">
          <p className="text-sm tracking-[0.18em] text-muted uppercase">
            Portfolio
          </p>
          <h1 className="max-w-3xl font-serif text-5xl leading-[1.1] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Benjamin Pedersen
          </h1>
          <p className="max-w-xl text-lg leading-8 text-muted sm:text-xl">
            Student at Glemmen VGS in Fredrikstad. This is a quiet place for
            selected work as it takes shape.
          </p>
        </section>

        <section id="projects" className="scroll-mt-24 pb-24">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
              Selected work
            </h2>
            <p className="max-w-sm text-sm leading-6 text-muted">
              Project details will appear here. These cards are placeholders
              until work is ready to share.
            </p>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => (
              <li key={index}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
                  <div
                    className="aspect-[16/10] bg-[linear-gradient(135deg,#efeae2_0%,#e4ddd3_100%)]"
                    aria-hidden="true"
                  />
                  <div className="flex flex-1 flex-col gap-2 px-5 py-5">
                    <p className="text-xs tracking-[0.16em] text-muted uppercase">
                      Coming soon
                    </p>
                    <h3 className="text-base font-medium tracking-tight">
                      Untitled project
                    </h3>
                    <p className="text-sm leading-6 text-muted">
                      No description yet.
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Benjamin Pedersen</p>
          <a
            href={GITHUB_URL}
            className="transition-colors hover:text-foreground"
            rel="noreferrer"
            target="_blank"
          >
            github.com/benjaminsjp
          </a>
        </div>
      </footer>
    </div>
  );
}
