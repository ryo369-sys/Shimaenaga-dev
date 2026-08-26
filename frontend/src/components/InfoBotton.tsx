import { useNavigate } from "react-router-dom";

const InfoBotton = () => {
    const navigate = useNavigate();

    // 詳細画面に遷移するボタン押下時処理
    const click = () => {
        navigate('/dashboard');
    };

    return (
        <>
            <button onClick={click}>ダッシュボードに戻る</button>
        </>
    )
}

export default InfoBotton;
