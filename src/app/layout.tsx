import "@/app/globals.css";
import { Providers } from "@/components/providers";

export const metadata = {
  title: "Decent Auto Detailing",
  description: "Professional auto detailing services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
} 