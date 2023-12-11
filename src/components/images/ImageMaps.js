export const HomeImages = [
    {
        src: "https://images.pexels.com/photos/8581413/pexels-photo-8581413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        alt: "image1"
    },
    {
        src: "https://images.pexels.com/photos/4554249/pexels-photo-4554249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        alt: "image2"
    },
    {
        src: "https://images.pexels.com/photos/18784753/pexels-photo-18784753/free-photo-of-laundry-hung-over-the-street-between-townhouses.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        alt: "image3"
    },
    {
        src: "https://images.pexels.com/photos/1427479/pexels-photo-1427479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        alt: "image4"
    },
    {
        src: "https://images.pexels.com/photos/3121275/pexels-photo-3121275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        alt: "image5"
    },
    {
        src: "https://images.pexels.com/photos/2252000/pexels-photo-2252000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        alt: "image6"
    },
    {
        src: "https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        alt: "image7"
    },
    {
        src: "https://images.pexels.com/photos/6794043/pexels-photo-6794043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        alt: "image8"
    },
    {
        src: "https://images.pexels.com/photos/18762372/pexels-photo-18762372/free-photo-of-newborn-clothes-and-an-ultrasound-drying-in-the-yard.jpeg",
        alt: "image9"
    },
    {
        src: "https://www.boredpanda.com/blog/wp-content/uploads/2023/06/biggest-shock-of-marrying-into-wealthy-family24jpg-64895f8b6a04f__700.jpg",
        alt: "image10"
    }
]
export const MapImages = (images) => {
    return images.map((image, index) => (
        <img key={index} src={image.src} alt={image.alt} />
    ))
}