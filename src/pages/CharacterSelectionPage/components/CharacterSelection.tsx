import CardSection from "@/common/CardSection";
import CharacterGrid from "@/common/character/CharacterListGrid";

interface CharacterSelectionProps {
  selectedCharacter?: string;
  onCharacterSelect: (character: string) => void;
}

const CharacterSelection = ({
  selectedCharacter,
  onCharacterSelect,
}: CharacterSelectionProps) => {
  return (
    <CardSection
      title="2. 분석할 캐릭터를 선택하세요"
      selectedValue={selectedCharacter}
    >
      <CharacterGrid
        selectable
        selectedCharacter={selectedCharacter}
        onCharacterSelect={onCharacterSelect}
        columns="grid-cols-4 sm:grid-cols-6 md:grid-cols-8"
      />
    </CardSection>
  );
};

export default CharacterSelection;
