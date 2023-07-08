import Image from 'next/image'
import HomePage from '../pages/HomePage'
import Head from 'next/head';
import Header from '../components/Header';
import RootLayout from '../components/layout';

export default function Home() {
  return (
    <RootLayout>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">      
        {/* <h1 className='title'>Carbon Footprint Calculator</h1> */}
        <HomePage/>
      </main>
    </RootLayout>
  )
}
