import HomePage from '../pages/HomePage'
// import RootLayout from '../components/layout';
import Header from '@/components/Header';

export default function Home() {
  return (
    <>
    <Header/>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">  
        <HomePage/>
      </main>
    </>
  )
}
