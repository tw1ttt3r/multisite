import Image from "next/image"

const Navbar = ({ image, name, title  }) => {
  return(
    <section className="w-full flex items-center">
      <Image priority alt={name} src={image} width={200} height={50} />
      <div className="w-full flex justify-center">
        <h1 className="text-[30px]">{ title }</h1>
      </div>
    </section>
  )
}

export default Navbar