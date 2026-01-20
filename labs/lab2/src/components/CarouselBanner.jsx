import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import banners from "../data/banners";

function CarouselBanner() {
  return (
    <Carousel fade interval={3000} className="mb-3 mb-md-5 carousel-responsive">
      {banners.map((banner) => (
        <Carousel.Item key={banner.id}>
          <Image className="d-block w-100 object-fit-cover carousel-image" src={banner.image} alt={banner.title} />
          <Carousel.Caption className="carousel-caption-responsive bg-dark bg-opacity-50 rounded-2 p-2 p-md-3">
            <h3 className="fs-5 fs-md-4 fs-lg-3 mb-1 mb-md-2 fw-semibold">{banner.title}</h3>
            <p className="d-none d-md-block mb-0 small">{banner.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselBanner;
