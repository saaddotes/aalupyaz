"use client";
import { useData } from "@/context/dataContext";
import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import Link from "next/link";
import { CldUploadWidget } from "next-cloudinary";
import Fuse from "fuse.js";

export default function Admin() {
  const { vegetables, loading, error } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVegetable, setSelectedVegetable] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (error) {
      console.error("Error fetching vegetables:", error);
    }
  }, [error]);

  const handleEditClick = (vegetable) => {
    setSelectedVegetable(vegetable);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVegetable(null);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);

    try {
      // Get the document reference for the selected vegetable
      const vegetableRefCol = collection(db, "vegetables");
      if (selectedVegetable?.id && selectedVegetable.id !== "new") {
        const vegetableRef = doc(vegetableRefCol, selectedVegetable.id); // Assuming each vegetable has an `id`

        // Update the vegetable data in Firebase
        await updateDoc(vegetableRef, {
          name: selectedVegetable.name,
          imgSrc: selectedVegetable.imgSrc,
          price: selectedVegetable.price,
        });
      } else {
        // If it's a new vegetable (id: "new"), add it to the Firestore collection
        await addDoc(vegetableRefCol, {
          name: selectedVegetable.name,
          imgSrc: selectedVegetable.imgSrc,
          price: selectedVegetable.price,
        });
      }

      console.log("Successfully saved vegetable:", selectedVegetable);
      handleCloseModal(); // Close the modal after saving
    } catch (error) {
      console.error("Error saving vegetable:", error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false); // Set saving state to false when operation is complete (success or failure)
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true); // Set deleting state to true when deleting starts

    try {
      // Get the document reference for the selected vegetable
      const vegetableRef = doc(db, "vegetables", selectedVegetable.id); // Assuming each vegetable has an `id`

      // Delete the vegetable document from Firebase
      await deleteDoc(vegetableRef);

      console.log("Successfully deleted vegetable:", selectedVegetable);
      handleCloseModal(); // Close the modal after deleting
    } catch (error) {
      console.error("Error deleting vegetable:", error);
      alert("Failed to delete vegetable. Please try again.");
    } finally {
      setIsDeleting(false); // Set deleting state to false when operation is complete (success or failure)
    }
  };

  const handleUpload = (result) => {
    if (result) {
      setSelectedVegetable((prevVegetable) => ({
        ...prevVegetable,
        imgSrc: result.info.secure_url,
      }));
    }
  };

  const fuse = new Fuse(vegetables, {
    keys: ["name", "price"],
    threshold: 0.3,
  });

  const filteredVegetables = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : vegetables;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!vegetables || vegetables.length === 0) {
    return <div>No vegetables found.</div>;
  }

  return (
    <>
      <div className="navbar bg-base-100 shadow-md py-3">
        <div className="flex-1">
          <span className="text-lg  md:text-3xl font-extrabold text-green-800">
            Vegetables Store
          </span>
        </div>
        <div className="flex-none gap-2">
          <button
            className="btn btn-primary hidden md:block"
            onClick={() =>
              handleEditClick({
                name: "",
                imgSrc: "/vegetables/",
                price: 100,
                id: "new", // This ID indicates a new vegetable
              })
            }
          >
            Add Item +
          </button>
          <input
            type="text"
            placeholder="Search vegetables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered text-xs md:text-base w-36 md:w-[30vw] p-2 mx-auto"
          />
          <Link href={"/"} className="btn">
            Home
          </Link>
        </div>
      </div>
      <div className="overflow-auto h-[85vh] w-[90vw] mx-auto mt-2">
        <table className="table">
          <thead>
            <tr>
              <th>Images</th>
              <th>Name</th>
              <th>ImgSrc</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVegetables.length > 0 ? (
              filteredVegetables.map(({ id, name, imgSrc, price }, index) => (
                <tr key={`${id}-${price}-${index}`}>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={imgSrc} alt={name} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-bold">{name}</div>
                    </div>
                  </td>
                  <td>{imgSrc}</td>
                  <td>{price}</td>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() =>
                        handleEditClick({ id, name, imgSrc, price })
                      }
                    >
                      Edit
                    </button>
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No vegetables match the search criteria.</td>
              </tr>
            )}
          </tbody>
        </table>

        {isModalOpen && selectedVegetable && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h2>
                {selectedVegetable.id === "new"
                  ? "Add Vegetable"
                  : "Edit Vegetable"}
              </h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  value={selectedVegetable.name}
                  onChange={(e) =>
                    setSelectedVegetable((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <span className="label-text">Image URL</span>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    value={selectedVegetable.imgSrc}
                    onChange={
                      (e) => e.preventDefault()
                      // setSelectedVegetable((prev) => ({
                      //   ...prev,
                      //   imgSrc: e.target.value,
                      // }))
                    }
                    className="grow text-xs"
                  />
                  <div className=" h-8 w-10 flex items-center">
                    <img
                      src={selectedVegetable.imgSrc}
                      alt={selectedVegetable.name}
                    />
                  </div>

                  <CldUploadWidget
                    uploadPreset="eqn2ffmk"
                    onSuccess={handleUpload}
                    options={{
                      sources: ["local", "url", "unsplash"],
                      multiple: false,
                      maxFiles: 1,
                    }}
                  >
                    {({ open }) => {
                      return (
                        <button className="btn btn-sm" onClick={() => open()}>
                          Upload Image
                        </button>
                      );
                    }}
                  </CldUploadWidget>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  value={selectedVegetable.price}
                  onChange={(e) =>
                    setSelectedVegetable((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                  className="input input-bordered"
                />
              </div>
              <div className="modal-action flex justify-between md:px-2">
                {selectedVegetable.id !== "new" && (
                  <button
                    className={`btn btn-error text-slate-200 text-xs md:text-base p-1 md:p-3 ${
                      isDeleting ? "loading" : ""
                    }`}
                    onClick={handleDelete}
                    disabled={isSaving || isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete Vegetable"}
                  </button>
                )}
                <div className="space-x-2">
                  <button
                    className={`btn btn-primary text-xs md:text-base p-1 md:p-3 ${
                      isSaving ? "loading" : ""
                    }`}
                    onClick={handleSaveChanges}
                    disabled={isSaving || isDeleting}
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    className="btn text-xs md:text-base p-1 md:p-3"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <button
        className="btn btn-primary rounded-full md:hidden fixed bottom-7 right-5"
        onClick={() =>
          handleEditClick({
            name: "",
            imgSrc: "/vegetables/",
            price: 100,
            id: "new", // This ID indicates a new vegetable
          })
        }
      >
        Item +
      </button>
    </>
  );
}
