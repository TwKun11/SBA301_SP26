import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

function About() {
  return (
    <Container className="text-center mt-5">
      <Image
        src="/images/a.jpg"
        roundedCircle
        width={120}
        height={120}
        className="mb-3"
      />
      <h4>Tri</h4>
      <p>
        Email: <a href="mailto:tritvv1@fpt.edu.vn">tritvv1@fpt.edu.vn</a>
      </p>
    </Container>
  );
}

export default About;
