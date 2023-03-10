import Image from "next/image"
import Link from "next/link"
import PageLayout from "../layout/page"
import useNews from "../lib/useNews"

export default function Home() {

  const { allNews, loading, error } = useNews()
  
  return (
    <>
      { !!loading && <h1>Cargando...</h1> }
      { !!error && <h1>Upss...</h1> }
      { !!allNews?.length && <section className="grid lg:grid-cols-3 gap-6 md:grid-cols-2 sm:grid-cols-1">
        {
          allNews.map( (item, i) => <Link key={`new_${i}`} href={`/${item.slug}`} legacyBehavior passHref><a>
            <h1>{ item.title }</h1>
            <div className="w-[300px] h-[300px] relative">
              <Image className="object-contain" style={{height: "100%", width:"100%"}} fill priority={!i} src={`${process.env.NEXT_PUBLIC_SOURCE}${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}${item.main_image}`} alt="image_msg" />
            </div>
            <p>{item.abstract}</p>
          </a></Link> )
        }
      </section> }
      { !allNews?.length && <h1>Ninguna noticia disponible... </h1> }
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return(
    <PageLayout>
      { page }
    </PageLayout>
  )
}