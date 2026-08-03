import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

// 判定結果用の型定義（必要な場合）
type ImgInput = {
  names: string;
  accuracy: number | string;
}

export const Form = () => {
  const { handleSubmit } = useForm() // 👈 handleSubmit を追加

  const [isFileTypeError, setIsFileTypeError] = useState<boolean>(false)
  
  // 💡 photo の型を File | null に修正！
  const [photo, setPhoto] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  
  // レスポンス保持用（任意）
  const [result, setResult] = useState<ImgInput | null>(null)

  const emptytarget: React.MouseEventHandler<HTMLInputElement> = (event) => {
    event.currentTarget.value = ''
  }

  const handleFile: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files === null || event.target.files.length === 0) {
      return
    }
    setIsFileTypeError(false)

    const file = event.target.files[0]

    // ファイル形式チェック
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setIsFileTypeError(true)
      return
    }

    setPhoto(file) // 💡 File オブジェクトをそのまま保存
    setPreview(window.URL.createObjectURL(file))
  }

  // フォーム送信処理
  const onSubmit = async () => {
    if (!photo) {
      alert("画像を選択してください")
      return
    }

    const formData = new FormData()
    // 💡 PHP側の $_FILES['image'] と名前を合わせる！
    formData.append("image", photo) 

    try {
      // PHPの画像投稿・判定APIに送信
      const res = await axios.post('http://localhost:8000/api/GetAccuracy', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (res.status === 200) {
        console.log('投稿・判定に成功しました:', res.data)
        // 必要に応じて結果をステートにセット
        setResult(res.data)
      } else {
        console.log('エラー:', res.data.message)
      }
    } catch (err) {
      console.error('送信エラー:', err)
    }
  }

  const cancelFile = () => {
    setIsFileTypeError(false)
    setPhoto(null)
    setPreview("")
    setResult(null)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>画像</p>
        <p>（ファイル形式はjpeg, png, jpgのみアップロード可能です。）</p>
        
        <label htmlFor="photo" style={{ cursor: 'pointer', padding: '8px 16px', background: '#e0e0e0', borderRadius: '4px' }}>
          画像アップロード
          <input 
            hidden 
            type="file" 
            id="photo" 
            name="photo" 
            accept="image/*,.png,.jpg,.jpeg" 
            onChange={handleFile} 
            onClick={emptytarget}
          />
        </label>

        {isFileTypeError && (
          <div style={{ color: 'red', marginTop: '8px' }}>
            <span>※jpeg, png, jpg以外のファイル形式は表示されません。</span>
          </div>
        )}
            
        <br/><br/>
        
        {preview && (
          <div>
            <p>投稿画像イメージ</p>
            <img src={preview} alt="preview img" style={{ maxWidth: '300px', maxHeight: '300px' }} />
          </div>
        )}

        <br/>
        <button type="submit">投稿する</button>
      </form>

      {/* 💡 ボタンの type="button" に変更（フォーム送信を防ぐため） */}
      <button type="button" onClick={cancelFile} style={{ marginTop: '10px' }}>
        画像リセット
      </button>

      {/* 判定結果の表示例 */}
      {result && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>判定結果</h3>
          <p>名前: {result.names}</p>
          <p>精度: {result.accuracy}</p>
        </div>
      )}
    </div>
  )
}