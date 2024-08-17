import { Inter } from "next/font/google";
import NavBar from "../components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cart Page",
  description: "Use to save products in cart",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        
        <NavBar/>
        {children}
        </body>
    </html>
  );
}
