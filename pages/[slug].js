import DirectusSource from "../lib/directus"

const PageDetail = ({ post }) => {

  console.log("post", post)

  return (
    <div>
      <h1>hola desde el detalle</h1>
    </div>
  )
}

export async function getStaticPaths() {

  const filters = {
    fields: ['slug'],
    filter: {
      status: "published",
      site: process.env.NEXT_PUBLIC_SITE
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
    fallback: false, // can also be true or 'blocking'
    revalidate: 300
  }
}

export async function getStaticProps(context) {

  const filters = {
    fields: ['slug', 'title', 'main_image', 'body'],
    filter: {
      status: "published",
      site: process.env.NEXT_PUBLIC_SITE
    }
  }

  const publicData = await DirectusSource.items(process.env.NEXT_PUBLIC_MODEL_DATA).readByQuery({ ...filters })

  console.log("publicData", publicData.data)

  const post = !!Object.keys(publicData.data[0]).length ? publicData.data[0] : {}

  return {
    // Passed to the page component as props
    props: { post },
  }
}

export default PageDetail