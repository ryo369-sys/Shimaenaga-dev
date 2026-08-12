import { useNavigate } from "react-router-dom";

const RetuenBotton = () => {
    const navigate = useNavigate();

    // 詳細画面に遷移するボタン押下時処理
    const clickInfo = () => {
        navigate('/home');
    };

    const clickBack = () => {
        navigate(-1);
    };

    return (
        <>
            <button onClick={clickBack}>戻る</button>
        </>
    )
}

export default RetuenBotton;
