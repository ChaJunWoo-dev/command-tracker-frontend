import PropTypes from "prop-types";

import AccordionSection from "@/common/AccordionSection";
import CharacterGrid from "@/common/character/characterGrid";
import characters from "@/data/characters";

const CharacterSelection = ({
  selectedCharacter,
  onCharacterSelect,
  isOpen,
  onToggle,
}) => {
  return (
    <AccordionSection
      title="2. 분석할 캐릭터를 선택하세요"
      selectedValue={selectedCharacter}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <CharacterGrid
        list={characters}
        selectable
        selectedCharacter={selectedCharacter}
        onCharacterSelect={onCharacterSelect}
        columns="grid-cols-4 sm:grid-cols-6 md:grid-cols-8"
      />
    </AccordionSection>
  );
};

CharacterSelection.propTypes = {
  selectedCharacter: PropTypes.string,
  onCharacterSelect: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default CharacterSelection;
