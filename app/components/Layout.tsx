import React, { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';


type LayoutProps = {
    children: ReactNode; // Specify the type for children
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout" >
      <Head>
        <title>JS Mastery Store</title>
      </Head>
        <Navbar />
      <main >
      {/* <div style={{
  backgroundImage: 'url("https://images.pexels.com/photos/460695/pexels-photo-460695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '400px',
  animation: 'fadeIn 5s infinite',
}}>
  
</div> */}
<div className="main-container" style={{minHeight:"73vh"}}>
{children}

</div>
      </main>
        <Footer />
    </div>
  )
}

export default Layout