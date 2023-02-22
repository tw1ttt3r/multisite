import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import useBrandInfo from "../lib/useBrandInfo";

export default function PageLayout({ children }) {

  const { infoBrand } = useBrandInfo()

  const [ data, setData ] = useState({ image: "/generic.png", title: "", name: "" })

  useEffect(() => {
    if (!!infoBrand?.logo) {
      setData({ ...infoBrand, image: `${process.env.NEXT_PUBLIC_SOURCE}${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}${infoBrand?.logo}` })
    }
  }, [infoBrand])

  return(
    <>
      <Navbar image={data.image} name={data.name} title={data.title} />
      { children }
    </>
  )
}