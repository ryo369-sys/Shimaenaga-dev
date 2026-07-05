import { useNavigate } from "react-router-dom";

const EditBotton = () => {
    const navigate = useNavigate();

    // 詳細画面に遷移するボタン押下時処理
    const clickInfo = () => {
        navigate('/home');
    };

    // 編集画面に遷移するボタン押下時処理
    // /:id/editに遷移したいが便宜上/10/editに遷移
    const clickEdit = () => {
        navigate('/10/edit')
    }

    return (
        <>
            <button onClick={clickEdit}>編集</button>
        </>
    )
}

export default EditBotton;
