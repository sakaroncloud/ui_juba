import Image from "next/image";

export const TabGalleryContent = () => {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6">
      <Image
        src={"/menu/menu-1.jpg"}
        width={200}
        height={200}
        alt="pizza"
        className="rounded-xl w-full"
      />
      <Image
        src={"/menu/menu-1.jpg"}
        width={200}
        height={200}
        alt="pizza"
        className="rounded-xl w-full"
      />
      <Image
        src={"/menu/menu-1.jpg"}
        width={200}
        height={200}
        alt="pizza"
        className="rounded-xl w-full"
      />
      <Image
        src={"/menu/menu-1.jpg"}
        width={200}
        height={200}
        alt="pizza"
        className="rounded-xl w-full"
      />
      <Image
        src={"/menu/menu-1.jpg"}
        width={200}
        height={200}
        alt="pizza"
        className="rounded-xl w-full"
      />
      <Image
        src={"/menu/menu-1.jpg"}
        width={200}
        height={200}
        alt="pizza"
        className="rounded-xl w-full"
      />
    </div>
  );
};
