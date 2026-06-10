import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader, SiteFooter, Ticker } from "../components/site-chrome";
import { AnimatedBackground } from "../components/animated-background";
import { SplashScreen } from "../components/splash-screen";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ChainForge — The Forex Mafia" },
      { name: "description", content: "Institutional-grade payment infrastructure and AI-driven trading intelligence." },
      { name: "author", content: "ChainForge" },
      { property: "og:title", content: "ChainForge — The Forex Mafia" },
      { property: "og:description", content: "Forge your wealth with premium AI signals and seamless transactions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@ChainForge" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/q.png" },
      { rel: "apple-touch-icon", href: "/q.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Immediate Splash Screen (renders before JS) */}
        <div id="cf-initial-loader" style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
          zIndex: 99999,
          transition: 'opacity 0.6s ease-out'
        }}>
          <style>{`
            @keyframes logo-glow {
              from { filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.3)); transform: scale(0.98); }
              to { filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.8)); transform: scale(1.02); }
            }
            .initial-logo {
              width: 120px;
              height: auto;
              animation: logo-glow 2s ease-in-out infinite alternate;
            }
            .loader-fade-out { opacity: 0; pointer-events: none; }
          `}</style>
          <img src="/q.png" className="initial-logo" alt="ChainForge" />
        </div>

        <div id="app-content">
          {children}
        </div>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext()
  const router = useRouter()

  useEffect(() => {
    const bootstrap = async () => {
      // 1. Aggressively preload all navigable routes to eliminate navigation lag
      const routes = Object.values(router.routesByPath)
      await Promise.all(
        routes.map((route) =>
          router.preloadRoute({ to: route.fullPath as any }).catch(() => {})
        )
      )

      // 2. Remove the initial splash once the site is fully "loaded up"
      const loader = document.getElementById('cf-initial-loader')
      if (loader) {
        loader.classList.add('loader-fade-out')
        setTimeout(() => loader.remove(), 600)
      }
    }

    bootstrap()
  }, [router])

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatedBackground />
      <div className="relative min-h-screen text-foreground">
        <Ticker />
        <SiteHeader />
        <main>
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
