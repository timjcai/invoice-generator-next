"use client";
import { useProfileContext } from "@/app/context";
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
import React, { FC, useState } from "react";

const ProfileForm: FC = () => {
    const {
        profileDetails,
        setProfileDetails,
        uid,
        profileId,
        locationDetails,
        setLocationDetails,
    } = useProfileContext();

    async function updateProfileDetails(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        e.preventDefault();
        console.log(profileId);
        console.log(profileDetails);
        console.log(locationDetails);
        // to do: push local state changes to firebase
        const profileRef = doc(db, "profile", profileId.profileId);
        const locationRef = doc(
            db,
            "businessLocation",
            profileId.businessLocationId
        );
        await updateDoc(profileRef, profileDetails);
        await updateDoc(locationRef, locationDetails);
        console.log("completed update");
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
                <input
                    id="businessName"
                    type="text"
                    placeholder="Enter your Business Name"
                    className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                    required={true}
                    value={profileDetails?.businessName}
                    onChange={(e) =>
                        setProfileDetails((prevState: Partial<SellerType>) => ({
                            ...prevState,
                            businessName: e.target.value,
                        }))
                    }
                ></input>
                <label htmlFor="ABN" className="text-md font-medium mb-2">
                    ABN
                </label>
                <input
                    id="ABN"
                    type="text"
                    placeholder="Enter your ABN"
                    className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                    required={true}
                    value={profileDetails?.ABN}
                    onChange={(e) =>
                        setProfileDetails((prevState: Partial<SellerType>) => ({
                            ...prevState,
                            ABN: Number(e.target.value),
                        }))
                    }
                ></input>
                <p className="text-md font-medium mb-2">Business Location</p>
                <div className="flex grid grid-cols-6">
                    <label
                        htmlFor="streeline1"
                        className="text-md font-medium mb-2"
                    >
                        Street Line 1
                    </label>
                    <input
                        id="streeline1"
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
                    <label
                        htmlFor="streeline2"
                        className="text-md font-medium mb-2"
                    >
                        Street Line 2
                    </label>
                    <input
                        id="streeline2"
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
                    <label
                        htmlFor="country"
                        className="text-md font-medium mb-2"
                    >
                        Country
                    </label>
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
                    <label htmlFor="state" className="text-md font-medium mb-2">
                        State
                    </label>
                    <input
                        id="state"
                        type="text"
                        placeholder="Enter your State"
                        className="col-span-5 border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                        required={true}
                        value={locationDetails?.state}
                        onChange={(e) =>
                            setLocationDetails(
                                (prevState: Partial<LocationType>) => ({
                                    ...prevState,
                                    state: e.target.value,
                                })
                            )
                        }
                    ></input>
                    <label
                        htmlFor="postcode"
                        className="text-md font-medium mb-2"
                    >
                        Postcode
                    </label>
                    <input
                        id="postcode"
                        type="number"
                        placeholder="Enter your Postcode"
                        className="col-span-5 border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                        required={true}
                        value={locationDetails?.postcode}
                        onChange={(e) =>
                            setLocationDetails(
                                (prevState: Partial<LocationType>) => ({
                                    ...prevState,
                                    postcode: Number(e.target.value),
                                })
                            )
                        }
                    ></input>
                </div>
                <button
                    type="submit"
                    className="w-full border-2 bg-[#212122] border-[#212122] py-2 text-white font-light rounded-md mt-4 mb-4 disabled:opacity-40"
                    onClick={(e) => updateProfileDetails(e)}
                    // disabled={!userEmail || !userPassword}
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default ProfileForm;
