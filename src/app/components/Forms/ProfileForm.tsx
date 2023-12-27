"use client";
import { useProfileContext } from "@/app/context";
import { LocationType, SellerType, StateType } from "@/app/types";
import React, { FC, useState } from "react";

const ProfileForm: FC = () => {
    const [businessName, setBusinessName] = useState<string>();
    const [ABN, setABN] = useState<string>();
    const [streetLine1, setStreetLine1] = useState<string>();
    const [streetLine2, setStreetLine2] = useState<string>();
    const [country, setCountry] = useState<string>();
    const [stateName, setStateName] = useState<string>();
    const [postcode, setPostcode] = useState<number>();
    const { profileDetails, setProfileDetails } = useProfileContext();

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
                            ABN: e.target.value,
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
                        value={profileDetails?.businessLocation?.streetLine1}
                        onChange={(e) =>
                            setProfileDetails(
                                (prevState: Partial<SellerType>) => ({
                                    ...prevState,
                                    businessLocation: {
                                        ...prevState.businessLocation,
                                        streetLine1: e.target.value,
                                    },
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
                        value={profileDetails?.businessLocation?.streetLine2}
                        onChange={(e) =>
                            setProfileDetails(
                                (prevState: Partial<SellerType>) => ({
                                    ...prevState,
                                    businessLocation: {
                                        ...prevState.businessLocation,
                                        streetLine2: e.target.value,
                                    },
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
                        value={profileDetails?.businessLocation?.country}
                        onChange={(e) =>
                            setProfileDetails(
                                (prevState: Partial<SellerType>) => ({
                                    ...prevState,
                                    businessLocation: {
                                        ...prevState.businessLocation,
                                        country: e.target.value,
                                    },
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
                        value={profileDetails?.businessLocation?.state}
                        onChange={(e) =>
                            setProfileDetails(
                                (prevState: Partial<SellerType>) => ({
                                    ...prevState,
                                    businessLocation: {
                                        ...prevState.businessLocation,
                                        state: e.target.value,
                                    },
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
                        value={profileDetails?.businessLocation?.postcode}
                        onChange={(e) =>
                            setProfileDetails(
                                (prevState: Partial<SellerType>) => ({
                                    ...prevState,
                                    businessLocation: {
                                        ...prevState.businessLocation,
                                        postcode: Number(e.target.value),
                                    },
                                })
                            )
                        }
                    ></input>
                </div>
                <button
                    className="w-full border-2 bg-[#212122] border-[#212122] py-2 text-white font-light rounded-md mt-4 mb-4 disabled:opacity-40"
                    // onClick={(e) => handleSignIn(e)}
                    // disabled={!userEmail || !userPassword}
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default ProfileForm;
