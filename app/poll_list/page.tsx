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
    <section className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-24">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Privacy Voting Forum</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Active Polls</h2>
      </div>

      {/* Polls List */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg text-muted-foreground">Loading...</div>
          </div>
        ) : polls.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-lg text-muted-foreground">
              No polls available at the moment.
            </div>
          </div>
        ) : (
          polls.map((poll: Poll) => (
            <div
              key={poll.id}
              className="border border-gray-300 rounded-lg p-6 bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col space-y-4">
                {/* Poll Header */}
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                    {poll.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-2">
                    {poll.description}
                  </p>
                  <p className="text-sm text-gray-600">
                    Deadline: {new Date(poll.end_date).toLocaleDateString()}
                  </p>
                </div>

                {/* Poll Options */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-gray-800">
                    Poll Options:
                  </h4>
                  <div className="space-y-2">
                    {poll.options.map(
                      (option: { text: string }, index: number) => (
                        <div
                          key={index}
                          className="flex items-center p-2 rounded hover:bg-gray-50"
                        >
                          <input
                            type="radio"
                            id={`option-${poll.id}-${index}`}
                            name={`poll-${poll.id}`}
                            value={option.text}
                            onChange={() =>
                              handleVoteSelection(poll.id, option.text)
                            }
                            className="mr-3 w-4 h-4"
                          />
                          <label
                            htmlFor={`option-${poll.id}-${index}`}
                            className="text-lg cursor-pointer flex-1"
                          >
                            {option.text}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                  <Button
                    onClick={handleVote}
                    className="flex-1"
                    disabled={!selectedVotes[poll.id]}
                  >
                    Vote
                  </Button>
                  <Link href={`/polls/${poll.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
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
        <Link href="/" className="text-primary underline hover:text-primary/80">
          Return to Home
        </Link>
      </div>
    </section>
  );
}
