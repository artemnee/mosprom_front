"use client";

import { useState } from "react";

const ModalForm = ({ isOpen, onClose, type, onSubmit, setPr }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();

    const res = await fetch(
      `http://localhost:3000/api/auth/companies/${localStorage.getItem("id")}/communities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(formData),
      },
    );
    const json = await res.json();

    console.log(json);
  };

  const renderFields = () => {
    switch (type) {
      case "community":
        return (
          <>
            <Input
              label="Название сообщества"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <Textarea
              label="Описание"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </>
        );

      case "project":
        return (
          <>
            <Input
              label="Название проекта"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Textarea
              label="Описание проекта"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <Input
              label="Количество участников"
              name="members"
              type="number"
              value={formData.members}
              onChange={handleChange}
            />
          </>
        );

      case "event":
        return (
          <>
            <Input
              label="Название мероприятия"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Дата проведения"
              name="date"
              type="text"
              placeholder="Например, 25 октября"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <Textarea
              label="Описание мероприятия"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {type === "community" && "Создать сообщество"}
            {type === "project" && "Создать проект"}
            {type === "event" && "Создать мероприятие"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {renderFields()}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      {...props}
      rows={3}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
    />
  </div>
);

export default ModalForm;
