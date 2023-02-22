import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page)
  
  return getLayout(<section className='background'>
      <Component {...pageProps} />
    </section>)
}

export default MyApp
