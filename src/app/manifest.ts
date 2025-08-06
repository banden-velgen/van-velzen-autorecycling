import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Van Velzen Autorecycling",
    short_name: "Van Velzen",
    description: "Duurzame autodemontage en recycling in Nederland",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4f46e5",
    icons: [
      {
        src: "/images/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
