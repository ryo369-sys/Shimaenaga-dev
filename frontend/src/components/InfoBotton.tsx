import { useNavigate } from "react-router-dom";

const InfoBotton = () => {
    const navigate = useNavigate();

    // 詳細画面に遷移するボタン押下時処理
    const clickInfo = () => {
        navigate('/home');
    };

    return (
        <>
            <button onClick={clickInfo}>Homeに戻る</button>
        </>
    )
}

export default InfoBotton;
