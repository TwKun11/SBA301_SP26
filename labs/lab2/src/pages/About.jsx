import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

function About() {
  return (
    <Container className="text-center mt-3 mt-md-5 py-3 py-md-4">
      <Image
        src="/images/a.jpg"
        roundedCircle
        width={80}
        height={80}
        className="mb-3 d-sm-none"
      />
      <Image
        src="/images/a.jpg"
        roundedCircle
        width={120}
        height={120}
        className="mb-3 d-none d-sm-block mx-auto"
      />
      <h4 className="mb-2">Tri</h4>
      <p className="small">
        Email: <a href="mailto:tritvv1@fpt.edu.vn">tritvv1@fpt.edu.vn</a>
      </p>
    </Container>
  );
}

export default About;
