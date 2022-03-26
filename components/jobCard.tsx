import Image from "next/image";
interface Props {
  id: number;
  company: string;
  position: string;
  postedAt: string;
  contract: string;
  location: string;
}
const JobCard = ({
  id,
  company,

  position,
  postedAt,
  contract,
  location,
}: Props) => {
  return (
    <div className=" relative max-h-64  bg-white rounded-md p-8 pt-12 ">
      <div className="absolute top-0 -translate-y-1/2  w-14 h-14 flex items-center rounded-2xl">
        {/* <Image
          // src={logo.replace(/.\/assets/, "/images")}
          width={21}
          height={17}
          alt="company logo"
        /> */}
      </div>
      <div>
        {/* Main Card Content */}
        <div className="mb-11">
          <div className="flex mb-4">
            <p className=" mr-3">{postedAt}</p>
            <div className="flex">
              <span className="w-1 h-1 transform translate-y-0.5 rounded-full bg-darkgray self-center "></span>
              <p className="ml-4">{contract}</p>
            </div>
          </div>
          <h3 className="text-xl mb-3">{position}</h3>
          <h4 className=" text-base">{company}</h4>
        </div>
        <p className=" text-sm">{location}</p>
      </div>
    </div>
  );
};

export default JobCard;
