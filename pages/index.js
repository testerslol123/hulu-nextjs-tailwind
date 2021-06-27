import Head from 'next/head'
import Image from 'next/image'
import 'tailwindcss/tailwind.css'

import Header from '../components/Header';
import Nav from '../components/Nav';
import Results from '../components/Results';
import requests from '../utils/requests';

export default function Home({results}) {
  return (
    <div>
      <Head>
        <title>Hulu 2.0</title>
        <link rel="icon"></link>
      </Head>
      {/* Header */}
      <Header />
      {/* Navbar */}
      <Nav />
      {/* Results */}
      <Results results={results} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;
  
  const request = await fetch(`https://api.themoviedb.org/3${requests[genre]?.url || requests.fetchTrending.url}`)
  .then((res) => res.json());

  return {
    props: {
      results: request.results
    }
  }
}