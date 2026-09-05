import React, { useState } from 'react';
import { Card, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { UserLink } from './UserLink';
import { PostImage } from './PostImage';
import { ShimaenagaBadge } from './ShimaenagaBadge';
import type { Post } from '../types/Post';
import { LikeBotton } from './LikeButton';
import axios from '../axios';

// 💡 1. 引数（Props）の型をしっかり宣言
type PostCardProps = {
  post: Post;
  currentUserId: number;
  onDeleteSuccess: (deletedId: number) => void;
};

// 💡 2. 引数に型を適用
export const PostCard: React.FC<PostCardProps> = ({ post, currentUserId, onDeleteSuccess }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [isLiked, setIsLiked] = useState<boolean>(post.is_liked || false);
  const [likeCount, setLikeCount] = useState<number>(post.likes_count || 0);

  // 三点リーダーをクリックしたとき
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation(); // 親要素への伝播を防止
    setAnchorEl(e.currentTarget);
  };

  // メニューを閉じるとき
  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setAnchorEl(null);
  };

  // 削除処理
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClose();

    if (!window.confirm('この投稿を削除しますか？')) return;

    try {
      await axios.delete(`/posts/${post.id}`, {
          data: { user_id: currentUserId }
        });
      onDeleteSuccess(post.id); // 親（Dashboard）の State を更新
    } catch (error) {
      console.error('削除失敗:', error);
      alert('投稿の削除に失敗しました。');
    }
  };

  const handleLikeToggle = async () => {
    // 画面上の表示を先につじつま合わせ（楽観的UI更新）
    const nextIsLiked = !isLiked;
    const nextLikeCount = nextIsLiked ? likeCount + 1 : likeCount - 1;

    setIsLiked(nextIsLiked);
    setLikeCount(nextLikeCount);

    try {
      if (nextIsLiked) {
        // いいね追加 API
        await axios.post(`/posts/${post.id}/like`, {
          user_id: currentUserId,
        });
      } else {
        // いいね解除 API
        await axios.delete(`/posts/${post.id}/like`, {
          data: { user_id: currentUserId },
        });
      }
    } catch (error) {
      console.error('いいね処理エラー:', error);
      // 通信失敗時は画面の状態を元に戻す
      setIsLiked(isLiked);
      setLikeCount(likeCount);
      alert('いいねの処理に失敗しました。');
    }
  }


  // 自分の投稿かどうか判定
  const isOwner = Number(post.user_id) === Number(currentUserId);

  return (
    <Card 
      sx={{ 
        position: 'relative', 
        p: 2, 
        mb: 2, 
        bgcolor: '#f5f5f5', 
        borderRadius: 2 
      }}
    >
      {/* 右上の三点リーダーボタン */}
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        <MoreVertIcon />
      </IconButton>

      {/* ドロップダウンメニュー */}
      <Menu 
        anchorEl={anchorEl} 
        open={Boolean(anchorEl)} 
        onClose={(_e, _reason) => handleClose()}
      >
        {isOwner ? (
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            削除する
          </MenuItem>
        ) : (
          <MenuItem onClick={(e) => { e.stopPropagation(); alert('通報機能は準備中です'); handleClose(); }}>
            通報する
          </MenuItem>
        )}
      </Menu>

      {/* ユーザー名リンク */}
      <div style={{ marginBottom: '8px' }}>
        <UserLink 
          user_id={post.user_id} 
          userName={post.user_name || post.userName || post.user?.username || 'ユーザー'} 
        />
      </div>

      {/* 投稿本文 */}
      <p style={{ margin: '0 0 8px 0', whiteSpace: 'pre-wrap' }}>
        {post.content}
      </p>

      {/* 💡 画像表示 */}
      <PostImage imagePath={post.image_path} />

      {/* 💡 判定バッジ表示 */}
      <ShimaenagaBadge label={post.label} accuracy={post.accuracy} />
      <LikeBotton
        status={isLiked}
        likeCount={likeCount}
        onToggle={handleLikeToggle}
      />
    </Card>
  );
};