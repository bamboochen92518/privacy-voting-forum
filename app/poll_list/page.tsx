"use client";

import { usePollContext, Poll } from "@/app/context/PollContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function PollsList() {
  const [selectedVotes, setSelectedVotes] = useState<{ [key: string]: string }>(
    {}
  );
  const [confirmVote, setConfirmVote] = useState<{
    pollId: string;
    option: string;
  } | null>(null);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);

  // 检查poll是否已过期
  const isPollExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  // 获取活跃poll数量
  const activePollsCount = polls.filter(
    (poll) => !isPollExpired(poll.end_date)
  ).length;

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/poll");
        setPolls(response.data);
      } catch (error) {
        console.error("Error fetching polls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  const handleVoteSelection = (pollId: string, option: string) => {
    setSelectedVotes({ ...selectedVotes, [pollId]: option });
    setConfirmVote({ pollId, option });
  };

  const handleVote = () => {
    if (confirmVote) {
      alert(
        `You have voted for ${confirmVote.option} on poll ${confirmVote.pollId}`
      );
      setConfirmVote(null);
    }
  };

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-24">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold sm:text-5xl mb-6">
          Privacy Voting Forum
        </h1>
        <h2 className="text-3xl font-semibold text-gray-700">Poll List</h2>
        <p className="text-muted-foreground mt-2">
          Browse and participate in community voting polls
        </p>
      </div>

      {/* Stats Bar */}
      {!loading && polls.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium text-gray-700">
                {activePollsCount} Active Poll
                {activePollsCount !== 1 ? "s" : ""}
              </span>
            </div>
            {polls.length - activePollsCount > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="font-medium text-gray-700">
                  {polls.length - activePollsCount} Expired Poll
                  {polls.length - activePollsCount !== 1 ? "s" : ""}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                ></path>
              </svg>
              <span className="text-gray-600">Community Voting</span>
            </div>
          </div>
        </div>
      )}

      {/* Polls List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <div className="text-lg text-muted-foreground">Loading...</div>
          </div>
        ) : polls.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-lg text-muted-foreground">
              No polls available at the moment.
            </div>
          </div>
        ) : (
          polls.map((poll: Poll) => (
            <div
              key={poll.id}
              className="border border-gray-300 rounded-xl p-6 bg-white hover:shadow-xl hover:border-gray-400 transition-all duration-300 group"
            >
              <div className="flex flex-col h-full">
                {/* Poll Header */}
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                      {poll.title}
                    </h3>
                    <div
                      className={`ml-3 px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                        isPollExpired(poll.end_date)
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {isPollExpired(poll.end_date) ? "Expired" : "Active"}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-3 leading-relaxed">
                    {poll.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Deadline: {new Date(poll.end_date).toLocaleDateString()}
                  </div>
                </div>

                {/* Poll Options */}
                <div className="flex-1">
                  <h4 className="font-semibold text-base mb-3 text-gray-800 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      ></path>
                    </svg>
                    Options ({poll.options.length})
                  </h4>
                  <div className="space-y-2 mb-4">
                    {poll.options.map(
                      (option: { text: string }, index: number) => (
                        <div
                          key={index}
                          className={`flex items-center p-3 rounded-lg transition-colors duration-200 border border-transparent ${
                            isPollExpired(poll.end_date)
                              ? "bg-gray-50 text-gray-500"
                              : "hover:bg-blue-50 hover:border-blue-200"
                          }`}
                        >
                          <input
                            type="radio"
                            id={`option-${poll.id}-${index}`}
                            name={`poll-${poll.id}`}
                            value={option.text}
                            onChange={() =>
                              handleVoteSelection(poll.id, option.text)
                            }
                            disabled={isPollExpired(poll.end_date)}
                            className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                          />
                          <label
                            htmlFor={`option-${poll.id}-${index}`}
                            className={`text-sm font-medium cursor-pointer flex-1 ${
                              isPollExpired(poll.end_date)
                                ? "text-gray-500"
                                : "text-gray-700"
                            }`}
                          >
                            {option.text}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 mt-auto">
                  <Button
                    onClick={handleVote}
                    className={`flex-1 font-medium py-2.5 ${
                      isPollExpired(poll.end_date)
                        ? "bg-gray-400 hover:bg-gray-400 text-white cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                    }`}
                    disabled={
                      !selectedVotes[poll.id] || isPollExpired(poll.end_date)
                    }
                  >
                    {isPollExpired(poll.end_date)
                      ? "Poll Expired"
                      : selectedVotes[poll.id]
                      ? "Cast Vote"
                      : "Select Option"}
                  </Button>
                  <Link href={`/polls/${poll.id}`} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full py-2.5 border-2 hover:bg-gray-50 font-medium"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Navigation */}
      <div className="text-center pt-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/initiate_poll"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Create New Poll
          </Link>
          <Link
            href="/"
            className="text-primary underline hover:text-primary/80 px-4 py-2"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
