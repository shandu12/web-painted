import Image from "next/image";
import React from "react";

const Gallery = ({ pictures }: { pictures: string[] }) =>{
    const [stateGallery, setstateGallery] = React.useState(pictures[0]);
    const [hoverGallery, sethoverGallery] = React.useState(null as string | null);
    return (
    <div className="flex flex-col-reverse md:flex-row">
        <div className="flex-row md:flex-col flex">
            {pictures.map((pic: string, index: number) => (
                <div key={index} onMouseOver={()=>sethoverGallery(pic)} onMouseOut={()=>sethoverGallery(null)} onClick={()=>setstateGallery(pic)} className={`h-12 w-12 lg:mr-2 cursor-pointer relative hover:border-4 ${ pic== stateGallery? "!border-tertiary border-3" : "border-gray-300 border-2" }  overflow-hidden`}>
                    <Image src={pic} alt={`Gallery image ${index + 1}`} fill={true} />
                </div>
            ))}
        </div>
        <div className="w-[300px] h-[300px] lg:h-[500px] lg:w-[500px] overflow-hidden bg-cover transition-discrete" style={{backgroundImage: `url(${hoverGallery? hoverGallery : stateGallery})`, backgroundSize: 'fill', backgroundPosition: 'center'}}>
            {/* <Image src={hoverGallery? hoverGallery : stateGallery} alt="Main Gallery Image" height={400} width={400}/> */}
        </div>
    </div>
  );
}

export default Gallery;
