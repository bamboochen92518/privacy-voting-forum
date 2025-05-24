"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface Poll {
  id: string;
  title: string;
  description: string;
  end_date: string;
  options: { text: string; description?: string }[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export default function PollDetail() {
  const params = useParams();
  const pollId = params?.id as string;

  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");

  useEffect(() => {
    if (pollId) {
      fetchPollDetail();
      fetchComments();
    }
  }, [pollId]);

  const fetchPollDetail = async () => {
    try {
      setLoading(true);

      // 首先嘗試從單個 poll API 獲取資料
      try {
        const response = await axios.get(`/api/poll/${pollId}`);
        const rawData = response.data;
        const transformedPoll: Poll = {
          id: rawData.id,
          title: rawData.title,
          description: rawData.description,
          end_date: rawData.end_date || rawData.deadline,
          options: rawData.options,
        };
        setPoll(transformedPoll);
        return;
      } catch (apiError) {
        console.warn("Single poll API failed, trying fallback...", apiError);
      }

      // Fallback: 從所有 polls 中找到對應的 poll
      const allPollsResponse = await axios.get("/api/poll");
      const targetPoll = allPollsResponse.data.find(
        (p: any) => p.id.toString() === pollId
      );

      if (targetPoll) {
        const transformedPoll: Poll = {
          id: targetPoll.id,
          title: targetPoll.title,
          description: targetPoll.description,
          end_date: targetPoll.end_date || targetPoll.deadline,
          options: targetPoll.options,
        };
        setPoll(transformedPoll);
      } else {
        setError("找不到此投票");
      }
    } catch (error) {
      console.error("Error fetching poll:", error);
      setError("無法載入投票詳情");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    // TODO: 實作留言 API 後替換
    // 目前為模擬資料
    const mockComments: Comment[] = [
      {
        id: "1",
        author: "Satoshi Nakamoto",
        content:
          "This poll topic is very interesting. I think Option 1 is more suitable for our community needs.",
        timestamp: "2024-01-15 10:30",
      },
      {
        id: "2",
        author: "Vitalik Buterin",
        content:
          "I have a different perspective. Option 2 might better align with our long-term goals and practical requirements.",
        timestamp: "2024-01-15 11:45",
      },
    ];
    setComments(mockComments);
  };

  const handleVote = () => {
    if (!selectedOption) {
      alert("Please select an option");
      return;
    }
    // TODO: 實作投票 API
    alert(`You have voted for: ${selectedOption}`);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !commentAuthor.trim()) {
      alert("Please fill in both name and comment");
      return;
    }

    // TODO: 實作新增留言 API
    const comment: Comment = {
      id: Date.now().toString(),
      author: commentAuthor,
      content: newComment,
      timestamp: new Date().toLocaleString("en-US"),
    };

    setComments([...comments, comment]);
    setNewComment("");
    setCommentAuthor("");
    alert("Comment added successfully!");
  };

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-24">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold sm:text-5xl mb-6">
          Privacy Voting Forum
        </h1>
        <h2 className="text-3xl font-semibold text-gray-700">Poll Details</h2>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-12">
          <div className="text-lg text-muted-foreground">Loading...</div>
        </div>
      ) : error || !poll ? (
        <div className="text-center py-12">
          <div className="text-lg text-red-600">
            {error || "Poll not found"}
          </div>
          <Link
            href="/poll_list"
            className="text-primary underline mt-4 inline-block"
          >
            Return to Poll List
          </Link>
        </div>
      ) : (
        <>
          {/* Poll Details Header */}
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">{poll.title}</h3>
            <p className="text-lg text-muted-foreground mb-2">
              {poll.description}
            </p>
            <p className="text-sm text-gray-600">Deadline: {poll.end_date}</p>
          </div>

          {/* Voting Section */}
          <div className="border border-gray-300 rounded-lg p-6 max-w-3xl mx-auto w-full">
            <h2 className="text-2xl font-semibold mb-4">Voting Options</h2>
            <div className="space-y-4">
              {poll.options.map((option, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    selectedOption === option.text
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-300 hover:border-gray-400 hover:shadow-sm"
                  }`}
                  onClick={() => setSelectedOption(option.text)}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name="vote-option"
                      value={option.text}
                      checked={selectedOption === option.text}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="mt-1 mr-3"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={`option-${index}`}
                        className="text-lg font-medium cursor-pointer block"
                      >
                        {option.text}
                      </label>
                      {option.description && option.description.trim() && (
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                          {option.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button onClick={handleVote} className="mt-6 w-full">
              Confirm Vote
            </Button>
          </div>

          {/* Comments Section */}
          <div className="border border-gray-300 rounded-lg p-6 max-w-3xl mx-auto w-full">
            <h2 className="text-2xl font-semibold mb-4">Discussion</h2>

            {/* Add Comment Form */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Share Your Thoughts</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={commentAuthor}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCommentAuthor(e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Share your thoughts about this poll..."
                  value={newComment}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setNewComment(e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button onClick={handleAddComment}>Post Comment</Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                All Comments ({comments.length})
              </h3>
              {comments.length === 0 ? (
                <p className="text-gray-500">
                  No comments yet. Be the first to share your thoughts!
                </p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border-l-4 border-blue-500 pl-4 py-3"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-blue-600">
                        {comment.author}
                      </span>
                      <span className="text-sm text-gray-500">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* Navigation */}
      <div className="text-center">
        <Link href="/poll_list" className="text-primary underline">
          Return to Poll List
        </Link>
      </div>
    </section>
  );
}
