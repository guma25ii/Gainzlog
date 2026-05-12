import { useState } from "react";
import PageLayout from "../../Components/PageLayouts";
import BackBtn from "../../Components/BackBtn";
import { useNavigate } from "react-router-dom";
import type { CardType } from "../../Components/ProgressPageComponents/ProgressSwipe";

const AddPicturePage = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState<"front" | "side" | "back">("front");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return;

    const newCard: CardType = {
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
      category,
      date: new Date().toISOString().split("T")[0],
    };

    navigate("/pictures", { state: newCard });
  };

  return (
    <PageLayout>
      <div className="centerContent">
        <form onSubmit={handleSubmit}>
          <h3>Add Picture</h3>

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <button
            type="button"
            className="navigationBtn"
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            Add Picture
          </button>

          <p>{file ? file.name : "No file selected"}</p>

          <select
            className="navigationBtn"
            onChange={(e) => setCategory(e.target.value as "front" | "side" | "back")}
          >
            <option value="front">Front</option>
            <option value="side">Side</option>
            <option value="back">Back</option>
          </select>

          <button type="submit" className="navigationBtn">
            Save
          </button>
        </form>

        <BackBtn />
      </div>
    </PageLayout>
  );
};

export default AddPicturePage;