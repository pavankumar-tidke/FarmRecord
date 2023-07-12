import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Empty } from "antd";
import WorkCard from "../../../components/WorkCard";
import CustSpin from "../../../components/CustSpin";
import BottomDrawer from "../../../components/BottomDrawer";
import ProdCard from "../../../components/ProdCard";

const Index = () => {
  const [data, setData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [drawerData, setDrawerData] = useState([]);
  const [drawerContent, setDrawerContent] = useState("");
  const [activeTab, setActiveTab] = useState("View Work");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setPageLoading(true);

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/fetch/all_work/`
        );
        let response = JSON.parse(res.data);
        console.log(response);
        if (response.success) {
          setData(response); 
          setPageLoading(false);
          message.success("Data fetched successfully");
        } else {
          message.error(`data fetching error, ${response}`, 5);
        }
      } catch (error) {
        console.log(error);
        setPageLoading(false);
        message.error(`Data not fetched. ${error}`, 5);
      }
    };

    fetchData();
  }, []);

  // write a code for update the data in the data variable when the user edited the data in the drawer

  const handleCropChange = (event) => {
    setSelectedCrop(event.target.value);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleTouchStart = (event) => {
    setStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    const endX = event.changedTouches[0].clientX;
    const diffX = startX - endX;
    if (diffX > 50) {
      // Swipe left
      if (activeTab === "View Work") {
        setActiveTab("View Crop Sells");
      }
    } else if (diffX < -50) {
      // Swipe right
      if (activeTab === "View Crop Sells") {
        setActiveTab("View Work");
      }
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    // setDrawerContent('');
    setOpen(false);
  };

  const formattedDateTime = (stamp) => {
    const formattedDate = new Date(stamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedTime = new Date(stamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return [formattedDate, " ", formattedTime];
  };

  const handleEdit = (thing, content) => {
    console.log(thing);
    setDrawerData(thing);
    content === "prodedit" && setSelectedCrop(thing.fields.crop_name);
    setDrawerContent(content);
    showDrawer();
  };

  const viewWork = (work, content) => {
    console.log(work, content);
    setDrawerData(work);
    setDrawerContent(content);
    showDrawer();
  };

  const handleDelete = async (pk, content) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/dw/`,
        { pk, content }
      );
      // setLoading(false);
      console.log(response);
      if (response.data.success) {
        const cardToRemove = document.getElementById(
          `${
            content === "view" ? "work" : content === "prodview" ? "prod" : null
          }-card-${pk}`
        );

        if (cardToRemove && cardToRemove.parentNode) {
          cardToRemove.parentNode.removeChild(cardToRemove);
          message.success(response.data.data.alertMsg, 3);
        } else {
          console.log(
            "Failed to remove card: Card element or its parent node not found"
          );
        }
      } else {
        message.error(`${response.data.data.alertMsg}`, 5);
      }
    } catch (error) {
      message.error(`Things not deleted. ${error}`, 5);
    }
  };

  const editFormSubmit = async (event, content) => {
    event.preventDefault();

    setLoading(true);

    const pk = drawerData.pk;
    const editedAt = new Date().toLocaleString();

    const newData =
      content === "edit"
        ? {
            content: content,
            pk: pk,
            workHeading: event.target.work_heading.value,
            workDescription: event.target.work_desc.value,
            workAmount: event.target.work_amount.value,
            workLocation: event.target.work_location.value,
            addedAt: event.target.added_at.value,
            editedAt: editedAt,
          }
        : content === "prodedit"
        ? {
            content: content,
            pk: pk,
            cropName: selectedCrop,
            cropDesc: event.target.crop_desc.value,
            cropWeight: `${event.target.weight_qntl.value} क्विंटल, ${event.target.weight_kg.value} किलो`,
            cropAmount: event.target.crop_amount.value,
            cropLocation: event.target.sell_location.value,
            addedAt: event.target.added_at.value,
            editedAt: editedAt,
          }
        : null;

    try {
      console.log(drawerData);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/ew/`,
        newData
      );

      if (response.data.success) {
        message.success(response.data.data.alertMsg, 5);
        setLoading(false);
        onClose();

        // get the index of the object whose pk is equal to the pk of the object in the drawer

        var temp = data;
        let tempData =
          temp[
            content === "edit"
              ? "workData"
              : content === "prodedit"
              ? "prodWorkData"
              : null
          ];
        let index = tempData.findIndex((item) => item.pk === pk);

        if (content === "edit") {
          tempData[index].fields.work_heading = event.target.work_heading.value;
          tempData[index].fields.work_desc = event.target.work_desc.value;
          tempData[index].fields.work_amount = event.target.work_amount.value;
          tempData[index].fields.work_location = event.target.work_location.value;
          tempData[index].fields.editedAt = editedAt;

          temp.workData = tempData;

        } else if (content === "prodedit") {
          tempData[index].fields.crop_name = selectedCrop;
          tempData[index].fields.crop_desc = event.target.crop_desc.value;
          tempData[index].fields.crop_amount = event.target.crop_amount.value;
          tempData[index].fields.sell_location = event.target.sell_location.value;
          tempData[index].fields.editedAt = editedAt;

          temp.prodWorkData = tempData;
          
        } else {
          console.log("No content");
        }

        setData(temp);

      } else {
        message.error(`${response.data.data.alertMsg}`, 5);
        setLoading(false);
      }
    } catch (error) {
      message.error(`Work not edited. ${error}`, 5);
      setLoading(false);
    }
  };


  return (
    <div className="mb-20 mt-0.5 px-3">
      {pageLoading && (
        <div className="absolute flex top-80 left-48 justify-center ">
          <CustSpin />
        </div>
      )}

      <div>
        <div className="flex fixed z-20 backdrop-blur-xl justify-evenly w-full py-2 dark:bg-slate-900">
          <div
            className={`${
              activeTab === "View Work"
                ? "border-b-4 rounded-md text-sky-500 border-sky-500 text-center transition-colors duration-300"
                : "text-gray-600 dark:text-white text-center transition-colors duration-300"
            }`}
            onClick={() => handleTabClick("View Work")}
          >
            <h5 className={`font-semibold py-1`}>View Work</h5>
          </div>
          <div
            className={`${
              activeTab === "View Crop Sells"
                ? "border-b-4 rounded-md text-sky-500 border-sky-500 text-center transition-colors duration-300"
                : "text-gray-600 dark:text-white text-center transition-colors duration-300"
            }`}
            onClick={() => handleTabClick("View Crop Sells")}
          >
            <h5 className={`font-semibold py-1`}>View Crop Sells</h5>
          </div>
        </div>
      </div>

      {pageLoading ? null : (
        <div>
          <div
            className="duration-300"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {activeTab === "View Work" && (
              <div className="rounded-2xl p-1 duration-300 drop-shadow-lg ">
                <div className="space-y-3 text-white mt-16">
                  {data.length === 0 ? (
                    <Empty />
                  ) : (
                    <div
                      className="space-y-4 overflow-y-auto "
                      id="work-card-div"
                    >
                      {data.workData.map((work) => (
                        <WorkCard
                          key={work.pk}
                          cardId={`work-card-${work.pk}`}
                          work={work}
                          handleEdit={handleEdit}
                          handleDelete={handleDelete}
                          viewWork={viewWork}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "View Crop Sells" && (
              <div className="rounded-2xl p-1  duration-300 drop-shadow-lg">
                <div className="space-y-3 text-white mt-16">
                  {data.length === 0 ? (
                    <Empty />
                  ) : (
                    <div
                      className="space-y-4 overflow-y-auto "
                      id="prod-card-div"
                    >
                      {data.prodWorkData.map((prod) => (
                        <ProdCard
                          key={prod.pk}
                          cardId={`prod-card-${prod.pk}`}
                          prod={prod}
                          handleEdit={handleEdit}
                          handleDelete={handleDelete}
                          viewWork={viewWork}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>


          <div>
            {drawerData.length !== 0 && drawerContent === "view" ? (
              <BottomDrawer
                title={"View Work"}
                open={open}
                onClose={onClose}
                height={650}
              >
                <div className="w-full space-y-4">
                  <div className="flex justify-between">
                    <div className="">
                      <h5 className="text-lg font-medium text-slate-950 dark:text-white">
                        Work Heading
                      </h5>
                      <h5 className="text-base font-normal text-slate-800 dark:text-slate-300">
                        {drawerData.fields.work_heading}
                      </h5>
                    </div>
                  </div>
                  <div className="">
                    <h5 className="text-lg font-medium text-slate-950 dark:text-white">
                      Work Discription
                    </h5>
                    <h5 className="text-base font-normal text-slate-800 dark:text-slate-300">
                      {drawerData.fields.work_desc}
                    </h5>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="">
                      <h5 className="text-lg font-medium text-slate-950 dark:text-white">
                        Work Location
                      </h5>
                      <h5 className="text-base font-normal text-slate-800 dark:text-slate-300">
                        {drawerData.fields.work_location}
                      </h5>
                    </div>
                    <div className="">
                      <h5 className="text-lg font-medium text-slate-950 dark:text-white">
                        Total Cost
                      </h5>
                      <h5 className="text-base font-normal text-slate-800 dark:text-slate-300">
                        <span className="material-symbols-outlined small-icon align-middle text-slate-800 dark:text-slate-300">
                          currency_rupee
                        </span>
                        {drawerData.fields.work_amount} /-
                      </h5>
                    </div>
                  </div>
                  <div className="">
                    <h5 className="text-lg font-medium text-slate-950 dark:text-white">
                      Work Date
                    </h5>
                    <h5 className="text-base font-normal text-slate-800 dark:text-slate-300">
                      {formattedDateTime(drawerData.fields.added_at)}
                    </h5>
                  </div>
                  <div className="">
                    <h5 className="text-lg font-medium text-slate-950 dark:text-white">
                      Work Edited On
                    </h5>
                    <h5 className="text-base font-normal text-slate-800 dark:text-slate-300">
                      {drawerData.fields.edited_at === "-"
                        ? "-"
                        : formattedDateTime(drawerData.fields.edited_at)}
                    </h5>
                  </div>
                </div>
              </BottomDrawer>
            ) : null}

            {drawerData.length !== 0 && drawerContent === "prodview" ? (
              <BottomDrawer
                title={"View Sells"}
                open={open}
                onClose={onClose}
                height={600}
              >
                <div className="w-full space-y-4">
                  <div className="flex justify-between">
                    <div className="">
                      <h5 className="text-lg font-medium text-slate-950 dark:text-white">
                        Crop Name
                      </h5>
                      <h5 className="text-base font-normal text-slate-800 dark:text-slate-300">
                        {drawerData.fields.crop_name}
                      </h5>
                    </div>
                  </div>
                  <div className="">
                    <h5 className="text-lg font-medium text-slate-950 dark:text-white">
                      Sell Discription
                    </h5>
                    <h5 className="text-base font-normal text-slate-800 dark:text-slate-300">
                      {drawerData.fields.crop_desc}
                    </h5>
                  </div>
                  <div className="">
                    <h5 className="text-lg font-medium text-slate-950 dark:text-white">
                      Crop Weight
                    </h5>
                    <h5 className="text-base font-normal text-slate-800 dark:text-slate-300">
                      {drawerData.fields.crop_weight}
                    </h5>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="">
                      <h5 className="text-lg font-medium text-slate-950 dark:text-white">
                        {" "}
                        Location
                      </h5>
                      <h5 className="text-base font-normal text-slate-800 dark:text-slate-300">
                        {drawerData.fields.sell_location}
                      </h5>
                    </div>
                    <div className="">
                      <h5 className="text-lg font-medium text-slate-950 dark:text-white">
                        Total Selling Price
                      </h5>
                      <h5 className="text-base font-normal text-slate-800 dark:text-slate-300">
                        <span className="material-symbols-outlined small-icon align-middle text-slate-800 dark:text-slate-300">
                          currency_rupee
                        </span>
                        {drawerData.fields.crop_amount} /-
                      </h5>
                    </div>
                  </div>
                  <div className="">
                    <h5 className="text-lg font-medium text-slate-950 dark:text-white">
                      Sell Date
                    </h5>
                    <h5 className="text-base font-normal text-slate-800 dark:text-slate-300">
                      {formattedDateTime(drawerData.fields.added_at)}
                    </h5>
                  </div>
                  <div className="">
                    <h5 className="text-lg font-medium text-slate-950 dark:text-white">
                      Info Edited On
                    </h5>
                    <h5 className="text-base font-normal text-slate-800 dark:text-slate-300">
                      {drawerData.fields.edited_at === "-"
                        ? "-"
                        : formattedDateTime(drawerData.fields.edited_at)}
                    </h5>
                  </div>
                </div>
              </BottomDrawer>
            ) : null}

            {drawerData.length !== 0 && drawerContent === "edit" ? (
              <BottomDrawer
                title={"Edit Work"}
                open={open}
                onClose={onClose}
                height={750}
              >
                <form
                  onSubmit={(event) => editFormSubmit(event, "edit")}
                  id="edit_form"
                  className="rounded-lg w-full space-y-4 bg-transparent"
                >
                  <div className="w-full">
                    <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                      Work Heading
                    </label>
                    <input
                      defaultValue={drawerData.fields.work_heading}
                      type="text"
                      name="work_heading"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="favarni, nangar"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="work_desc"
                      className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    >
                      Work Description
                    </label>
                    <textarea
                      defaultValue={drawerData.fields.work_desc}
                      id="work_desc"
                      rows="4"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      placeholder="First favarni"
                      required
                    ></textarea>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="work_amount"
                      className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    >
                      Work Amount
                    </label>
                    <input
                      defaultValue={drawerData.fields.work_amount}
                      type="number"
                      id="work_amount"
                      name="work_amount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="₹ 2,230 /-"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="work_location"
                      className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    >
                      Add Location
                    </label>
                    <input
                      defaultValue={drawerData.fields.work_location}
                      type="text"
                      id="work_location"
                      name="work_location"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Poison names, fertilizer names, etc."
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="added_at"
                      className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    >
                      Add Date
                    </label>
                    <input
                      defaultValue={drawerData.fields.added_at}
                      type="text"
                      name="added_at"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Poison names, fertilizer names, etc."
                    />
                  </div>
                  {/* <div className="flex flex-col items-start justify-center w-full">
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bill or Receipt</label>
                        <label htmlFor="reciept-file" className="flex flex-col items-center justify-center w-full sm:h-32 lg:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div id="selected-files" className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="reciept-file" name="reciept-file" type="file" className="hidden" multiple />
                        </label>
                    </div>   */}
                  <div className="flex justify-center mt-2  w-full">
                    <button
                      type="submit"
                      className={` ${
                        loading && "opacity-70"
                      } mt-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 align-middle text-center text-base font-semibold shadow-md shadow-sky-500 px-3 py-2 bg-blue-600 text-white rounded-full w-full`}
                      disabled={loading && true}
                    >
                      {loading ? (
                        <span className="space-x-3 my-auto">
                          <CustSpin color={"white"} size={15} />
                          <span>Editing...</span>
                        </span>
                      ) : (
                        <span>Edit Work</span>
                      )}
                    </button>
                  </div>
                </form>
              </BottomDrawer>
            ) : null}

            {drawerData.length !== 0 && drawerContent === "prodedit" ? (
              <BottomDrawer
                title={"Edit Production"}
                open={open}
                onClose={onClose}
                height={800}
              >
                <form
                  onSubmit={(event) => editFormSubmit(event, "prodedit")}
                  className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-2  rounded-lg p-2 w-full "
                >
                  <div className="w-full">
                    <label
                      htmlFor="small"
                      className="block text-sm mb-2 font-medium text-gray-900 dark:text-white"
                    >
                      Select Crop
                    </label>
                    <select
                      onChange={handleCropChange}
                      defaultValue={selectedCrop}
                      id="small"
                      className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">Choose Crop</option>
                      <option value="Soyabin">Soyabin</option>
                      <option value="Chana">Chana</option>
                      <option value="Soyabin, Chana">Soyabin, Chana</option>
                      <option value="Tur Dal">Tur Dal</option>
                    </select>
                  </div>
                  {/* <div className="w-full">
                        <label htmlFor="crop_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Crop Name</label>
                        <input type="text" id="crop_name" name="crop_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Soyabin, Chaana" required />
                    </div>  */}
                  <div className="w-full">
                    <label
                      htmlFor="crop_desc"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Crop Sell Description
                    </label>
                    <textarea
                      defaultValue={drawerData.fields.crop_desc}
                      id="crop_desc"
                      rows="4"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Latur Buyer Name"
                      required
                    ></textarea>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="sell_location"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Selling Location
                    </label>
                    <input
                      defaultValue={drawerData.fields.sell_location}
                      type="text"
                      id="sell_location"
                      name="sell_location"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Latur, Ghatnandur"
                    />
                  </div>
                  <div className="flex gap-2 w-full">
                    <div className="w-full relative">
                      <label
                        htmlFor="weight_qntl"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Weight of Crop
                      </label>
                      <input
                        defaultValue={
                          drawerData.fields.crop_weight
                            .match(/\d+/g)
                            .map(Number)[0]
                        }
                        type="number"
                        id="weight_qntl"
                        name="weight_qntl"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="30"
                        required
                      />
                      <span
                        className="absolute top-2/3 right-3 font-semibold transform -translate-y-1/2 text-gray-400"
                        style={{ pointerEvents: "none" }}
                      >
                        क्विंटल
                      </span>
                    </div>
                    <div className="w-full relative">
                      <label
                        htmlFor="weight_kg"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        &nbsp;
                      </label>
                      <input
                        defaultValue={
                          drawerData.fields.crop_weight
                            .match(/\d+/g)
                            .map(Number)[1]
                        }
                        type="number"
                        id="weight_kg"
                        name="weight_kg"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="45"
                        required
                      />
                      <span
                        className="absolute top-2/3 right-3 font-semibold transform -translate-y-1/2 text-gray-400"
                        style={{ pointerEvents: "none" }}
                      >
                        किलो
                      </span>
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="crop_amount"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Crop Amount
                    </label>
                    <input
                      defaultValue={drawerData.fields.crop_amount}
                      type="number"
                      id="crop_amount"
                      name="crop_amount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="₹ 2,230 /-"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="work_location"
                      className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    >
                      Add Date
                    </label>
                    <input
                      defaultValue={drawerData.fields.added_at}
                      type="text"
                      id="added_at"
                      name="added_at"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Time and date of crop sell"
                    />
                  </div>
                  {/* <div className="flex flex-col items-start justify-center w-full">
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bill or Receipt</label>
                        <label htmlFor="reciept-file" className="flex flex-col items-center justify-center w-full sm:h-32 lg:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div id="selected-files" className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="reciept-file" name="reciept-file" type="file" className="hidden" multiple />
                        </label>
                    </div>   */}
                  <div className="flex justify-center mt-5  w-full">
                    <button
                      type="submit"
                      className={` ${
                        loading && "opacity-70"
                      } bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 align-middle text-center text-base font-semibold shadow-md shadow-sky-500 px-3 py-2 bg-blue-600 text-white rounded-full w-full`}
                      disabled={loading && true}
                    >
                      {loading ? (
                        <span className="space-x-3 my-auto">
                          <CustSpin color={"white"} size={15} />
                          <span>Editing...</span>
                        </span>
                      ) : (
                        <span>Edit Crop Info</span>
                      )}
                    </button>
                  </div>
                </form>
              </BottomDrawer>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
