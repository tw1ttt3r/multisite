import Image from "next/image"
import Link from "next/link"
import PageLayout from "../layout/page"
import DirectusSource from "../lib/directus"

const PageDetail = ({ post }) => {

  console.log("post", post)

  return (
    <div>
      <Link href="/" legacyBehavior passHref>
        <a>
          Página principal
        </a>
      </Link>
      <h1>{post.title}</h1>
      <Image priority src={`${process.env.NEXT_PUBLIC_SOURCE}${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}${post.main_image}`} alt="image_msg" width={500} height={500} />
      <div dangerouslySetInnerHTML={ { __html: post.body } } />
    </div>
  )
}

PageDetail.getLayout = function getLayout(page) {
  return(
    <PageLayout>
      { page }
    </PageLayout>
  )
}

export async function getStaticPaths() {

  const site = Array.from(new Set([ '0', process.env.NEXT_PUBLIC_SITE ]))

  const filters = {
    fields: ['slug'],
    filter: {
      status: "published",
      site: {
        "_in": site
      }
    }
  }

  let paths = []

  try {
    const publicData = await DirectusSource.items(process.env.NEXT_PUBLIC_MODEL_DATA).readByQuery({ ...filters })
    paths = publicData.data.map(({ slug }) => ({ params: { slug } }));
  } catch (e) {
    paths = [];
  }

  return {
    paths,
    fallback: 'blocking', // can also be true or 'blocking'
  }
}

export async function getStaticProps(context) {
  const { params: { slug } } = context
 
  const filters = {
    fields: ['title', 'main_image', 'body'],
    filter: {
      slug
    }
  }

  const publicData = await DirectusSource.items(process.env.NEXT_PUBLIC_MODEL_DATA).readByQuery({ ...filters })

  const post = !!Object.keys(publicData.data[0]).length ? publicData.data[0] : {}

  return {
    // Passed to the page component as props
    props: { post },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATION)
  }
}

export default PageDetail