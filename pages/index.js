import Image from "next/image"
import Link from "next/link"
import useNews from "../lib/useNews"

export default function Home() {

  const { allNews, loading, error } = useNews()
  
  return (
    <>
      { !!loading && <h1>Cargando...</h1> }
      { !!error && <h1>Upss...</h1> }
      { !!allNews?.length && allNews.map( (item, i) => <Link key={`new_${i}`} href={`/${item.slug}`} legacyBehavior passHref><a>
        <h1>{ item.title }</h1>
        <Image priority={!i} src={`${process.env.NEXT_PUBLIC_SOURCE}${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}${item.main_image}`} alt="image_msg" width={300} height={300} />
        <p>{item.abstract}</p>
      </a></Link> ) }
      { !allNews?.length && <h1>Ninguna noticia disponible... </h1> }
    </>
  )
}
