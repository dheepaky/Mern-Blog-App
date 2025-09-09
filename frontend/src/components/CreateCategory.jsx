import { useState } from "react";

export default function CreateCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // later connect with your backend API
    const newCategory = { name, description };
    console.log("Category Created:", newCategory);

    // reset form
    setName("");
    setDescription("");
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Category</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Name */}
        <div>
          <label className="block font-medium mb-1">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>

        {/* Category Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter category description (optional)"
            className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-cyan-400"
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full my-15 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-500 text-white py-2 rounded-md transition">
          Create Category
        </button>
      </form>
    </div>
  );
}
