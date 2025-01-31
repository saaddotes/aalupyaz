"use client";
import Login from "@/components/Login";
import { useAuth } from "@/context/authContext";
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

type Product = {
  id: string;
  name: string;
  imgSrc: string;
  price: number;
  description: string;
};

export default function Admin() {
  const { products, error } = useData();
  const { currentUser, loading, logout } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (error) {
      console.error("Error fetching products:", error);
    }
  }, [error]);

  if (!currentUser) {
    return <Login />;
  }

  const filteredproducts = products;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!currentUser) {
    return <Login />;
  }

  function handleEditClick(product: Product) {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }

  async function handleSaveChanges() {
    setIsSaving(true);

    try {
      const productrefCol = collection(db, "vegetables");
      if (selectedProduct?.id && selectedProduct.id !== "new") {
        const productref = doc(productrefCol, selectedProduct.id);

        await updateDoc(productref, {
          name: selectedProduct?.name,
          imgSrc: selectedProduct?.imgSrc,
          price: selectedProduct?.price,
          description: selectedProduct?.description,
        });
      } else {
        await addDoc(productrefCol, {
          name: selectedProduct?.name,
          imgSrc: selectedProduct?.imgSrc,
          price: selectedProduct?.price,
          description: selectedProduct?.description,
        });
      }

      console.log("Successfully saved product:", selectedProduct);
      handleCloseModal();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    setIsDeleting(true);

    try {
      if (!selectedProduct) {
        throw new Error("No product selected for deletion.");
      }
      const productref = doc(db, "vegetables", selectedProduct.id);

      await deleteDoc(productref);

      console.log("Successfully deleted product:", selectedProduct);
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleUpload(result: any) {
    if (result && result.info && result.info.secure_url) {
      setSelectedProduct((preProducts) => {
        if (!preProducts) return null;
        return {
          name: preProducts.name,
          price: preProducts.price,
          description: preProducts.description,
          id: preProducts.id,
          imgSrc: result.info.secure_url,
        };
      });
    }
  }

  // const fuse = new Fuse(products, {
  //   keys: ["name", "price"],
  //   threshold: 0.3,
  // });

  //   if (loading) {
  //     return (
  //       <div>
  //         <Loading />
  //       </div>
  //     );
  //   }

  // if (!products || products.length === 0) {
  //   return <div>No products found.</div>;
  // }

  return (
    <>
      <div className="navbar bg-base-100 shadow-md py-3">
        <div className="flex-1 flex gap-3 items-center">
          <img src="/logo.png" alt="logo" width={"60px"} />
          <span className="text-lg md:text-3xl font-bold text-pink-600 font-mono">
            VEG Store
          </span>
        </div>
        <div className="flex-none gap-2">
          <button
            className="btn btn-primary hidden md:block"
            onClick={() =>
              handleEditClick({
                name: "",
                imgSrc: "",
                price: 100,
                description: "",
                id: "new",
              })
            }
          >
            Add Item +
          </button>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered text-xs md:text-base w-36 md:w-[30vw] p-2 mx-auto"
          />
          <Link href={"/"} className="btn">
            Home
          </Link>
          <button className="btn btn-error text-white" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <div className="overflow-auto h-[85vh] w-[90vw] mx-auto mt-2">
        <table className="table">
          <thead>
            <tr>
              <th>Images</th>
              <th>Name</th>
              <th>description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredproducts.length > 0 ? (
              filteredproducts.map(
                ({ id, name, imgSrc, price, description }, index) => (
                  <tr key={`${id}-${price}-${index}`}>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12 text-center">
                          {imgSrc ? <img src={imgSrc} alt={name} /> : "N/A"}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-bold">{name}</div>
                      </div>
                    </td>
                    <td>{description}</td>
                    <td>{price}</td>
                    <th>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() =>
                          handleEditClick({
                            id,
                            name,
                            imgSrc,
                            price,
                            description,
                          })
                        }
                      >
                        Edit
                      </button>
                    </th>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  No products match the search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {isModalOpen && selectedProduct && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h2>
                {selectedProduct.id === "new" ? "Add Product" : "Edit Product"}
              </h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct((pre) => {
                      if (!pre) return null;
                      return {
                        ...pre,
                        name: e.target.value,
                      };
                    })
                  }
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <span className="label-text">Image URL</span>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    value={selectedProduct.imgSrc}
                    onChange={(e) => {
                      e.preventDefault();
                      setSelectedProduct((prev) => {
                        if (!prev) return null;
                        return {
                          ...prev,
                          imgSrc: e.target.value,
                        };
                      });
                    }}
                    className="grow text-xs"
                  />
                  <div className=" h-8 w-10 flex items-center">
                    {selectedProduct.imgSrc && (
                      <img
                        src={selectedProduct.imgSrc}
                        alt={selectedProduct.name}
                      />
                    )}
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
                  value={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct((prev) => {
                      if (!prev) return null;
                      return {
                        ...prev,
                        price: Number(e.target.value),
                      };
                    })
                  }
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">description</span>
                </label>
                <textarea
                  value={selectedProduct?.description || ""}
                  onChange={(e) =>
                    setSelectedProduct((prev) => {
                      if (!prev) return null;
                      return {
                        ...prev,
                        description: e.target.value,
                      };
                    })
                  }
                  className="textarea textarea-bordered"
                />
              </div>
              <div className="modal-action flex justify-between md:px-2">
                {selectedProduct.id !== "new" && (
                  <button
                    className={`btn btn-error text-slate-200 text-xs md:text-base p-1 md:p-3 ${
                      isDeleting ? "loading" : ""
                    }`}
                    onClick={handleDelete}
                    disabled={isSaving || isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete product"}
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
            imgSrc: "/products/",
            price: 100,
            description: "",
            id: "new",
          })
        }
      >
        Item +
      </button>
    </>
  );
}
