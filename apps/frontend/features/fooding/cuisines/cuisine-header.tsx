
type Props = {
  title: string,
  description: string
};

export const CuisineHeader = ({ title, description }: Props) => {

  return (
    <div className="h-[200px] bg-gradient-to-t from-slate-100">
      <div className="container h-full flex items-center">
        <div className="flex items-center justify-between my-auto h-fit w-full">
          <div className="left flex items-center gap-4 w-fit">
            <div>
              <h1 className="text__xl font-medium capitalize">
                {title}
              </h1>
              <p className="text__subtitle  text-gray-600">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


