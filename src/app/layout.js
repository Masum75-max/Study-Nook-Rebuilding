
import Navbar from "@/Components/Navbar";
import "./globals.css";



export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="dark"
    >
      <body className="min-h-full flex flex-col">

        <Navbar></Navbar>
       
       <main>{children}</main> 
        
        </body>
    </html>
  );
}
