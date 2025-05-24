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
  const [options, setOptions] = useState([
    { text: "", description: "" },
    { text: "", description: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePollCreation = async () => {
    // 检查各个必填字段
    const missingFields = [];

    if (!title.trim()) {
      missingFields.push("Poll Title");
    }

    if (!description.trim()) {
      missingFields.push("Poll Description");
    }

    if (!deadline) {
      missingFields.push("Poll Deadline");
    }

    // 检查是否有空的选项文本
    const emptyOptions = options.some((opt) => !opt.text.trim());
    if (emptyOptions) {
      missingFields.push("All Poll Options");
    }

    // 如果有未填写的必填字段，显示详细错误信息
    if (missingFields.length > 0) {
      alert(
        `Please complete the following required fields:\n• ${missingFields.join(
          "\n• "
        )}`
      );
      return;
    }

    const newPoll = {
      title,
      description,
      options: options.map((option) => ({
        text: option.text,
        ...(option.description.trim() && {
          description: option.description.trim(),
        }),
      })),
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
        setOptions([
          { text: "", description: "" },
          { text: "", description: "" },
        ]);
      }
    } catch (error) {
      console.error("Error creating poll:", error);
      alert("Failed to create poll. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addOption = () => {
    setOptions([...options, { text: "", description: "" }]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  const handleOptionDescriptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index].description = value;
    setOptions(newOptions);
  };

  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-24">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold sm:text-5xl mb-6">
          Privacy Voting Forum
        </h1>
        <h2 className="text-3xl font-semibold text-gray-700">Initiate Poll</h2>
        <p className="text-muted-foreground mt-2">
          Set up a new voting poll for your community
        </p>
      </div>

      {/* Form */}
      <div className="border border-gray-300 rounded-lg p-8 bg-white">
        {/* Form Notice */}
        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-700">
            <span className="text-red-500">*</span> indicates required fields.
            All fields marked with an asterisk must be completed.
          </p>
        </div>

        <div className="space-y-6">
          {/* Poll Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Poll Title <span className="text-red-500">*</span>
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
              Poll Description <span className="text-red-500">*</span>
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
              Poll Deadline <span className="text-red-500">*</span>
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
                Poll Options <span className="text-red-500">*</span>
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
            <div className="space-y-4">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-700">
                      Option {index + 1}
                    </span>
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
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Option Text <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={option.text}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                        placeholder={`Enter option ${index + 1} text`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Option Description{" "}
                        <span className="text-gray-400">(Optional)</span>
                      </label>
                      <textarea
                        value={option.description}
                        onChange={(e) =>
                          handleOptionDescriptionChange(index, e.target.value)
                        }
                        placeholder="Add additional details about this option (optional)"
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>
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
