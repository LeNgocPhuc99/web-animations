import "./property-card.css";

interface PropertyCardPros {
  name: string;
  desc: string;
  onClick?: () => void;
}

const PropertyCard = ({ name, desc, onClick }: PropertyCardPros) => {
  return (
    <div className="prop-card" onClick={onClick}>
      <p className="name">{name}</p>
      <p
        className="desc"
        dangerouslySetInnerHTML={{
          __html: desc,
        }}
      />
    </div>
  );
};

export default PropertyCard;
