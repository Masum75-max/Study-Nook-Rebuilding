
import Navbar from "@/Components/Navbar";
import "./globals.css";
import Footer from "@/Components/Footer";




export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
     
    >
      <body className="min-h-full flex flex-col">

        <Navbar></Navbar>
       
       <main>{children}</main>

       <Footer></Footer> 
        
        </body>
    </html>
  );
}
