type Props = {
  isOpen: boolean;
  onOpen: () => void;
};

export const Modalopen = ({ isOpen, onOpen }: Props) => {
  if (isOpen) return null;

  return (
    <div>
      <div>
        <h2>モーダル</h2>

        <button onClick={onOpen}>
          開ける
        </button>
      </div>
    </div>
  );
};