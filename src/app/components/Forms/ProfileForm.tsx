"use client";
import { ProfileContextValue, useProfileContext } from "@/app/context";
import { db } from "@/app/server";
import { LocationType, SellerType, StateType } from "@/app/types";
import {
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import React, { ChangeEvent, FC, useState } from "react";
import { SkeletonBar, SkeletonEllipsis } from "../UI";
import { StateSelector } from "../common";

const ProfileForm: FC = () => {
    const {
        profileDetails,
        setProfileDetails,
        uid,
        profileId,
        locationDetails,
        setLocationDetails,
        loading,
        updateProfileDetails,
    } = useProfileContext() as ProfileContextValue;

    async function profileSaveButtonAction(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        e.preventDefault();
        // to do: push local state changes to firebase
        updateProfileDetails();
        console.log("completed update");
    }

    function handleABNInput(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value ?? "";
        console.log(inputValue);
        // console.log(merchantDetails.ABN);
        if (/^\d*$/.test(inputValue)) {
            setProfileDetails((prevState: Partial<SellerType>) => ({
                ...prevState,
                ABN: inputValue,
            }));
            // } else {
            //     console.log("invalid input message");
            // }
        }
    }

    function handlePostcodeInput(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value ?? "";
        console.log(inputValue);
        // console.log(merchantDetails.ABN);
        if (/^\d*$/.test(inputValue)) {
            setLocationDetails((prevState: Partial<LocationType>) => ({
                ...prevState,
                postcode: inputValue,
            }));
        }
    }

    return (
        <div className="w-full">
            <form className="flex flex-col">
                <label
                    htmlFor="businessName"
                    className="text-md font-medium mb-2"
                >
                    Registered Business Name
                </label>
                {!loading ? (
                    <input
                        id="businessName"
                        type="text"
                        placeholder="Enter your Business Name"
                        className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                        required={true}
                        value={profileDetails?.businessName}
                        onChange={(e) =>
                            setProfileDetails(
                                (prevState: Partial<SellerType>) => ({
                                    ...prevState,
                                    businessName: e.target.value,
                                })
                            )
                        }
                    ></input>
                ) : (
                    <div className="mb-4">
                        <SkeletonBar />
                    </div>
                )}

                <label htmlFor="ABN" className="text-md font-medium mb-2">
                    ABN
                </label>
                {!loading ? (
                    <input
                        id="ABN"
                        type="text"
                        pattern="[0-9]*"
                        maxLength={11}
                        minLength={11}
                        placeholder="Enter your ABN"
                        className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                        required={true}
                        value={profileDetails?.ABN ?? ""}
                        onChange={(event) => handleABNInput(event)}
                    ></input>
                ) : (
                    <div className="mb-4">
                        <SkeletonBar />
                    </div>
                )}
                <p className="text-md font-medium mb-2">Business Location</p>
                <div className="grid grid-cols-6">
                    <label
                        htmlFor="streetLine1"
                        className="text-md font-medium mb-2"
                    >
                        Street Line 1
                    </label>
                    {!loading ? (
                        <input
                            id="streetLine1"
                            type="text"
                            placeholder="Enter your Street line 1"
                            className="col-span-5 border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                            required={true}
                            value={locationDetails?.streetLine1}
                            onChange={(e) =>
                                setLocationDetails(
                                    (prevState: Partial<LocationType>) => ({
                                        ...prevState,
                                        streetLine1: e.target.value,
                                    })
                                )
                            }
                        ></input>
                    ) : (
                        <div className="col-span-5 mb-4">
                            <SkeletonBar />
                        </div>
                    )}
                    <label
                        htmlFor="streetLine2"
                        className="text-md font-medium mb-2"
                    >
                        Street Line 2
                    </label>
                    {!loading ? (
                        <input
                            id="streetLine2"
                            type="text"
                            placeholder="Enter your Street line 2"
                            className="col-span-5 border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                            required={true}
                            value={locationDetails?.streetLine2}
                            onChange={(e) =>
                                setLocationDetails(
                                    (prevState: Partial<LocationType>) => ({
                                        ...prevState,
                                        streetLine2: e.target.value,
                                    })
                                )
                            }
                        ></input>
                    ) : (
                        <div className="col-span-5 mb-4">
                            <SkeletonBar />
                        </div>
                    )}
                    <label
                        htmlFor="suburb"
                        className="text-md font-medium mb-2"
                    >
                        Suburb
                    </label>
                    {!loading ? (
                        <input
                            id="suburb"
                            type="text"
                            placeholder="Enter your Suburb"
                            className="col-span-5 border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                            required={true}
                            value={locationDetails?.suburb}
                            onChange={(e) =>
                                setLocationDetails(
                                    (prevState: Partial<LocationType>) => ({
                                        ...prevState,
                                        suburb: e.target.value,
                                    })
                                )
                            }
                        ></input>
                    ) : (
                        <div className="col-span-5 mb-4">
                            <SkeletonBar />
                        </div>
                    )}
                    <label
                        htmlFor="country"
                        className="text-md font-medium mb-2"
                    >
                        Country
                    </label>
                    {!loading ? (
                        <input
                            id="country"
                            type="text"
                            placeholder="Enter your Country"
                            className="col-span-5 border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                            required={true}
                            value={locationDetails?.country}
                            onChange={(e) =>
                                setLocationDetails(
                                    (prevState: Partial<LocationType>) => ({
                                        ...prevState,
                                        country: e.target.value,
                                    })
                                )
                            }
                        ></input>
                    ) : (
                        <div className="col-span-5 mb-4">
                            <SkeletonBar />
                        </div>
                    )}
                    <label htmlFor="state" className="text-md font-medium mb-2">
                        State
                    </label>
                    {!loading ? (
                        <div className="col-span-5 border-2 border-[#EDEEEF] p-3 mb-4 rounded-md">
                            <StateSelector
                                setState={setLocationDetails}
                                initValue={
                                    locationDetails.state
                                        ? {
                                              value: locationDetails.state,
                                              label: locationDetails.state,
                                          }
                                        : undefined
                                }
                            />
                        </div>
                    ) : (
                        <div className="col-span-5 mb-4">
                            <SkeletonBar />
                        </div>
                    )}

                    <label
                        htmlFor="postcode"
                        className="text-md font-medium mb-2"
                    >
                        Postcode
                    </label>
                    {!loading ? (
                        <input
                            id="postcode"
                            type="text"
                            maxLength={4}
                            placeholder="Enter your Postcode"
                            className="col-span-5 border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                            required={true}
                            value={locationDetails?.postcode ?? ""}
                            onChange={(event) => handlePostcodeInput(event)}
                        ></input>
                    ) : (
                        <div className="col-span-5 mb-4">
                            <SkeletonBar />
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full border-2 bg-[#212122] border-[#212122] py-2 text-white font-light rounded-md mt-4 mb-4 disabled:opacity-40"
                    onClick={(e) => profileSaveButtonAction(e)}
                    // disabled={!userEmail || !userPassword}
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default ProfileForm;
