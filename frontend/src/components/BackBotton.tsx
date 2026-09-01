import { useNavigate } from "react-router-dom";

const BackBotton = () => {
    const navigate = useNavigate();

    //一つ前のページに遷移
        const clickBack = () => {
        navigate(-1);
    };
    return (
        <>
            <button onClick={clickBack}>戻る</button>
        </>
    )
}


export default BackBotton;
