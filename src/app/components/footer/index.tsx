
const Footer = () => {
  return (
    <footer className="">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-around border-t pt-6 mt-6 text-center md:text-left">
          <ul className="py-3">
            <li className="font-bold text-tertiary">Shopping online</li>
            <li>
              <a className="interactable" href="#">Order Status</a>
            </li>
            <li>
              <a className="interactable" href="#">Shipping and Delivery</a>
            </li>
            <li>
              <a className="interactable" href="#">Returns</a>
            </li>
            <li>
              <a className="interactable" href="#">Payment options</a>
            </li>
            <li>
              <a className="interactable" href="#">Contact Us</a>
            </li>
          </ul>
          <ul className="py-3">
            <li className="font-bold text-tertiary">Information</li>
            <li>
              <a className="interactable" href="#">Gift Cards</a>
            </li>
            <li>
              <a className="interactable" href="#">Find a store</a>
            </li>
            <li>
              <a className="interactable" href="#">Newsletter</a>
            </li>
            <li>
              <a className="interactable" href="#">Bacome a member</a>
            </li>
            <li>
              <a className="interactable" href="#">Site feedback</a>
            </li>
          </ul>
          <ul className="py-3">
            <li className="font-bold text-tertiary">Contact</li>
            <li>
              <a className="interactable" href="#">will</a>
            </li>
            <li>
              <a className="interactable" href="#">anyone</a>
            </li>
            <li>
              <a className="interactable" href="#">read.these@dunno?com</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
