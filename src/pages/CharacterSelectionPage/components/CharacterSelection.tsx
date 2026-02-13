import AccordionSection from "@/common/AccordionSection";
import CharacterGrid from "@/common/character/characterGrid";
import characters from "@/data/characters";

interface CharacterSelectionProps {
  selectedCharacter: string;
  isOpen: boolean;
  onCharacterSelect: () => void;
  onToggle: () => void;
}

const CharacterSelection = ({
  selectedCharacter,
  isOpen,
  onCharacterSelect,
  onToggle,
}: CharacterSelectionProps) => {
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

export default CharacterSelection;
