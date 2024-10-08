import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { Providers } from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Product Page",
  description: "contains all the products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <Providers>

        {children}
        </Providers>
        </body>
    </html>
  );
}
