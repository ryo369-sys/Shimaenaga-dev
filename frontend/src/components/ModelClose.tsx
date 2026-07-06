type Props = {
  isClose: boolean;
  onClose: () => void;
};

export const Modalclose = ({ isClose, onClose }: Props) => {
  if (!isClose) return null;

  return (
    <div>
      <div>
        <h2>モーダル</h2>

        <button onClick={onClose}>
          閉じる
        </button>
      </div>
    </div>
  );
};