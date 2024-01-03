"use client";
import {
    BillerContextValue,
    ProfileContextValue,
    useBillerContext,
    useProfileContext,
} from "@/app/context";
import { LocationType, BuyerType } from "@/app/types";
import React, { FC, useEffect, useState } from "react";
import { Selector, SelectorOptions } from "../common/Selector";

export const BillerForm: FC = () => {
    const {
        billerDetails,
        setBillerDetails,
        allBillers,
        setAllBillers,
        getBillerIndex,
        billerSelectorOptions,
        setBillerSelectorOptions,
        createSelectorOptions,
        loading,
        setLoading,
    } = useBillerContext() as BillerContextValue;
    const { uid } = useProfileContext() as ProfileContextValue;

    useEffect(() => {
        getBillerIndex(uid);
        setLoading(false);
        // function createSelectorOptions() {
        //     let billerArray = [] as SelectorOptions[];
        //     console.log(allBillers!);
        //     allBillers!.forEach((merchant) => {
        //         billerArray.push({
        //             value: merchant.id!,
        //             label: merchant.businessName,
        //         });
        //     });
        //     setBillerSelectorOptions(billerArray);
        //     console.log(billerArray);
        //     setLoading(false);
        //     console.log("successfully setup selector");
        // }
        // return () => createSelectorOptions();
    }, []);

    if (loading) {
        <div>loading...</div>;
    }

    function updateBillerDetails(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        e.preventDefault();
        // to do: push local state changes to firebase
        console.log(billerDetails);
        console.log(
            "updating local state - push local state changes to Firebase"
        );
    }

    return (
        <div className="w-full">
            <Selector initOptions={billerSelectorOptions} />
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
                    value={billerDetails?.businessName}
                    onChange={(e) =>
                        setBillerDetails((prevState: Partial<BuyerType>) => ({
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
                    value={billerDetails?.ABN}
                    onChange={(e) =>
                        setBillerDetails((prevState: Partial<BuyerType>) => ({
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
                        value={billerDetails?.businessLocation?.streetLine1}
                        onChange={(e) =>
                            setBillerDetails(
                                (prevState: Partial<BuyerType>) => ({
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
                        value={billerDetails?.businessLocation?.streetLine2}
                        onChange={(e) =>
                            setBillerDetails(
                                (prevState: Partial<BuyerType>) => ({
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
                        value={billerDetails?.businessLocation?.country}
                        onChange={(e) =>
                            setBillerDetails(
                                (prevState: Partial<BuyerType>) => ({
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
                        value={billerDetails?.businessLocation?.state}
                        onChange={(e) =>
                            setBillerDetails(
                                (prevState: Partial<BuyerType>) => ({
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
                        value={billerDetails?.businessLocation?.postcode}
                        onChange={(e) =>
                            setBillerDetails(
                                (prevState: Partial<BuyerType>) => ({
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
                    type="submit"
                    className="w-full border-2 bg-[#212122] border-[#212122] py-2 text-white font-light rounded-md mt-4 mb-4 disabled:opacity-40"
                    onClick={(e) => updateBillerDetails(e)}
                    // disabled={!userEmail || !userPassword}
                >
                    Save
                </button>
            </form>
        </div>
    );
};
