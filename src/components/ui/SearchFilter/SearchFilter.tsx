import "./SearchFilter.css";

interface Props {
  filterText: string;
  onFilter: (value: string) => void;
  onClear: () => void;
}

const SearchFilter: React.FC<Props> = ({ filterText, onFilter, onClear }) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Filtrar Información Tabla"
        value={filterText}
        onChange={(e) => onFilter(e.target.value)}
      />
      <button className="button-small" onClick={onClear}>
        Limpiar
      </button>
    </div>
  );
};

export default SearchFilter;
