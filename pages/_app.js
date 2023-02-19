import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <section className='background'>
    <Component {...pageProps} />
  </section>
}

export default MyApp
