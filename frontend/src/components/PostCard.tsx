import React, { useState } from 'react';
import { 
  Card, IconButton, Menu, MenuItem,
  Button, RadioGroup, FormControlLabel, Radio, TextField, FormControl, FormLabel,
  Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { UserLink } from './UserLink';
import { PostImage } from './PostImage';
import { ShimaenagaBadge } from './ShimaenagaBadge';
import type { Post } from '../types/Post';
import { LikeButton } from './LikeButton';
import axios from '../axios';
import { FollowButton } from './FollowButton';

type PostCardProps = {
  post: Post;
  currentUserId: number;
  onDeleteSuccess: (deletedId: number) => void;
};

interface ReportPayload {
  post_id: number;
  reported_user_id: number;
  user_id: number;
  reason: string;
  comment: string;
}

export const PostCard: React.FC<PostCardProps> = ({ post, currentUserId, onDeleteSuccess }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [isLiked, setIsLiked] = useState<boolean>(post.is_liked || false);
  const [likeCount, setLikeCount] = useState<number>(post.likes_count || 0);

  // 通報用 State
  const [openReport, setOpenReport] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setAnchorEl(null);
  };

  // ダイアログを閉じる
  const handleCloseDialog = () => {
    setOpenReport(false);
    setSelectedReason('');
    setCommentText('');
  };

  // 通報メニューを押した時
  const handleOpenReportDialog = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClose();
    setOpenReport(true);
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
      onDeleteSuccess(post.id);
    } catch (error) {
      console.error('削除失敗:', error);
      alert('投稿の削除に失敗しました。');
    }
  };

  // いいね処理
  const handleLikeToggle = async () => {
    const nextIsLiked = !isLiked;
    const nextLikeCount = nextIsLiked ? likeCount + 1 : likeCount - 1;

    setIsLiked(nextIsLiked);
    setLikeCount(nextLikeCount);

    try {
      if (nextIsLiked) {
        await axios.post(`/posts/${post.id}/like`, { user_id: currentUserId });
      } else {
        await axios.delete(`/posts/${post.id}/like`, { data: { user_id: currentUserId } });
      }
    } catch (error) {
      console.error('いいね処理エラー:', error);
      setIsLiked(isLiked);
      setLikeCount(likeCount);
      alert('いいねの処理に失敗しました。');
    }
  };

  // 通報送信処理
  const handleReportSubmit = async () => {
    if (!selectedReason) {
      alert('通報理由を選択してください。');
      return;
    }

    const payload: ReportPayload = {
      post_id: post.id,
      reported_user_id: post.user_id,
      user_id: currentUserId,
      reason: selectedReason,
      comment: commentText,
    };

    try {
      await axios.post('/reportPost', payload);
      alert('通報を受け付けました。');
      handleCloseDialog();
    } catch (error) {
      console.error('通報処理エラー:', error);
      alert('通報の処理に失敗しました。');
    }
  };

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
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        <MoreVertIcon />
      </IconButton>

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
          <MenuItem onClick={handleOpenReportDialog} sx={{ color: 'error.main' }}>
            通報する
          </MenuItem>
        )}
      </Menu>

      <div style={{ marginBottom: '8px' }}>
        <UserLink 
          user_id={post.user_id} 
          userName={post.user_name || post.userName || post.user?.username || 'ユーザー'} 
        />
        <FollowButton 
          targetUserId={Number(post.user_id)} 
          currentUserId={Number(currentUserId)} 
        />
      </div>

      <p style={{ margin: '0 0 8px 0', whiteSpace: 'pre-wrap' }}>
        {post.content}
      </p>

      <PostImage imagePath={post.image_path} />
      <ShimaenagaBadge label={post.label} accuracy={post.accuracy} />
      
      <LikeButton
        status={isLiked}
        likeCount={likeCount}
        onToggle={handleLikeToggle}
      />

      {/* 💡 ここにダイアログを追加しました */}
      <Dialog open={openReport} onClose={handleCloseDialog} fullWidth maxWidth="xs">
        <DialogTitle>投稿の通報</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" margin="dense" fullWidth>
            <FormLabel component="legend">通報の理由</FormLabel>
            <RadioGroup
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
            >
              <FormControlLabel value="spam" control={<Radio />} label="スパム・宣伝目的" />
              <FormControlLabel value="harassment" control={<Radio />} label="誹謗中傷・ハラスメント" />
              <FormControlLabel value="other" control={<Radio />} label="その他" />
            </RadioGroup>
          </FormControl>

          <TextField
            margin="dense"
            label="詳細コメント（任意）"
            fullWidth
            multiline
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>キャンセル</Button>
          <Button onClick={handleReportSubmit} color="error" variant="contained">
            送信する
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};