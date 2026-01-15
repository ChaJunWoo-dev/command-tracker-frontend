import PropTypes from "prop-types";

const CharacterGrid = ({
  list,
  selectable = false,
  selectedCharacter = null,
  onCharacterSelect = null,
  columns = "grid-cols-3 sm:grid-cols-4 md:grid-cols-6",
}) => (
  <div className={`grid ${columns} gap-3`}>
    {list.map(({ name, src, isSupported }) => {
      const isSelected = selectedCharacter === name;
      const Element = selectable ? "button" : "figure";

      return (
        <Element
          key={name}
          type={selectable ? "button" : undefined}
          onClick={
            selectable && isSupported ? () => onCharacterSelect(name) : undefined
          }
          disabled={selectable && !isSupported}
          className={`flex flex-col items-center text-xs font-medium ${
            selectable
              ? `transition-all ${
                  isSelected ? "ring-2 ring-indigo-500 ring-offset-2" : ""
                } ${
                  isSupported
                    ? "cursor-pointer hover:scale-105"
                    : "opacity-50 grayscale cursor-not-allowed"
                }`
              : `text-gray-300 ${isSupported ? "" : "opacity-50 grayscale"}`
          }`}
        >
          <img
            src={src}
            alt={name}
            className="w-14 h-14 rounded object-cover shadow"
          />
          {selectable ? (
            <span className="truncate w-14 text-center mt-1">{name}</span>
          ) : (
            <figcaption className="truncate w-14 text-center mt-1">
              {name}
            </figcaption>
          )}
        </Element>
      );
    })}
  </div>
);

CharacterGrid.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      isSupported: PropTypes.bool,
    }),
  ).isRequired,
  selectable: PropTypes.bool,
  selectedCharacter: PropTypes.string,
  onCharacterSelect: PropTypes.func,
  columns: PropTypes.string,
};

export default CharacterGrid;
