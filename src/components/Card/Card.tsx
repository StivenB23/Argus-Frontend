import './Card.css';

export type CardProps = {
  type: 'success' | 'warning' | 'info';
};

const Card: React.FC<CardProps> = ({ type, children }) => {
  return (<div className={`card card-${type}`}>{children}</div>);
};

export default Card;
