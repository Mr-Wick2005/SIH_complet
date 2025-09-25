import { useState } from 'react';
import { X, Send, ChevronUp, ChevronDown, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

interface Comment {
  id: number;
  author: string;
  content: string;
  timeAgo: string;
  upvotes: number;
  replies?: Comment[];
}

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  issueTitle: string;
  comments: Comment[];
}

export function CommentsModal({ isOpen, onClose, issueTitle, comments: initialComments }: CommentsModalProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  if (!isOpen) return null;

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: 'current.user',
        content: newComment,
        timeAgo: 'now',
        upvotes: 0
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const handleUpvote = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, upvotes: comment.upvotes + 1 }
        : comment
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full h-[70%] rounded-t-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg text-[#1E2A38]">Comments</h3>
            <p className="text-sm text-[#6c757d] truncate">{issueTitle}</p>
          </div>
          <button onClick={onClose} className="ml-3">
            <X size={24} className="text-[#6c757d]" />
          </button>
        </div>

        {/* Comments List */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-sm text-[#1E2A38]">@{comment.author}</span>
                    <span className="text-xs text-[#6c757d] ml-2">{comment.timeAgo}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleUpvote(comment.id)}
                      className="flex items-center space-x-1 text-[#138808] hover:bg-green-50 rounded px-2 py-1"
                    >
                      <ChevronUp size={14} />
                      <span className="text-xs">{comment.upvotes}</span>
                    </button>
                    <button className="text-[#6c757d] hover:text-red-500">
                      <Heart size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-[#1E2A38] leading-relaxed">{comment.content}</p>
              </div>
            ))}
            
            {comments.length === 0 && (
              <div className="text-center py-8">
                <p className="text-[#6c757d]">No comments yet</p>
                <p className="text-xs text-[#6c757d] mt-1">Be the first to share your thoughts</p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Comment Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <Input
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 bg-gray-50 border-gray-200"
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
            />
            <Button 
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className="bg-[#000080] text-white hover:bg-[#000070] px-4"
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}