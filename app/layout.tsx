import CordContextProvider from "@/store/cordContext";
import "../dist/css/styles.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" />
        <title>Weather App</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
