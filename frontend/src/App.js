import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

const App = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("/api/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/items", {
        name,
        description,
      });
      setItems([...items, response.data]);
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setName(item.name);
    setDescription(item.description);
  };

  const handleCancelEdit = () => {
    setEditItem(null);
    setName("");
    setDescription("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/items/${editItem._id}`, {
        name,
        description,
      });
      const updatedItemIndex = items.findIndex(
        (item) => item._id === editItem._id
      );
      const updatedItems = [...items];
      updatedItems[updatedItemIndex] = response.data;
      setItems(updatedItems);
      setEditItem(null);
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/items/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">MERN CRUD Application</h1>

      {editItem ? (
        <form onSubmit={handleUpdate} className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mr-2 px-4 py-2 border rounded"
            placeholder="Name"
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mr-2 px-4 py-2 border rounded"
            placeholder="Description"
            required
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded mr-2"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleCancelEdit}
            className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mr-2 px-4 py-2 border rounded"
            placeholder="Name"
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mr-2 px-4 py-2 border rounded"
            placeholder="Description"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add Item
          </button>
        </form>
      )}

      <ul>
        {items.map((item) => (
          <li key={item._id} className="mb-2">
            <strong>{item.name}:</strong> {item.description}{" "}
            {!editItem && (
              <>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
