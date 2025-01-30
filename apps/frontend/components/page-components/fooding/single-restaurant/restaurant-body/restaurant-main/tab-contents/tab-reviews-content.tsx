import { Star, StarIcon } from "lucide-react";
import Image from "next/image";

const data = [
  {
    name: "Sushant Chaudhary",
    avatar: "/icons/avatar.png",
    rating: 4.5,
    message:
      "This restaurant is really good. The food is delicious and the service is excellent. The staff is friendly and helpful. I highly recommend this restaurant to anyone looking for a good meal.",
  },
  {
    name: "Sushant Chaudhary",
    avatar: "/icons/avatar.png",
    rating: 4.5,
    message:
      "This restaurant is really good. The food is delicious and the service is excellent. The staff is friendly and helpful. I highly recommend this restaurant to anyone looking for a good meal.",
  },
  {
    name: "Sushant Chaudhary",
    avatar: "/icons/avatar.png",
    rating: 4.5,
    message:
      "This restaurant is really good. The food is delicious and the service is excellent. The staff is friendly and helpful. I highly recommend this restaurant to anyone looking for a good meal.",
  },
  {
    name: "Sushant Chaudhary",
    avatar: "/icons/avatar.png",
    rating: 4.5,
    message:
      "This restaurant is really good. The food is delicious and the service is excellent. The staff is friendly and helpful. I highly recommend this restaurant to anyone looking for a good meal.",
  },
];

export const TabReviewsContent = () => {
  return (
    <div className="space-y-4 m-1">
      {data.map((item, index) => {
        return (
          <div key={index} className="space-y-4 bg-slate-100 rounded-xl p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Image
                  src={item.avatar}
                  width={50}
                  height={50}
                  alt="avatar"
                  className="rounded-full"
                />
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="flex items-center gap-1 text-primary">
                    <StarIcon className="size-5 " />
                    <span>{item.rating}</span>
                  </div>
                </div>
              </div>
              <div className="text-gray-600">1 Month ago</div>
            </div>
            <p className="text-gray-600">{item.message}</p>
          </div>
        );
      })}
    </div>
  );
};
