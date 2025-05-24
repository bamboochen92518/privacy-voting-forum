"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePollContext } from "@/app/context/PollContext";
import axios from "axios";

export default function Home() {
  const { addPoll } = usePollContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePollCreation = async () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !deadline ||
      options.some((opt) => !opt.trim())
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const newPoll = {
      title,
      description,
      options: options.map((option) => ({ text: option })),
      creator: "0aa2b811-9fa4-4334-8f0e-1dddf7e18694",
      end_date: deadline,
    };

    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/poll/create", newPoll);
      if (response.status === 201) {
        alert(`You have initiated a poll: ${title}`);
        // Clear the form
        setTitle("");
        setDescription("");
        setDeadline("");
        setOptions(["", ""]);
      }
    } catch (error) {
      console.error("Error creating poll:", error);
      alert("Failed to create poll. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-24">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Privacy Voting Forum</h1>
        <h2 className="text-2xl font-semibold text-gray-700">
          Create New Poll
        </h2>
        <p className="text-muted-foreground mt-2">
          Set up a new voting poll for your community
        </p>
      </div>

      {/* Form */}
      <div className="border border-gray-300 rounded-lg p-8 bg-white">
        <div className="space-y-6">
          {/* Poll Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Poll Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a clear and concise poll title"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Poll Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Poll Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of what this poll is about"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Deadline */}
          <div>
            <label
              htmlFor="deadline"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Poll Deadline
            </label>
            <input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Options */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg font-medium text-gray-700">
                Poll Options
              </label>
              <Button
                type="button"
                onClick={addOption}
                variant="outline"
                size="sm"
              >
                Add Option
              </Button>
            </div>
            <div className="space-y-3">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  {options.length > 2 && (
                    <Button
                      type="button"
                      onClick={() => removeOption(index)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:border-red-300"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <Button
              onClick={handlePollCreation}
              disabled={isSubmitting}
              className="w-full py-3 text-lg"
            >
              {isSubmitting ? "Creating Poll..." : "Create Poll"}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="text-center">
        <Link
          href="/poll_list"
          className="text-primary underline hover:text-primary/80 mr-6"
        >
          View Poll List
        </Link>
        <Link href="/" className="text-primary underline hover:text-primary/80">
          Return to Home
        </Link>
      </div>
    </section>
  );
}
