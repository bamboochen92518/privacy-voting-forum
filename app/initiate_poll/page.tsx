"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePollContext } from "@/app/context/PollContext";

export default function Home() {
  const { addPoll } = usePollContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handlePollCreation = () => {
    const newPoll = {
      id: Date.now().toString(),
      title,
      description,
      deadline,
      options,
    };
    addPoll(newPoll);
    alert(`You have initiated a poll: ${title}`);
    // Clear the form
    setTitle("");
    setDescription("");
    setDeadline("");
    setOptions(["", ""]);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-24 text-center">
      <h1 className="text-4xl font-bold sm:text-5xl">Privacy Voting Forum</h1>
      <h2 className="text-2xl font-semibold mt-8">Initiate Poll</h2>
      <div className="flex flex-col items-center gap-4 w-full max-w-5xl">
        <div className="flex flex-col w-full">
          <label className="text-left" htmlFor="title">
            Poll Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2 w-1/1"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-left" htmlFor="description">
            Poll Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded p-2 w-1/1 h-40"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-left" htmlFor="deadline">
            Poll Deadline
          </label>
          <input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="border rounded p-2 w-1/1"
            required
          />
        </div>
        {options.map((option, index) => (
          <div key={index} className="flex flex-col w-full">
            <label className="text-left" htmlFor={`option-${index}`}>
              Option {index + 1}
            </label>
            <input
              id={`option-${index}`}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="border rounded p-2 w-1/1"
              required
            />
          </div>
        ))}
        <Button onClick={addOption}>Add Option</Button>
        <Button onClick={handlePollCreation}>Initiate Poll</Button>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <Button asChild>
          <Link href="/poll_list">View Poll List</Link>
        </Button>
      </div>
    </section>
  );
}
